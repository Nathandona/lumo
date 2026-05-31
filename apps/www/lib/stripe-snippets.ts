// Copy-paste reference snippets for the Stripe checkout example.
// These are shown verbatim on /examples/stripe. Inner backticks and ${...} are
// escaped so the surrounding template literals stay literal.

export const ENV_SNIPPET = `# .env.local
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...`

export const INSTALL_SNIPPET = `npm install @stripe/stripe-js @stripe/react-stripe-js stripe`

export const ROUTE_SNIPPET = `// app/api/checkout/route.ts
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

// POST /api/checkout -> { clientSecret }
export async function POST(req: Request) {
  const { amount, currency = "usd" } = await req.json()

  // amount is integer minor units, exactly Lumo's Money.amount.
  const intent = await stripe.paymentIntents.create({
    amount,
    currency,
    automatic_payment_methods: { enabled: true },
  })

  return Response.json({ clientSecret: intent.client_secret })
}`

export const COMPONENT_SNIPPET = `// components/stripe-checkout.tsx
"use client"

import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { CheckoutForm } from "@/components/lumo/checkout-form"
import type { CartLine, Money } from "@/lib/lumo/types"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface Props {
  clientSecret: string
  lines: CartLine[]
  subtotal: Money
  total: Money
}

export function StripeCheckout({ clientSecret, ...order }: Props) {
  return (
    <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: "flat" } }}>
      <Inner {...order} />
    </Elements>
  )
}

function Inner({ lines, subtotal, total }: Omit<Props, "clientSecret">) {
  const stripe = useStripe()
  const elements = useElements()

  return (
    <CheckoutForm
      lines={lines}
      subtotal={subtotal}
      total={total}
      // Stripe renders its own card inputs into the slot.
      paymentSlot={<PaymentElement />}
      // CheckoutForm validates the address first, then hands you the values.
      // Throw to show an error inside the form; resolve to let it finish.
      onSubmit={async (values) => {
        if (!stripe || !elements) throw new Error("Stripe is still loading.")

        const { error } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: \`\${window.location.origin}/checkout/complete\`,
            payment_method_data: {
              billing_details: {
                name: \`\${values.firstName} \${values.lastName}\`,
                email: values.email,
                address: {
                  line1: values.line1,
                  line2: values.line2,
                  city: values.city,
                  state: values.region,
                  postal_code: values.postalCode,
                  country: values.country,
                },
              },
            },
          },
        })

        // On success Stripe redirects to return_url; we only reach here on error.
        if (error) throw new Error(error.message)
      }}
    />
  )
}`

export const PAGE_SNIPPET = `// app/checkout/page.tsx
import { headers } from "next/headers"
import { StripeCheckout } from "@/components/stripe-checkout"

// Replace with your real cart (e.g. from the cart-provider block).
const lines = [/* ... */]
const subtotal = { amount: 28998, currency: "USD" }
const total = { amount: 31318, currency: "USD" }

export default async function CheckoutPage() {
  const origin = (await headers()).get("origin") ?? ""

  // Create the PaymentIntent for the order total (integer minor units).
  const res = await fetch(\`\${origin}/api/checkout\`, {
    method: "POST",
    body: JSON.stringify({ amount: total.amount, currency: total.currency.toLowerCase() }),
    cache: "no-store",
  })
  const { clientSecret } = await res.json()

  return <StripeCheckout clientSecret={clientSecret} lines={lines} subtotal={subtotal} total={total} />
}`

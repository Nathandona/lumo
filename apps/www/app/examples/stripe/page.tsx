import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, CreditCard, KeyRound, Webhook } from "lucide-react"

import { Header } from "@/components/header"
import { CodeBlock } from "@/components/code-block"
import { CheckoutDemo } from "@/components/checkout-demo"
import { Badge } from "@/components/ui/badge"
import {
  ENV_SNIPPET,
  INSTALL_SNIPPET,
  ROUTE_SNIPPET,
  COMPONENT_SNIPPET,
  PAGE_SNIPPET,
} from "@/lib/stripe-snippets"

export const metadata: Metadata = {
  title: "Stripe checkout - Lumo UI",
  description:
    "Wire Stripe into the Lumo CheckoutForm end to end: a PaymentIntent route, Stripe Elements in the payment slot, and confirmPayment on submit.",
}

const steps = [
  { n: "01", title: "Install and add keys", body: "Add the Stripe SDKs and your test keys." },
  { n: "02", title: "Create a PaymentIntent", body: "A route returns a client secret for the order total." },
  { n: "03", title: "Mount Stripe in the slot", body: "Render <PaymentElement /> and confirm on submit." },
  { n: "04", title: "Render the page", body: "Fetch the client secret, then hand it to the component." },
]

export default function StripeExamplePage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="mx-auto max-w-4xl px-6 py-12">
        <Link
          href="/examples"
          className="inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to examples
        </Link>

        {/* Hero */}
        <div className="mt-8 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-honey">Example</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">Stripe checkout</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Lumo&apos;s{" "}
            <Link href="/components/checkout-form" className="text-honey hover:underline">
              CheckoutForm
            </Link>{" "}
            is payment-agnostic: it validates the address, exposes a <code className="font-mono text-sm">paymentSlot</code> for
            any provider&apos;s UI, and calls <code className="font-mono text-sm">onSubmit</code> once the form is valid. Here is
            the canonical Stripe wiring, end to end.
          </p>
        </div>

        {/* Steps overview */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.n} className="rounded-2xl border bg-[var(--glass)] p-5">
              <p className="font-mono text-xs text-honey">{step.n}</p>
              <p className="mt-2 font-display font-semibold tracking-tight">{step.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{step.body}</p>
            </div>
          ))}
        </div>

        {/* 1. Install */}
        <section className="mt-14">
          <h2 className="flex items-center gap-2 font-display text-2xl font-semibold tracking-tight">
            <KeyRound className="h-5 w-5 text-honey" />
            1. Install and add keys
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Grab your keys from the Stripe dashboard in test mode.
          </p>
          <div className="mt-5 space-y-4">
            <CodeBlock label="Terminal" language="bash" code={INSTALL_SNIPPET} />
            <CodeBlock label=".env.local" language="bash" code={ENV_SNIPPET} />
          </div>
        </section>

        {/* 2. PaymentIntent */}
        <section className="mt-14">
          <h2 className="font-display text-2xl font-semibold tracking-tight">2. Create a PaymentIntent</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            The amount is integer minor units, exactly Lumo&apos;s <code className="font-mono text-sm">Money.amount</code>, so
            there is no conversion.
          </p>
          <div className="mt-5">
            <CodeBlock label="app/api/checkout/route.ts" code={ROUTE_SNIPPET} />
          </div>
        </section>

        {/* 3. Component */}
        <section className="mt-14">
          <h2 className="flex items-center gap-2 font-display text-2xl font-semibold tracking-tight">
            <CreditCard className="h-5 w-5 text-honey" />
            3. Mount Stripe in the payment slot
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Wrap the form in <code className="font-mono text-sm">{"<Elements>"}</code>, drop{" "}
            <code className="font-mono text-sm">{"<PaymentElement />"}</code> into the slot, and confirm payment from{" "}
            <code className="font-mono text-sm">onSubmit</code>. Throwing surfaces the message inside the form.
          </p>
          <div className="mt-5">
            <CodeBlock label="components/stripe-checkout.tsx" code={COMPONENT_SNIPPET} />
          </div>
        </section>

        {/* 4. Page */}
        <section className="mt-14">
          <h2 className="font-display text-2xl font-semibold tracking-tight">4. Render the page</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Create the PaymentIntent on the server, then pass the client secret down.
          </p>
          <div className="mt-5">
            <CodeBlock label="app/checkout/page.tsx" code={PAGE_SNIPPET} />
          </div>
        </section>

        {/* Live demo */}
        <section className="mt-16">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-display text-2xl font-semibold tracking-tight">Live demo</h2>
            <Badge variant="secondary" className="text-xs">
              Test mode
            </Badge>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            The same CheckoutForm with a Stripe-styled payment slot. This demo is a visual stand-in, no keys and no charge.
            Place the order to reach the confirmation.
          </p>
          <div className="glass mt-6 rounded-3xl p-6 md:p-8">
            <CheckoutDemo />
          </div>
        </section>

        {/* Notes */}
        <section className="mt-14 rounded-2xl border bg-[var(--glass)] p-6">
          <h3 className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight">
            <Webhook className="h-4 w-4 text-honey" />
            Before you go live
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              Test with card <code className="font-mono">4242 4242 4242 4242</code>, any future expiry, any CVC.
            </li>
            <li>
              Fulfill orders from a Stripe <span className="font-medium text-foreground">webhook</span> on{" "}
              <code className="font-mono">payment_intent.succeeded</code>, not from <code className="font-mono">return_url</code>,
              which the customer can skip.
            </li>
            <li>Recompute the amount on the server from your own catalog. Never trust an amount sent by the client.</li>
          </ul>
        </section>
      </main>
    </div>
  )
}

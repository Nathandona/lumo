"use client"

import * as React from "react"
import { CreditCard, Lock } from "lucide-react"

const fieldClass =
  "h-10 w-full rounded-md border border-input bg-background px-3 text-sm transition-colors placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"

/**
 * A visual stand-in for Stripe's <PaymentElement>, themed to match the site so
 * the demo runs with no keys and no network. The real integration drops Stripe's
 * <PaymentElement /> into the same slot, see /examples/stripe.
 */
export function MockPaymentElement() {
  const [number, setNumber] = React.useState("")
  const [expiry, setExpiry] = React.useState("")
  const [cvc, setCvc] = React.useState("")

  const autofill = () => {
    setNumber("4242 4242 4242 4242")
    setExpiry("04 / 42")
    setCvc("424")
  }

  return (
    <div className="rounded-xl border border-[var(--stroke)] bg-[var(--glass)] p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-md border border-input bg-background px-2.5 py-1 text-xs font-medium">
          <CreditCard className="h-3.5 w-3.5" />
          Card
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide text-foreground">
          Test mode
        </span>
      </div>

      <div className="flex flex-col gap-2.5">
        <div className="flex flex-col gap-1">
          <label htmlFor="mock-card-number" className="text-xs font-medium text-muted-foreground">
            Card number
          </label>
          <div className="relative">
            <input
              id="mock-card-number"
              className={fieldClass}
              inputMode="numeric"
              placeholder="1234 1234 1234 1234"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
            <CreditCard className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="flex flex-col gap-1">
            <label htmlFor="mock-card-expiry" className="text-xs font-medium text-muted-foreground">
              Expiry
            </label>
            <input
              id="mock-card-expiry"
              className={fieldClass}
              placeholder="MM / YY"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="mock-card-cvc" className="text-xs font-medium text-muted-foreground">
              CVC
            </label>
            <input
              id="mock-card-cvc"
              className={fieldClass}
              inputMode="numeric"
              placeholder="CVC"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Lock className="h-3 w-3" />
          Demo only, no card is charged.
        </p>
        <button
          type="button"
          onClick={autofill}
          className="rounded-md px-2 py-1 text-xs font-medium text-honey transition-colors hover:bg-accent"
        >
          Autofill test card
        </button>
      </div>
    </div>
  )
}

"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import type { CartLine, Money } from "@/lib/lumo/types"

import { cn } from "@/lib/utils"
import { OrderSummary } from "@/components/lumo/order-summary"

const checkoutSchema = z.object({
  email: z.string().min(1, "Required").email("Enter a valid email"),
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  line1: z.string().min(1, "Required"),
  line2: z.string().optional(),
  city: z.string().min(1, "Required"),
  region: z.string().optional(),
  postalCode: z.string().min(1, "Required"),
  country: z.string().min(2, "Use a 2-letter country code"),
  phone: z.string().optional(),
})

export type CheckoutValues = z.infer<typeof checkoutSchema>

const inputClass =
  "h-10 w-full rounded-md border border-input bg-background px-3 text-sm transition-colors placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string
  error?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label className="text-sm font-medium">{label}</label>
      {children}
      {error && <span className="text-xs text-destructive">{error}</span>}
    </div>
  )
}

export interface CheckoutFormProps {
  lines: CartLine[]
  subtotal: Money
  shipping?: Money
  tax?: Money
  total?: Money
  locale?: string
  /** Slot for your payment provider UI, e.g. Stripe Elements. */
  paymentSlot?: React.ReactNode
  onSubmit?: (values: CheckoutValues) => void | Promise<void>
  submitLabel?: string
  className?: string
}

export function CheckoutForm({
  lines,
  subtotal,
  shipping,
  tax,
  total,
  locale,
  paymentSlot,
  onSubmit,
  submitLabel = "Place order",
  className,
}: CheckoutFormProps) {
  const [error, setError] = React.useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutValues>({ resolver: zodResolver(checkoutSchema) })

  const submit = async (values: CheckoutValues) => {
    setError(null)
    try {
      await onSubmit?.(values)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.")
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} noValidate className={cn("grid gap-8 lg:grid-cols-[1fr_360px]", className)}>
      <div className="flex flex-col gap-8">
        <section className="flex flex-col gap-4">
          <h3 className="font-display text-lg font-semibold tracking-tight">Contact</h3>
          <Field label="Email" error={errors.email?.message}>
            <input type="email" autoComplete="email" placeholder="you@example.com" className={inputClass} {...register("email")} />
          </Field>
        </section>

        <section className="flex flex-col gap-4">
          <h3 className="font-display text-lg font-semibold tracking-tight">Shipping address</h3>
          <div className="grid grid-cols-2 gap-4">
            <Field label="First name" error={errors.firstName?.message}>
              <input className={inputClass} autoComplete="given-name" {...register("firstName")} />
            </Field>
            <Field label="Last name" error={errors.lastName?.message}>
              <input className={inputClass} autoComplete="family-name" {...register("lastName")} />
            </Field>
          </div>
          <Field label="Address" error={errors.line1?.message}>
            <input className={inputClass} autoComplete="address-line1" placeholder="Street and number" {...register("line1")} />
          </Field>
          <Field label="Apartment, suite (optional)">
            <input className={inputClass} autoComplete="address-line2" {...register("line2")} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="City" error={errors.city?.message}>
              <input className={inputClass} autoComplete="address-level2" {...register("city")} />
            </Field>
            <Field label="State / Province">
              <input className={inputClass} autoComplete="address-level1" {...register("region")} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Postal code" error={errors.postalCode?.message}>
              <input className={inputClass} autoComplete="postal-code" {...register("postalCode")} />
            </Field>
            <Field label="Country" error={errors.country?.message}>
              <input className={inputClass} autoComplete="country" placeholder="US" {...register("country")} />
            </Field>
          </div>
        </section>

        {paymentSlot && (
          <section className="flex flex-col gap-4">
            <h3 className="font-display text-lg font-semibold tracking-tight">Payment</h3>
            {paymentSlot}
          </section>
        )}

        {error && (
          <p role="alert" className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        )}
      </div>

      <aside className="flex flex-col gap-4 lg:sticky lg:top-28 lg:self-start">
        <OrderSummary lines={lines} subtotal={subtotal} shipping={shipping} tax={tax} total={total} locale={locale} />
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-12 w-full items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-[background-color,transform] hover:bg-primary/90 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {isSubmitting ? "Placing order..." : submitLabel}
        </button>
        <p className="text-center text-xs text-muted-foreground">
          Taxes and shipping are calculated by your backend.
        </p>
      </aside>
    </form>
  )
}

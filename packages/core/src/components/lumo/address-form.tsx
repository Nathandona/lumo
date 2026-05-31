"use client"

import * as React from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import type { Address } from "@/lib/lumo/types"

import { cn } from "@/lib/utils"

const addressSchema = z.object({
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

export type AddressFormValues = z.infer<typeof addressSchema>

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
  children: React.ReactElement
  className?: string
}) {
  const id = React.useId()
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {React.cloneElement(children, { id, "aria-invalid": error ? true : undefined } as Record<string, unknown>)}
      {error && <span className="text-xs text-destructive">{error}</span>}
    </div>
  )
}

export interface AddressFormProps {
  defaultValues?: Partial<Address>
  onSubmit?: (address: Address) => void
  submitLabel?: string
  className?: string
}

export function AddressForm({ defaultValues, onSubmit, submitLabel = "Continue", className }: AddressFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: defaultValues as AddressFormValues,
  })

  const submit: SubmitHandler<AddressFormValues> = (values) => onSubmit?.(values as Address)

  return (
    <form onSubmit={handleSubmit(submit)} noValidate className={cn("flex flex-col gap-4", className)}>
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
      <Field label="Phone (optional)">
        <input className={inputClass} autoComplete="tel" {...register("phone")} />
      </Field>
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-[background-color,transform] hover:bg-primary/90 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {submitLabel}
      </button>
    </form>
  )
}

import * as React from "react"
import { Minus, Plus } from "lucide-react"

import { cn } from "@/lib/utils"

export interface QuantityStepperProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: number
  onValueChange: (value: number) => void
  min?: number
  max?: number
  disabled?: boolean
  size?: "sm" | "md"
  /** Accessible label for the control. Defaults to "Quantity". */
  label?: string
}

const QuantityStepper = React.forwardRef<HTMLDivElement, QuantityStepperProps>(
  (
    {
      className,
      value,
      onValueChange,
      min = 1,
      max,
      disabled = false,
      size = "md",
      label = "Quantity",
      ...props
    },
    ref
  ) => {
    const canDecrement = !disabled && value > min
    const canIncrement = !disabled && (max === undefined || value < max)

    const clamp = (next: number) => {
      const lower = Math.max(min, next)
      return max === undefined ? lower : Math.min(max, lower)
    }

    const button =
      "flex items-center justify-center text-foreground transition-[color,background-color,transform] hover:bg-accent active:scale-90 disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    const dimensions = size === "sm" ? "h-7 w-7" : "h-9 w-9"

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-md border border-input bg-background",
          className
        )}
        {...props}
      >
        <button
          type="button"
          className={cn(button, dimensions, "rounded-l-md")}
          onClick={() => onValueChange(clamp(value - 1))}
          disabled={!canDecrement}
          aria-label={`Decrease ${label.toLowerCase()}`}
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <input
          type="text"
          inputMode="numeric"
          aria-label={label}
          value={value}
          disabled={disabled}
          onChange={(event) => {
            const parsed = parseInt(event.target.value, 10)
            if (!Number.isNaN(parsed)) {
              onValueChange(clamp(parsed))
            }
          }}
          className={cn(
            "w-10 border-x border-input bg-transparent text-center text-sm tabular-nums focus-visible:outline-none",
            size === "sm" ? "h-7" : "h-9"
          )}
        />
        <button
          type="button"
          className={cn(button, dimensions, "rounded-r-md")}
          onClick={() => onValueChange(clamp(value + 1))}
          disabled={!canIncrement}
          aria-label={`Increase ${label.toLowerCase()}`}
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    )
  }
)
QuantityStepper.displayName = "QuantityStepper"

export { QuantityStepper }

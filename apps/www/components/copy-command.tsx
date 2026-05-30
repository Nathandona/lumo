"use client"

import * as React from "react"
import { Copy, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface CopyCommandProps {
  command: string
  children: React.ReactNode
  className?: string
}

export function CopyCommand({ command, children, className }: CopyCommandProps) {
  const [copied, setCopied] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setTimeout>>()

  React.useEffect(() => () => clearTimeout(timer.current), [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command)
    } catch {
      return
    }
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 rounded-full border border-[var(--stroke)] bg-[var(--glass)] py-2 pl-5 pr-2 font-mono text-sm backdrop-blur",
        className
      )}
    >
      <code className="whitespace-nowrap">{children}</code>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy command"}
        className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-background/70 text-muted-foreground transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-accent hover:text-foreground active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Copy className={cn("copy-icon h-4 w-4", copied ? "copy-icon--hidden" : "copy-icon--shown")} strokeWidth={2} />
        <Check className={cn("copy-icon h-4 w-4 text-emerald-600", copied ? "copy-icon--shown" : "copy-icon--hidden")} strokeWidth={2.5} />
      </button>
    </div>
  )
}

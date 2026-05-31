"use client"

import * as React from "react"
import { Copy, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { ComponentCode } from "@/components/component-code"

interface CodeBlockProps {
  code: string
  label?: string
  language?: string
}

export function CodeBlock({ code, label, language = "tsx" }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setTimeout>>()

  React.useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      return
    }
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className="glass overflow-hidden rounded-xl border">
      {label && (
        <div className="flex items-center justify-between border-b border-[var(--stroke)] px-4 py-2.5">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground/70">{label}</span>
          <button
            type="button"
            onClick={copy}
            aria-label={copied ? "Copied" : "Copy code"}
            className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-accent hover:text-foreground active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Copy className={cn("copy-icon h-4 w-4", copied ? "copy-icon--hidden" : "copy-icon--shown")} strokeWidth={2} />
            <Check className={cn("copy-icon h-4 w-4 text-emerald-600", copied ? "copy-icon--shown" : "copy-icon--hidden")} strokeWidth={2.5} />
          </button>
        </div>
      )}
      <div className="overflow-x-auto p-4">
        <ComponentCode code={code} language={language} />
      </div>
    </div>
  )
}

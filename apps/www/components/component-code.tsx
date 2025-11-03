"use client"

import * as React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"

interface ComponentCodeProps {
  code: string
  language?: string
}

export function ComponentCode({ code, language = "tsx" }: ComponentCodeProps) {
  return (
    <div className="rounded-md overflow-hidden">
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          fontSize: "0.875rem",
          background: "hsl(var(--muted))",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}
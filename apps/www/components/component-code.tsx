"use client"

import * as React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism"

interface ComponentCodeProps {
  code: string
  language?: string
}

export function ComponentCode({ code, language = "tsx" }: ComponentCodeProps) {
  return (
    <SyntaxHighlighter
      language={language}
      style={oneLight}
      customStyle={{
        margin: 0,
        padding: 0,
        background: "transparent",
        fontSize: "0.825rem",
        lineHeight: 1.7,
      }}
      codeTagProps={{
        style: {
          background: "transparent",
          fontFamily: "var(--font-mono), ui-monospace, monospace",
          textShadow: "none",
        },
      }}
    >
      {code}
    </SyntaxHighlighter>
  )
}

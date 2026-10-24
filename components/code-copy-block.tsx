"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CodeCopyBlockProps {
  filename: string
  code: string
}

export function CodeCopyBlock({ filename, code }: CodeCopyBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyCode = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-slate-950 shadow-sm">
      <div className="flex items-center justify-between gap-4 border-b border-slate-800 px-4 py-3">
        <h2 className="font-mono text-sm font-semibold text-slate-100">{filename}</h2>
        <Button type="button" size="sm" variant="secondary" onClick={copyCode}>
          {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
          {copied ? "Copied" : "Copy code"}
        </Button>
      </div>
      <pre className="max-h-[680px] overflow-auto p-5 text-left text-[13px] leading-6 text-slate-200">
        <code>{code}</code>
      </pre>
    </section>
  )
}

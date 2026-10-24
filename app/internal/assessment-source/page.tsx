import { readFileSync } from "node:fs"
import path from "node:path"
import { CodeCopyBlock } from "@/components/code-copy-block"

const sourceFiles = [
  "app/maturity/assessment/page.tsx",
  "lib/assessment-utils.ts",
  "lib/assessment-data.ts",
  "lib/maturity-engine.ts",
  "app/maturity/results/ResultsClientPage.tsx",
]

function readSourceFile(relativePath: string) {
  return readFileSync(path.join(process.cwd(), relativePath), "utf8")
}

export default function AssessmentSourcePage() {
  const files = sourceFiles.map((filename) => ({ filename, code: readSourceFile(filename) }))

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 md:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">Internal source view</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Maturity assessment source code</h1>
          <p className="mt-3 max-w-3xl text-slate-600">
            This page contains the assessment implementation files in readable, copyable sections. Use the Copy code button for each file when preparing your submission materials.
          </p>
          <p className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Internal route: this page is not linked from the public navigation. Review the files together so the submitted exhibit matches the current implementation.
          </p>
        </header>

        <div className="space-y-6">
          {files.map((file) => <CodeCopyBlock key={file.filename} filename={file.filename} code={file.code} />)}
        </div>
      </div>
    </main>
  )
}

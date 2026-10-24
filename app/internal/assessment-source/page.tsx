import { readFileSync } from "node:fs"
import path from "node:path"

const sourceSections = [
  {
    title: "Assessment entry point",
    description: "Defines the maturity assessment route, renders the guided questionnaire, tracks progress, and collects the respondent's answers.",
    files: ["app/maturity/page.tsx", "app/maturity/assessment/page.tsx"],
  },
  {
    title: "Assessment content and scoring",
    description: "Contains the control definitions, answer normalization, score calculations, maturity bands, and domain-level results logic.",
    files: ["lib/assessment-utils.ts", "lib/assessment-data.ts", "lib/maturity-engine.ts"],
  },
  {
    title: "Results experience",
    description: "Builds the results route and the client-side report, including the maturity summary, domain comparison, radar chart, and action areas.",
    files: [
      "app/maturity/results/page.tsx",
      "app/maturity/results/ResultsClientPage.tsx",
      "components/maturity-summary.tsx",
      "components/domain-radar-chart.tsx",
      "components/summary-table.tsx",
    ],
  },
  {
    title: "Recommendations and reporting",
    description: "Provides the supporting results panels used to explain findings, identify next steps, show compliance context, and support report actions.",
    files: [
      "components/results-actions.tsx",
      "components/compliance-snapshot.tsx",
      "components/omb-heatmap.tsx",
      "components/next-steps-generator.tsx",
      "lib/tracking-utils.ts",
    ],
  },
  {
    title: "Shared interface components",
    description: "The reusable interface primitives used to present the assessment and results consistently across the application.",
    files: [
      "components/ui/button.tsx",
      "components/ui/card.tsx",
      "components/ui/input.tsx",
      "components/ui/label.tsx",
      "components/ui/progress.tsx",
      "components/ui/textarea.tsx",
      "components/ui/checkbox.tsx",
      "components/ui/alert.tsx",
      "components/ui/badge.tsx",
      "components/ui/tabs.tsx",
    ],
  },
]

function readSourceFile(relativePath: string) {
  return readFileSync(path.join(process.cwd(), relativePath), "utf8")
}

export default function AssessmentSourcePage() {
  return (
    <main className="min-h-screen bg-[#f5f7fa] px-4 py-8 text-slate-950 md:px-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        <header className="border-b border-slate-200 pb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">Internal documentation</p>
          <h1 className="mt-3 max-w-4xl text-3xl font-semibold tracking-tight md:text-5xl">Maturity assessment source</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
            A complete, readable view of the code that powers the assessment, scoring model, results report, and supporting interface. Each section explains its role before presenting the relevant files.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-600">
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5">Internal route</span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5">Assessment implementation</span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5">Readable source reference</span>
          </div>
        </header>

        <div className="divide-y divide-slate-200">
          {sourceSections.map((section, sectionIndex) => (
            <section key={section.title} className="py-10 first:pt-8 last:pb-0">
              <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
                <div>
                  <p className="text-sm font-medium text-blue-700">Section {String(sectionIndex + 1).padStart(2, "0")}</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight">{section.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{section.description}</p>
                </div>
                <div className="space-y-8">
                  {section.files.map((filename) => (
                    <article key={filename} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                      <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
                        <h3 className="font-mono text-sm font-semibold text-slate-800">{filename}</h3>
                      </div>
                      <pre className="max-h-[720px] overflow-auto bg-[#111827] p-5 text-[12px] leading-6 text-slate-200">
                        <code>{readSourceFile(filename)}</code>
                      </pre>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}

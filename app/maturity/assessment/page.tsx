"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, CheckCircle2, ClipboardCheck, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { GUIDED_CONTROLS, GUIDED_DOMAINS, type GuidedAssessmentResponse } from "@/lib/assessment-utils"

const levels = ["Not in place", "Ad hoc", "Defined", "Managed", "Optimised"]
type Response = GuidedAssessmentResponse

export default function MaturityAssessmentPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [scope, setScope] = useState({ firm: "", sponsor: "", jurisdiction: "", cadence: "Annual baseline" })
  const [responses, setResponses] = useState<Record<string, Response>>({})

  const currentDomain = GUIDED_DOMAINS[step]
  const currentResponses = GUIDED_CONTROLS.map((_, index) => responses[`${currentDomain.id}-${index}`] ?? { evidence: "", reviewed: false })
  const answered = Object.values(responses).filter((response) => response.score !== undefined).length
  const reviewed = Object.values(responses).filter((response) => response.reviewed).length
  const progress = Math.round((answered / 48) * 100)
  const canContinue = step === 0 ? Boolean(scope.firm.trim() && scope.sponsor.trim()) : true

  const updateResponse = (index: number, patch: Partial<Response>) => {
    const key = `${currentDomain.id}-${index}`
    setResponses((previous) => ({ ...previous, [key]: { evidence: "", reviewed: false, ...previous[key], ...patch } }))
  }

  const finish = () => {
    localStorage.setItem("guided_assessment_responses", JSON.stringify(responses))
    localStorage.setItem("guided_assessment_scope", JSON.stringify(scope))
    localStorage.setItem("assessment_metadata", JSON.stringify({ scope, answered, reviewed, completedAt: new Date().toISOString() }))
    router.push("/maturity/results")
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">The Sentinel Project</p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">Legal Operations Maturity Assessment</h1>
            <p className="mt-2 max-w-3xl text-slate-600">A guided, evidence-led baseline across six operating domains. Complete the scope first, then rate each control and record the evidence behind your judgment.</p>
          </div>
          <div className="hidden rounded-lg border border-slate-200 bg-white p-3 text-right text-sm md:block">
            <p className="font-semibold text-slate-900">48 control statements</p>
            <p className="text-slate-500">Board-ready in one sitting</p>
          </div>
        </header>

        <Card className="border-blue-100 bg-white shadow-sm">
          <CardContent className="space-y-3 p-5">
            <div className="flex items-center justify-between text-sm"><span className="font-medium text-slate-700">Assessment progress</span><span className="text-slate-500">{answered} of 48 answered · {reviewed} reviewed</span></div>
            <Progress value={progress} className="h-2" />
            <div className="flex flex-wrap gap-2 pt-1">
              {GUIDED_DOMAINS.map((domain, index) => <button key={domain.id} type="button" onClick={() => setStep(index)} className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${index === step ? "bg-blue-700 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{index + 1}. {domain.name}</button>)}
            </div>
          </CardContent>
        </Card>

        {step === 0 && (
          <Card className="border-slate-200 shadow-sm">
            <CardHeader><CardTitle>Guided scope & setup</CardTitle><CardDescription>Fix the review context before a question is asked. This makes future baselines repeatable and attributable.</CardDescription></CardHeader>
            <CardContent className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2"><Label htmlFor="firm">Firm or legal function</Label><Input id="firm" value={scope.firm} onChange={(event) => setScope({ ...scope, firm: event.target.value })} placeholder="Aster & Cole LLP" /></div>
              <div className="space-y-2"><Label htmlFor="sponsor">Assessment sponsor</Label><Input id="sponsor" value={scope.sponsor} onChange={(event) => setScope({ ...scope, sponsor: event.target.value })} placeholder="Name and role" /></div>
              <div className="space-y-2"><Label htmlFor="jurisdiction">Primary jurisdiction</Label><Input id="jurisdiction" value={scope.jurisdiction} onChange={(event) => setScope({ ...scope, jurisdiction: event.target.value })} placeholder="United States" /></div>
              <div className="space-y-2"><Label htmlFor="cadence">Review cadence</Label><Input id="cadence" value={scope.cadence} onChange={(event) => setScope({ ...scope, cadence: event.target.value })} /></div>
              <div className="md:col-span-2 flex gap-3 rounded-lg bg-blue-50 p-4 text-sm text-blue-900"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" /><p>This is an indicative maturity baseline, not a legal opinion, certification, audit, or security assessment.</p></div>
            </CardContent>
          </Card>
        )}

        {true && (
          <Card className="border-slate-200 shadow-sm">
            <CardHeader><div className="flex items-center gap-3"><div className="rounded-lg bg-blue-100 p-2 text-blue-700"><ClipboardCheck className="h-5 w-5" /></div><div><CardTitle>{currentDomain.name}</CardTitle><CardDescription>Rate each control, add an evidence note, and mark it reviewed when a named reviewer is satisfied.</CardDescription></div></div></CardHeader>
            <CardContent className="space-y-5">
              {GUIDED_CONTROLS.map((control, index) => { const response = currentResponses[index]; return <div key={control} className="rounded-xl border border-slate-200 p-4"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Control {index + 1} of 8</p><p className="mt-1 font-medium text-slate-900">{control}</p></div>{response.reviewed && <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />}</div><div className="mt-4 grid gap-2 sm:grid-cols-5">{levels.map((level, levelIndex) => <button key={level} type="button" onClick={() => updateResponse(index, { score: levelIndex + 1 })} className={`rounded-lg border px-2 py-2 text-left text-xs transition-colors ${response.score === levelIndex + 1 ? "border-blue-700 bg-blue-700 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50"}`}><span className="block font-semibold">{levelIndex + 1}</span>{level}</button>)}</div><div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto] md:items-end"><div className="space-y-2"><Label htmlFor={`evidence-${index}`}>Evidence note <span className="font-normal text-slate-500">(policy, system control, board pack, or other reference)</span></Label><Textarea id={`evidence-${index}`} value={response.evidence} onChange={(event) => updateResponse(index, { evidence: event.target.value })} placeholder="Add a reference a reviewer can independently check" rows={2} /></div><label className="flex items-center gap-2 pb-2 text-sm text-slate-700"><Checkbox checked={response.reviewed} onCheckedChange={(checked) => updateResponse(index, { reviewed: checked === true })} /> Reviewed</label></div></div> })}
            </CardContent>
          </Card>
        )}

        <footer className="flex items-center justify-between gap-3"><Button variant="outline" onClick={() => step === 0 ? router.push("/maturity") : setStep(step - 1)}><ArrowLeft className="mr-2 h-4 w-4" />{step === 0 ? "Back" : "Previous domain"}</Button>{step < GUIDED_DOMAINS.length - 1 ? <Button disabled={!canContinue} onClick={() => setStep(step + 1)}>Next domain<ArrowRight className="ml-2 h-4 w-4" /></Button> : <Button onClick={finish}>View outcome report<ArrowRight className="ml-2 h-4 w-4" /></Button>}</footer>
      </div>
    </main>
  )
}

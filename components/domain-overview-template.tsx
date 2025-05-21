import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface MaturityJourneyItem {
  band: string
  description: string
  link: string
}

interface DomainOverviewTemplateProps {
  domainId: string
  title: string
  description: string
  keyAreas: string[]
  maturityJourney: MaturityJourneyItem[]
}

export const DomainOverviewTemplate = ({
  domainId,
  title,
  description,
  keyAreas,
  maturityJourney,
}: DomainOverviewTemplateProps) => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">{title}</h1>
        <p className="text-muted-foreground text-lg">{description}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Key Areas</h2>
        <ul className="space-y-2 list-disc pl-5">
          {keyAreas.map((area, index) => (
            <li key={index}>{area}</li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Maturity Journey</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {maturityJourney.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{item.band}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={item.link}>
                  <Button variant="outline" className="w-full gap-2">
                    View Implementation Guide
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <Link href="/playbook">
          <Button variant="outline">Back to Playbook</Button>
        </Link>
        <Link href={`/playbook/domains/${domainId}/initial`}>
          <Button>Get Started</Button>
        </Link>
      </div>
    </div>
  )
}

export default DomainOverviewTemplate

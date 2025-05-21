import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DomainOverviewProps {
  domainId: string
  title: string
  description: string
  keyAreas: string[]
  maturityJourney: {
    band: string
    description: string
    link: string
  }[]
}

export function DomainOverviewTemplate({
  domainId,
  title,
  description,
  keyAreas,
  maturityJourney,
}: DomainOverviewProps) {
  return (
    <div className="container max-w-4xl py-6 md:py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Key Areas</CardTitle>
            <CardDescription>Critical components for success in this domain</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {keyAreas.map((area, index) => (
                <li key={index} className="flex gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  <div>{area}</div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-2xl font-bold mb-4">Maturity Journey</h2>
          <div className="space-y-4">
            {maturityJourney.map((level, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <CardTitle>{level.band}</CardTitle>
                </CardHeader>
                <CardContent className="pb-3">
                  <p className="mb-4">{level.description}</p>
                  <Link href={level.link}>
                    <Button variant="outline" className="gap-2">
                      View Implementation Guide
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

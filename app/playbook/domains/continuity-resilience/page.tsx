"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"

const continuityResilienceData = [
  {
    maturityLevel: "Initial",
    description: "Basic awareness and ad-hoc efforts to maintain business operations during disruptions.",
    practices: [
      "Identify critical business functions and dependencies.",
      "Establish basic communication channels for emergency situations.",
      "Perform initial risk assessments related to business disruptions.",
    ],
  },
  {
    maturityLevel: "Developing",
    description:
      "Developing a more structured approach to continuity and resilience with documented plans and procedures.",
    practices: [
      "Develop documented business continuity plans (BCPs) for critical functions.",
      "Implement backup and recovery procedures for essential data and systems.",
      "Conduct initial training for employees on BCPs and emergency response.",
    ],
  },
  {
    maturityLevel: "Established",
    description: "Formalized and tested continuity and resilience programs integrated into business operations.",
    practices: [
      "Conduct regular testing and exercises of BCPs to validate effectiveness.",
      "Establish a formal incident management process for responding to disruptions.",
      "Implement redundant systems and infrastructure to minimize downtime.",
    ],
  },
  {
    maturityLevel: "Managed",
    description: "Proactive management of continuity and resilience with continuous improvement and monitoring.",
    practices: [
      "Implement monitoring and alerting systems to detect potential disruptions.",
      "Conduct regular reviews and updates of BCPs based on lessons learned and changing business needs.",
      "Establish service level agreements (SLAs) with vendors and suppliers to ensure continuity of critical services.",
    ],
  },
  {
    maturityLevel: "Optimized",
    description:
      "Fully integrated and optimized continuity and resilience capabilities aligned with business strategy and risk tolerance.",
    practices: [
      "Implement advanced technologies and automation to enhance resilience and recovery capabilities.",
      "Conduct regular simulations and scenario planning to identify and address potential vulnerabilities.",
      "Establish a culture of resilience throughout the organization with ongoing training and awareness programs.",
    ],
  },
]

const ContinuityResiliencePage = () => {
  return (
    <div className="container max-w-5xl py-12">
      <h1 className="text-3xl font-bold tracking-tight">Continuity and Resilience</h1>
      <p className="text-muted-foreground">
        Strategies and practices to ensure business operations can withstand and recover from disruptions.
      </p>

      <Accordion type="single" collapsible className="w-full mt-8">
        {continuityResilienceData.map((item) => (
          <AccordionItem value={item.maturityLevel} key={item.maturityLevel}>
            <AccordionTrigger>
              {item.maturityLevel} <Badge className="ml-2">{item.practices.length} Practices</Badge>
            </AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardHeader>
                  <CardTitle>{item.maturityLevel} Maturity</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside">
                    {item.practices.map((practice, index) => (
                      <li key={index}>{practice}</li>
                    ))}
                  </ul>
                  <div className="mt-4">
                    {item.maturityLevel === "Initial" && (
                      <Button variant="outline" size="sm" className="gap-1 whitespace-nowrap">
                        <FileText className="h-3 w-3" />
                        View Initial Guide
                      </Button>
                    )}
                    {item.maturityLevel === "Developing" && (
                      <Button variant="outline" size="sm" className="gap-1 whitespace-nowrap">
                        <FileText className="h-3 w-3" />
                        View Developing Guide
                      </Button>
                    )}
                    {item.maturityLevel === "Established" && (
                      <Button variant="outline" size="sm" className="gap-1 whitespace-nowrap">
                        <FileText className="h-3 w-3" />
                        View Established Guide
                      </Button>
                    )}
                    {item.maturityLevel === "Managed" && (
                      <Button variant="outline" size="sm" className="gap-1 whitespace-nowrap">
                        <FileText className="h-3 w-3" />
                        View Managed Guide
                      </Button>
                    )}
                    {item.maturityLevel === "Optimized" && (
                      <Button variant="outline" size="sm" className="gap-1 whitespace-nowrap">
                        <FileText className="h-3 w-3" />
                        View Optimized Guide
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default ContinuityResiliencePage

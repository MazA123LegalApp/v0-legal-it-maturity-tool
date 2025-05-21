"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const cybersecurityPlaybook = {
  domain: "Cybersecurity",
  description: "A playbook to improve your cybersecurity posture.",
  maturityLevels: [
    {
      level: "Initial",
      description: "Basic cybersecurity measures are in place.",
      practices: [
        "Implement basic firewall protection.",
        "Use antivirus software on all systems.",
        "Establish password policies.",
      ],
    },
    {
      level: "Developing",
      description: "Cybersecurity practices are becoming more formalized.",
      practices: [
        "Conduct regular vulnerability scans.",
        "Implement intrusion detection systems.",
        "Provide cybersecurity awareness training to employees.",
      ],
    },
    {
      level: "Established",
      description: "A comprehensive cybersecurity program is in place.",
      practices: [
        "Implement a security information and event management (SIEM) system.",
        "Conduct regular penetration testing.",
        "Develop and test incident response plans.",
      ],
    },
    {
      level: "Managed",
      description: "Cybersecurity is actively managed and monitored.",
      practices: [
        "Implement threat intelligence feeds.",
        "Automate security incident response.",
        "Conduct regular security audits.",
      ],
    },
    {
      level: "Optimized",
      description: "Cybersecurity is continuously improved and optimized.",
      practices: [
        "Implement advanced threat detection techniques.",
        "Use machine learning to improve security.",
        "Continuously monitor and improve security posture.",
      ],
    },
  ],
}

export default function CybersecurityPage() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>{cybersecurityPlaybook.domain} Playbook</CardTitle>
          <CardDescription>{cybersecurityPlaybook.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] w-full space-y-4">
            <Accordion type="single" collapsible>
              {cybersecurityPlaybook.maturityLevels.map((level, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{level.level}</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">{level.description}</p>
                    <Separator className="my-2" />
                    <h3 className="text-lg font-semibold mb-2">Practices:</h3>
                    <ul className="list-disc list-inside">
                      {level.practices.map((practice, i) => (
                        <li key={i}>{practice}</li>
                      ))}
                    </ul>
                    <Link href={`/playbook/domains/cybersecurity/implementation/${level.level.toLowerCase()}`}>
                      <Button variant="outline" className="w-full gap-2">
                        View {level.level} Guide
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

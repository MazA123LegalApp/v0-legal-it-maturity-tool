"use client"

import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const InfrastructureToolingPage = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Infrastructure Tooling</h1>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="initial">
          <AccordionTrigger>Initial</AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardHeader>
                <CardTitle>Initial Infrastructure Tooling Practices</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Focus on basic tooling for provisioning and configuration management.</p>
                <Button variant="outline" className="w-full gap-2">
                  View Initial Guide
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="developing">
          <AccordionTrigger>Developing</AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardHeader>
                <CardTitle>Developing Infrastructure Tooling Practices</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Implement more advanced tooling for automation and monitoring.</p>
                <Button variant="outline" className="w-full gap-2">
                  View Developing Guide
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="established">
          <AccordionTrigger>Established</AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardHeader>
                <CardTitle>Established Infrastructure Tooling Practices</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Standardize tooling across the organization and integrate with CI/CD pipelines.</p>
                <Button variant="outline" className="w-full gap-2">
                  View Established Guide
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="managed">
          <AccordionTrigger>Managed</AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardHeader>
                <CardTitle>Managed Infrastructure Tooling Practices</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Implement comprehensive monitoring and alerting, and automate incident response.</p>
                <Button variant="outline" className="w-full gap-2">
                  View Managed Guide
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="optimized">
          <AccordionTrigger>Optimized</AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardHeader>
                <CardTitle>Optimized Infrastructure Tooling Practices</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Continuously improve tooling based on data and feedback, and proactively identify and address
                  potential issues.
                </p>
                <Button variant="outline" className="w-full gap-2">
                  View Optimized Guide
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default InfrastructureToolingPage

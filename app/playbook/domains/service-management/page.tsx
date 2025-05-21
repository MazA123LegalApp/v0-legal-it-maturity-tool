"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowRight } from "lucide-react"

const ServiceManagementPage = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">Service Management Playbook</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Overview</h2>
        <p>
          This playbook provides guidance on establishing and improving service management practices within your
          organization. It outlines key areas, maturity levels, and actionable steps to enhance service delivery and
          customer satisfaction.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Maturity Levels</h2>
        <p>
          Service management maturity is assessed across five levels, each representing increasing sophistication and
          effectiveness:
        </p>
        <ul className="list-disc list-inside">
          <li>
            <b>Initial:</b> Ad-hoc processes with limited standardization.
          </li>
          <li>
            <b>Developing:</b> Basic processes are defined and documented.
          </li>
          <li>
            <b>Established:</b> Processes are consistently applied and measured.
          </li>
          <li>
            <b>Managed:</b> Processes are proactively monitored and improved.
          </li>
          <li>
            <b>Optimized:</b> Processes are continuously refined and automated.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Key Areas</h2>

        <Accordion type="single" collapsible>
          <AccordionItem value="incident-management">
            <AccordionTrigger>Incident Management</AccordionTrigger>
            <AccordionContent>
              <p>
                Incident management focuses on restoring normal service operation as quickly as possible to minimize
                impact on business operations.
              </p>

              <Card>
                <CardHeader>
                  <CardTitle>Initial</CardTitle>
                  <CardDescription>Ad-hoc incident resolution.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside">
                    <li>No formal incident logging or tracking.</li>
                    <li>Resolution relies on individual expertise.</li>
                    <li>Limited communication with users.</li>
                  </ul>
                  <Button variant="outline" className="w-full gap-2">
                    View Initial Guide
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Developing</CardTitle>
                  <CardDescription>Basic incident logging and tracking.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside">
                    <li>Basic incident logging system in place.</li>
                    <li>Defined roles and responsibilities for incident handling.</li>
                    <li>Initial attempts at incident prioritization.</li>
                  </ul>
                  <Button variant="outline" className="w-full gap-2">
                    View Developing Guide
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Established</CardTitle>
                  <CardDescription>Consistent incident management processes.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside">
                    <li>Standardized incident logging and classification.</li>
                    <li>Defined escalation paths for complex incidents.</li>
                    <li>Regular incident review meetings.</li>
                  </ul>
                  <Button variant="outline" className="w-full gap-2">
                    View Established Guide
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Managed</CardTitle>
                  <CardDescription>Proactive incident monitoring and improvement.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside">
                    <li>Real-time monitoring of incident trends.</li>
                    <li>Proactive identification of potential incidents.</li>
                    <li>Regular analysis of incident data to identify root causes.</li>
                  </ul>
                  <Button variant="outline" className="w-full gap-2">
                    View Managed Guide
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Optimized</CardTitle>
                  <CardDescription>Automated and continuously improving incident management.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside">
                    <li>Automated incident logging and routing.</li>
                    <li>Self-healing capabilities for common incidents.</li>
                    <li>Continuous improvement based on real-time data and feedback.</li>
                  </ul>
                  <Button variant="outline" className="w-full gap-2">
                    View Optimized Guide
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="problem-management">
            <AccordionTrigger>Problem Management</AccordionTrigger>
            <AccordionContent>
              <p>
                Problem management focuses on identifying and resolving the underlying causes of incidents to prevent
                recurrence.
              </p>

              <Card>
                <CardHeader>
                  <CardTitle>Initial</CardTitle>
                  <CardDescription>Reactive problem solving.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside">
                    <li>Problems are addressed only after incidents occur.</li>
                    <li>Limited root cause analysis.</li>
                    <li>No formal problem tracking.</li>
                  </ul>
                  <Button variant="outline" className="w-full gap-2">
                    View Initial Guide
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Developing</CardTitle>
                  <CardDescription>Basic problem identification and analysis.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside">
                    <li>Basic problem logging system in place.</li>
                    <li>Initial attempts at root cause analysis.</li>
                    <li>Defined roles and responsibilities for problem management.</li>
                  </ul>
                  <Button variant="outline" className="w-full gap-2">
                    View Developing Guide
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Established</CardTitle>
                  <CardDescription>Consistent problem management processes.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside">
                    <li>Standardized problem logging and classification.</li>
                    <li>Formal root cause analysis methodologies.</li>
                    <li>Regular problem review meetings.</li>
                  </ul>
                  <Button variant="outline" className="w-full gap-2">
                    View Established Guide
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Managed</CardTitle>
                  <CardDescription>Proactive problem prevention and trend analysis.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside">
                    <li>Proactive identification of potential problems.</li>
                    <li>Trend analysis to identify recurring issues.</li>
                    <li>Regular review of problem data to identify improvement opportunities.</li>
                  </ul>
                  <Button variant="outline" className="w-full gap-2">
                    View Managed Guide
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Optimized</CardTitle>
                  <CardDescription>Automated problem detection and resolution.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside">
                    <li>Automated problem detection and diagnosis.</li>
                    <li>Self-healing capabilities for known problems.</li>
                    <li>Continuous improvement based on real-time data and feedback.</li>
                  </ul>
                  <Button variant="outline" className="w-full gap-2">
                    View Optimized Guide
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="change-management">
            <AccordionTrigger>Change Management</AccordionTrigger>
            <AccordionContent>
              <p>
                Change management focuses on controlling and managing changes to the IT infrastructure to minimize
                disruptions and ensure successful implementation.
              </p>

              <Card>
                <CardHeader>
                  <CardTitle>Initial</CardTitle>
                  <CardDescription>Uncontrolled changes with high risk of disruption.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside">
                    <li>Changes are implemented without formal approval or planning.</li>
                    <li>Limited testing or risk assessment.</li>
                    <li>Poor communication and coordination.</li>
                  </ul>
                  <Button variant="outline" className="w-full gap-2">
                    View Initial Guide
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Developing</CardTitle>
                  <CardDescription>Basic change control processes.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside">
                    <li>Basic change request process in place.</li>
                    <li>Initial attempts at risk assessment and testing.</li>
                    <li>Defined roles and responsibilities for change management.</li>
                  </ul>
                  <Button variant="outline" className="w-full gap-2">
                    View Developing Guide
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Established</CardTitle>
                  <CardDescription>Consistent change management processes.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside">
                    <li>Standardized change request forms and workflows.</li>
                    <li>Formal change approval process.</li>
                    <li>Regular change review meetings.</li>
                  </ul>
                  <Button variant="outline" className="w-full gap-2">
                    View Established Guide
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Managed</CardTitle>
                  <CardDescription>Proactive change planning and risk management.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside">
                    <li>Proactive identification of potential change risks.</li>
                    <li>Detailed change planning and testing.</li>
                    <li>Regular review of change data to identify improvement opportunities.</li>
                  </ul>
                  <Button variant="outline" className="w-full gap-2">
                    View Managed Guide
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Optimized</CardTitle>
                  <CardDescription>Automated change management and continuous improvement.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside">
                    <li>Automated change request and approval processes.</li>
                    <li>Self-validating changes with automated rollback capabilities.</li>
                    <li>Continuous improvement based on real-time data and feedback.</li>
                  </ul>
                  <Button variant="outline" className="w-full gap-2">
                    View Optimized Guide
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Assessment</h2>
        <p>Use the following table to assess your current maturity level for each key area.</p>

        <Table>
          <TableCaption>Service Management Maturity Assessment</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Area</TableHead>
              <TableHead>Initial</TableHead>
              <TableHead>Developing</TableHead>
              <TableHead>Established</TableHead>
              <TableHead>Managed</TableHead>
              <TableHead>Optimized</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Incident Management</TableCell>
              <TableCell>☐</TableCell>
              <TableCell>☐</TableCell>
              <TableCell>☐</TableCell>
              <TableCell>☐</TableCell>
              <TableCell>☐</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Problem Management</TableCell>
              <TableCell>☐</TableCell>
              <TableCell>☐</TableCell>
              <TableCell>☐</TableCell>
              <TableCell>☐</TableCell>
              <TableCell>☐</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Change Management</TableCell>
              <TableCell>☐</TableCell>
              <TableCell>☐</TableCell>
              <TableCell>☐</TableCell>
              <TableCell>☐</TableCell>
              <TableCell>☐</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </div>
  )
}

export default ServiceManagementPage

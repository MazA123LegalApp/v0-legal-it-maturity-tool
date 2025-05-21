"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const RiskCompliancePage = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Risk and Compliance Playbook</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Overview</h2>
        <p className="text-gray-700">
          This playbook provides guidance on managing risk and ensuring compliance within your organization. It outlines
          key areas, maturity levels, and implementation guides to help you build a robust risk and compliance program.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Key Areas</h2>

        <Accordion type="single" collapsible>
          <AccordionItem value="risk-management">
            <AccordionTrigger>Risk Management</AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardHeader>
                  <CardTitle>Risk Identification</CardTitle>
                  <CardDescription>Identify potential risks to your organization.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Maturity Level</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Initial</TableCell>
                        <TableCell>Basic risk identification processes are in place.</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" className="w-full gap-2">
                            View Initial Guide
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Developing</TableCell>
                        <TableCell>Risk assessments are conducted regularly.</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" className="w-full gap-2">
                            View Developing Guide
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Established</TableCell>
                        <TableCell>A formal risk management framework is implemented.</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" className="w-full gap-2">
                            View Established Guide
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Managed</TableCell>
                        <TableCell>Risk is actively monitored and managed.</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" className="w-full gap-2">
                            View Managed Guide
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Optimized</TableCell>
                        <TableCell>Risk management is integrated into all business processes.</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" className="w-full gap-2">
                            View Optimized Guide
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="compliance-management">
            <AccordionTrigger>Compliance Management</AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardHeader>
                  <CardTitle>Regulatory Compliance</CardTitle>
                  <CardDescription>Ensure compliance with relevant regulations and standards.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Maturity Level</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Initial</TableCell>
                        <TableCell>Basic awareness of regulatory requirements.</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" className="w-full gap-2">
                            View Initial Guide
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Developing</TableCell>
                        <TableCell>Compliance efforts are underway.</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" className="w-full gap-2">
                            View Developing Guide
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Established</TableCell>
                        <TableCell>A compliance program is in place.</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" className="w-full gap-2">
                            View Established Guide
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Managed</TableCell>
                        <TableCell>Compliance is actively monitored and enforced.</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" className="w-full gap-2">
                            View Managed Guide
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Optimized</TableCell>
                        <TableCell>
                          Compliance is integrated into all business processes and continuously improved.
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" className="w-full gap-2">
                            View Optimized Guide
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="data-privacy">
            <AccordionTrigger>Data Privacy</AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardHeader>
                  <CardTitle>Data Protection</CardTitle>
                  <CardDescription>Protect sensitive data and ensure privacy.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Maturity Level</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Initial</TableCell>
                        <TableCell>Basic data protection measures are in place.</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" className="w-full gap-2">
                            View Initial Guide
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Developing</TableCell>
                        <TableCell>Data privacy policies are being developed.</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" className="w-full gap-2">
                            View Developing Guide
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Established</TableCell>
                        <TableCell>A data privacy program is implemented.</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" className="w-full gap-2">
                            View Established Guide
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Managed</TableCell>
                        <TableCell>Data privacy is actively monitored and enforced.</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" className="w-full gap-2">
                            View Managed Guide
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Optimized</TableCell>
                        <TableCell>
                          Data privacy is integrated into all business processes and continuously improved.
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" className="w-full gap-2">
                            View Optimized Guide
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Resources</h2>
        <ul>
          <li>
            <Link href="#" className="text-blue-500 hover:underline">
              Risk Management Framework
            </Link>
          </li>
          <li>
            <Link href="#" className="text-blue-500 hover:underline">
              Compliance Checklist
            </Link>
          </li>
          <li>
            <Link href="#" className="text-blue-500 hover:underline">
              Data Privacy Guide
            </Link>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Feedback</h2>
        <p className="text-gray-700 mb-2">Help us improve this playbook by providing your feedback.</p>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Enter your email" />
          <Label htmlFor="feedback">Feedback</Label>
          <Input type="text" id="feedback" placeholder="Enter your feedback" />
          <Button>Submit Feedback</Button>
        </div>
      </section>
    </div>
  )
}

export default RiskCompliancePage

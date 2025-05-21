"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const ChangeDeploymentPage = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Change & Deployment Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Initial Maturity Level */}
        <Card>
          <CardHeader>
            <CardTitle>Initial</CardTitle>
            <CardDescription>Basic change and deployment processes are in place.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Focus on establishing fundamental procedures for managing changes and deployments.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full gap-2">
              View Initial Guide
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        {/* Developing Maturity Level */}
        <Card>
          <CardHeader>
            <CardTitle>Developing</CardTitle>
            <CardDescription>Change and deployment processes are becoming more structured.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Implement standardized change request forms and deployment checklists.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full gap-2">
              View Developing Guide
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        {/* Established Maturity Level */}
        <Card>
          <CardHeader>
            <CardTitle>Established</CardTitle>
            <CardDescription>Well-defined change and deployment processes are consistently followed.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Establish a change advisory board (CAB) and implement automated deployment tools.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full gap-2">
              View Established Guide
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        {/* Managed Maturity Level */}
        <Card>
          <CardHeader>
            <CardTitle>Managed</CardTitle>
            <CardDescription>Change and deployment processes are proactively monitored and improved.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Implement key performance indicators (KPIs) to track change and deployment success rates.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full gap-2">
              View Managed Guide
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        {/* Optimized Maturity Level */}
        <Card>
          <CardHeader>
            <CardTitle>Optimized</CardTitle>
            <CardDescription>
              Change and deployment processes are continuously optimized for efficiency and effectiveness.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Utilize advanced analytics to identify areas for improvement and automate change and deployment processes.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full gap-2">
              View Optimized Guide
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default ChangeDeploymentPage

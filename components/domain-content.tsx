import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { FileText } from "lucide-react"
import type { DomainContent } from "@/lib/domain-content"

interface DomainContentProps {
  content: DomainContent
}

export function DomainContentDisplay({ content }: DomainContentProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>What This Score Means</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{content.whatThisMeans}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top 5 Priorities for Legal Institutions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {content.priorities.map((priority, index) => (
              <li key={index} className="flex gap-2">
                <div className="font-medium">{priority}</div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recommended Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {content.templates.map((template, index) => (
                <li key={index} className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>{template}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Wins</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {content.quickWins.map((win, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>{win}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Related Playbook Links</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {content.relatedLinks.map((link, index) => (
              <li key={index}>
                <Link href={link.href} className="text-primary hover:underline">
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

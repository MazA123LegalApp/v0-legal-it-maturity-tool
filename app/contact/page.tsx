import Link from "next/link"
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ContactForm } from "@/components/contact-form"

export default function ContactPage() {
  return (
    <div className="container max-w-4xl py-6 md:py-10">
      {/* Back Navigation */}
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Have questions about the Legal IT Maturity Tool or need support? We'd love to hear from you.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Contact Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-600" />
                Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Get in touch via email</p>
              <p className="font-medium">We'll respond within 24 hours</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-green-600" />
                Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Need technical support?</p>
              <p className="font-medium">We'll respond within 24 hours</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-orange-600" />
                Beta Program
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">This tool is currently in beta</p>
              <p className="font-medium">Your feedback helps us improve</p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-orange-50 rounded-lg p-6 md:p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="grid gap-6 md:grid-cols-2 text-left">
            <div>
              <h3 className="font-semibold mb-2">How long does the assessment take?</h3>
              <p className="text-muted-foreground text-sm">
                The assessment typically takes 15-30 minutes to complete, depending on your organization's complexity.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Is my data secure?</h3>
              <p className="text-muted-foreground text-sm">
                Yes, all assessment data is stored securely and is not shared with third parties.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can I save and resume later?</h3>
              <p className="text-muted-foreground text-sm">
                Currently, assessments need to be completed in one session. We're working on save functionality.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What formats are reports available in?</h3>
              <p className="text-muted-foreground text-sm">
                Reports can be downloaded as PDF for presentations or Excel for detailed analysis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { submitContactForm } from "@/lib/contact-actions"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      const result = await submitContactForm(formData)

      if (result.success) {
        setSubmitStatus("success")
        // Reset form
        const form = document.getElementById("contact-form") as HTMLFormElement
        form?.reset()
      } else {
        setSubmitStatus("error")
        setErrorMessage(result.error || "Failed to send message. Please try again.")
      }
    } catch (error) {
      setSubmitStatus("error")
      setErrorMessage("An unexpected error occurred. Please try again.")
      console.error("Contact form error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {submitStatus === "success" && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Thank you for your message! We'll get back to you within 24 hours.
          </AlertDescription>
        </Alert>
      )}

      {submitStatus === "error" && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">{errorMessage}</AlertDescription>
        </Alert>
      )}

      <form id="contact-form" action={handleSubmit} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              required
              disabled={isSubmitting}
              placeholder="Enter your first name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              required
              disabled={isSubmitting}
              placeholder="Enter your last name"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            disabled={isSubmitting}
            placeholder="Enter your email address"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message *</Label>
          <Textarea
            id="message"
            name="message"
            required
            disabled={isSubmitting}
            placeholder="Tell us how we can help you..."
            rows={5}
          />
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending Message...
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </form>
    </div>
  )
}

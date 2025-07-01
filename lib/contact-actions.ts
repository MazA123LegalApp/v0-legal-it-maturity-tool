"use server"

import { Resend } from "resend"

const resend = new Resend("re_PeUYD8AM_M7yUyMwach8vGJmcKA2XVpqU")

export async function submitContactForm(formData: FormData) {
  try {
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const message = formData.get("message") as string

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return {
        success: false,
        error: "All fields are required",
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: "Please enter a valid email address",
      }
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Legal IT Maturity Tool <noreply@resend.dev>",
      to: ["maz.araghrez@gmail.com"],
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #555; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h3 style="color: #555; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6; color: #333;">${message.replace(/\n/g, "<br>")}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #e8f4fd; border-radius: 8px;">
            <p style="margin: 0; font-size: 14px; color: #666;">
              This message was sent from the Legal IT Maturity Tool contact form.
            </p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${firstName} ${lastName}
Email: ${email}

Message:
${message}

---
This message was sent from the Legal IT Maturity Tool contact form.
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return {
        success: false,
        error: "Failed to send email. Please try again later.",
      }
    }

    // Log successful submission
    console.log("Contact form submitted successfully:", {
      id: data?.id,
      from: email,
      name: `${firstName} ${lastName}`,
      timestamp: new Date().toISOString(),
    })

    return {
      success: true,
      message: "Message sent successfully!",
    }
  } catch (error) {
    console.error("Contact form submission error:", error)
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    }
  }
}

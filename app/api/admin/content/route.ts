import { type NextRequest, NextResponse } from "next/server"
import { saveContent, getContent, listContent, deleteContent, type ContentItem } from "@/lib/content-management"

// Verify admin authentication
function isAuthenticated(request: NextRequest): boolean {
  // Check for admin authentication
  // In a real app, this would verify a session token or similar
  const adminAuth = request.cookies.get("admin_authenticated")
  return adminAuth?.value === "true"
}

export async function GET(request: NextRequest) {
  // Check authentication
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Get query parameters
  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get("type") as any
  const domain = searchParams.get("domain") || undefined
  const maturityBand = searchParams.get("maturityBand") || undefined
  const id = searchParams.get("id") || undefined

  // If ID is provided, get a specific content item
  if (id && type) {
    const content = await getContent(type, domain, maturityBand, id)
    if (!content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 })
    }
    return NextResponse.json(content)
  }

  // Otherwise, list content items
  const contentItems = await listContent(type, domain, maturityBand)
  return NextResponse.json(contentItems)
}

export async function POST(request: NextRequest) {
  // Check authentication
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const contentItem = (await request.json()) as ContentItem

    // Validate required fields
    if (!contentItem.type || !contentItem.title || !contentItem.content) {
      return NextResponse.json(
        { error: "Missing required fields: type, title, and content are required" },
        { status: 400 },
      )
    }

    // Add updatedBy field if not present
    if (!contentItem.updatedBy) {
      contentItem.updatedBy = "admin"
    }

    // Save the content
    const success = await saveContent(contentItem)

    if (success) {
      return NextResponse.json({ success: true, message: "Content saved successfully" })
    } else {
      return NextResponse.json({ error: "Failed to save content" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error in POST /api/admin/content:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  // Check authentication
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const contentItem = (await request.json()) as ContentItem

    // Validate required fields
    if (!contentItem.type || (!contentItem.id && !contentItem.title)) {
      return NextResponse.json(
        { error: "Missing required fields: type and either id or title are required" },
        { status: 400 },
      )
    }

    // Delete the content
    const success = await deleteContent(contentItem)

    if (success) {
      return NextResponse.json({ success: true, message: "Content deleted successfully" })
    } else {
      return NextResponse.json({ error: "Failed to delete content" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error in DELETE /api/admin/content:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

import { NextResponse } from "next/server"
import { kvGet } from "@/lib/kv"

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json()
    if (!sessionId) {
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 })
    }

    const results = await kvGet(`assessment:${sessionId}`)
    console.log("📦 Fetched results for:", sessionId, !!results ? "✅ Found" : "❌ Not Found")

    return NextResponse.json({ results })
  } catch (err) {
    console.error("❌ Failed to load assessment:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

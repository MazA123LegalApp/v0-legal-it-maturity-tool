import { NextResponse } from "next/server"
import { kvSet } from "@/lib/kv"

export async function POST(req: Request) {
  try {
    const { sessionId, results } = await req.json()

    if (!sessionId || !results) {
      console.warn("Missing sessionId or results:", { sessionId, results })
      return NextResponse.json({ error: "Missing data" }, { status: 400 })
    }

    await kvSet(`assessment:${sessionId}`, results)
    console.log("✅ Saved results for:", sessionId)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("❌ Failed to save assessment:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

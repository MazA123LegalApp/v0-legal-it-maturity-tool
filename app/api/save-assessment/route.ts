import { NextResponse } from "next/server"
import { kvSet } from "@/lib/kv"

export async function POST(req: Request) {
  try {
    const { sessionId, results } = await req.json()
    if (!sessionId || !results) return NextResponse.json({ error: "Missing data" }, { status: 400 })

    await kvSet(`assessment:${sessionId}`, results)
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

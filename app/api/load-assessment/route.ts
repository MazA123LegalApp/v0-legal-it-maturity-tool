import { NextResponse } from "next/server"
import { kvGet } from "@/lib/kv"

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json()
    if (!sessionId) return NextResponse.json({ error: "Missing sessionId" }, { status: 400 })

    const results = await kvGet(`assessment:${sessionId}`)
    return NextResponse.json({ results })
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

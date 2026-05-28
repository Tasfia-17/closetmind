import { NextRequest, NextResponse } from 'next/server'

const API_KEY = process.env.PERFECT_CORP_API_KEY!
const BASE = 'https://yce-api-01.makeupar.com'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const res = await fetch(`${BASE}/s2s/v2.0/task/face-attr-analysis`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    return NextResponse.json(await res.json())
  } catch (e: unknown) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 })
  }
}

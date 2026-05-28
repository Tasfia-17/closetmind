import { NextRequest, NextResponse } from 'next/server'

const API_KEY = process.env.PERFECT_CORP_API_KEY!
const BASE = 'https://yce-api-01.makeupar.com'

export async function POST(req: NextRequest) {
  try {
    const { selfie_id } = await req.json()
    const res = await fetch(`${BASE}/s2s/v2.1/task/skin-analysis`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        src_file_id: selfie_id,
        dst_actions: ['hd_acne', 'hd_pore', 'hd_moisture'],
      }),
    })
    return NextResponse.json(await res.json())
  } catch (e: unknown) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 })
  }
}

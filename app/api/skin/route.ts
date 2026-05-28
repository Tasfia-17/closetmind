import { NextRequest, NextResponse } from 'next/server'
import { getAccessToken } from '@/lib/perfectcorp-auth'

const BASE = 'https://yce-api-01.perfectcorp.com'

export async function POST(req: NextRequest) {
  try {
    const { selfie_id } = await req.json()
    const token = await getAccessToken()

    const taskRes = await fetch(`${BASE}/s2s/v1.0/task/skin-analysis`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        request_id: Date.now(),
        payload: {
          file_sets: { src_ids: [selfie_id] },
          actions: [{ id: 0, params: { dst_actions: ['hd_acne', 'hd_pore', 'hd_moisture'] } }],
          output_ext: 'jpg',
        },
      }),
    })
    const taskData = await taskRes.json()
    if (!taskRes.ok) return NextResponse.json({ error: taskData.message }, { status: 500 })
    const taskId = taskData.result.task_id

    for (let i = 0; i < 60; i++) {
      const poll = await fetch(`${BASE}/s2s/v1.0/task/skin-analysis?task_id=${encodeURIComponent(taskId)}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const d = await poll.json()
      if (d.result.status === 'success') return NextResponse.json({ url: d.result.results[0].data[0].url })
      if (d.result.status === 'error') return NextResponse.json({ error: d.result.error }, { status: 500 })
      await new Promise(r => setTimeout(r, d.result.polling_interval || 1000))
    }
    return NextResponse.json({ error: 'Timeout' }, { status: 500 })
  } catch (e: unknown) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 })
  }
}

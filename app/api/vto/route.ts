import { NextRequest, NextResponse } from 'next/server'
import { getAccessToken } from '@/lib/perfectcorp-auth'

const BASE = 'https://yce-api-01.perfectcorp.com'

async function runTask(feature: string, payload: object) {
  const token = await getAccessToken()
  const res = await fetch(`${BASE}/s2s/v1.0/task/${feature}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ request_id: Date.now(), payload }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || `Task start failed (${res.status})`)
  return data.result.task_id
}

async function pollTask(feature: string, taskId: string): Promise<string> {
  const token = await getAccessToken()
  for (let i = 0; i < 60; i++) {
    const res = await fetch(`${BASE}/s2s/v1.0/task/${feature}?task_id=${encodeURIComponent(taskId)}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || `Poll failed (${res.status})`)
    const r = data.result
    if (r.status === 'success') return r.results[0].data[0].url
    if (r.status === 'error') throw new Error(r.message || r.error || 'Task error')
    await new Promise(x => setTimeout(x, r.polling_interval || 1000))
  }
  throw new Error('Timeout')
}

// POST /api/vto  body: { feature, selfie_id, item_url, params? }
export async function POST(req: NextRequest) {
  try {
    const { feature, selfie_id, item_url, params } = await req.json()

    let payload: object
    switch (feature) {
      case 'cloth':
        payload = {
          file_sets: { src_ids: [selfie_id] },
          actions: [{ id: 0, params: { ref_file_url: item_url, garment_category: 'auto' } }],
          output_ext: 'jpg',
        }
        break
      case 'shoes':
        payload = {
          file_sets: { src_ids: [selfie_id] },
          actions: [{ id: 0, params: { ref_file_url: item_url, gender: 'female' } }],
          output_ext: 'jpg',
        }
        break
      case 'bag':
      case '2d-vto/earring':
      case '2d-vto/ring':
      case '2d-vto/bracelet':
      case '2d-vto/watch':
      case '2d-vto/necklace':
        payload = {
          file_sets: { src_ids: [selfie_id] },
          actions: [{ id: 0, params: { ref_file_url: item_url } }],
          output_ext: 'jpg',
        }
        break
      case 'hair-style':
      case 'hair-color':
        payload = {
          file_sets: { src_ids: [selfie_id] },
          actions: [{ id: 0, params: params }],
          output_ext: 'jpg',
        }
        break
      case 'mu-trans-rec':
        payload = {
          file_sets: { src_ids: [selfie_id], ref_ids: [params.ref_id] },
          actions: [{ id: 0 }],
          output_ext: 'jpg',
        }
        break
      default:
        return NextResponse.json({ error: 'Unknown feature' }, { status: 400 })
    }

    const taskId = await runTask(feature, payload)
    const resultUrl = await pollTask(feature, taskId)
    return NextResponse.json({ url: resultUrl })
  } catch (e: unknown) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'

const API_KEY = process.env.PERFECT_CORP_API_KEY!
const BASE = 'https://yce-api-01.makeupar.com'

async function startTask(feature: string, body: object): Promise<string> {
  const res = await fetch(`${BASE}/s2s/v2.0/task/${feature}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || `Task failed (${res.status})`)
  const taskId = data?.data?.task_id || data?.task_id
  if (!taskId) throw new Error(`No task_id returned: ${JSON.stringify(data).slice(0, 200)}`)
  return taskId
}

async function pollTask(feature: string, taskId: string): Promise<string> {
  for (let i = 0; i < 40; i++) {
    await new Promise(r => setTimeout(r, 3000))
    const res = await fetch(`${BASE}/s2s/v2.0/task/${feature}/${taskId}`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    })
    const data = await res.json()
    const status = data?.data?.task_status || data?.task_status
    if (status === 'success') {
      const url = data?.data?.results?.url || data?.results?.url
      if (!url) throw new Error('No result URL')
      return url
    }
    if (status === 'error') throw new Error(data?.data?.message || 'Task error')
  }
  throw new Error('Timeout')
}

// POST /api/vto  body: { feature, selfie_id, item_url, params? }
export async function POST(req: NextRequest) {
  try {
    const { feature, selfie_id, item_url, params } = await req.json()

    let taskId: string
    switch (feature) {
      case 'cloth':
        taskId = await startTask('cloth', { src_file_id: selfie_id, ref_file_url: item_url, garment_category: 'auto' })
        break
      case 'shoes':
        taskId = await startTask('shoes', { src_file_id: selfie_id, ref_file_url: item_url, gender: 'female' })
        break
      case 'bag':
      case '2d-vto/earring':
      case '2d-vto/ring':
      case '2d-vto/bracelet':
      case '2d-vto/watch':
      case '2d-vto/necklace':
        taskId = await startTask(feature, { src_file_id: selfie_id, ref_file_url: item_url })
        break
      case 'hair-style':
      case 'hair-color':
        taskId = await startTask(feature, { src_file_id: selfie_id, ...params })
        break
      case 'mu-trans-rec':
        taskId = await startTask('mu-trans-rec', { src_file_id: selfie_id, ref_file_id: params?.ref_id })
        break
      default:
        return NextResponse.json({ error: 'Unknown feature' }, { status: 400 })
    }

    const url = await pollTask(feature, taskId)
    return NextResponse.json({ url })
  } catch (e: unknown) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'

const API_KEY = process.env.PERFECT_CORP_API_KEY!
const BASE = 'https://yce-api-01.makeupar.com'

const FILE_ENDPOINT: Record<string, string> = {
  cloth: 'cloth', shoes: 'shoes', bag: 'bag',
  'earring': '2d-vto/earring', 'ring': '2d-vto/ring',
  'bracelet': '2d-vto/bracelet', 'watch': '2d-vto/watch', 'necklace': '2d-vto/necklace',
  'hair-style': 'hair-style', 'hair-color': 'hair-color',
  'mu-trans-rec': 'mu-trans-rec',
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData()
    const file = form.get('file') as File
    const feature = (form.get('feature') as string) || 'cloth'
    const endpoint = FILE_ENDPOINT[feature] || feature

    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

    // Step 1: get presigned URL
    const initRes = await fetch(`${BASE}/s2s/v2.0/file/${endpoint}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        files: [{ file_name: file.name || 'photo.jpg', file_size: file.size, content_type: file.type || 'image/jpeg' }]
      }),
    })
    const initData = await initRes.json()
    if (!initRes.ok) return NextResponse.json({ error: initData.message || `Upload init failed (${initRes.status})` }, { status: 500 })

    const fileInfo = initData?.data?.files?.[0]
    if (!fileInfo) return NextResponse.json({ error: 'No file info', raw: initData }, { status: 500 })

    const { file_id, requests } = fileInfo
    const putUrl = requests?.[0]?.url
    if (!putUrl) return NextResponse.json({ error: 'No upload URL' }, { status: 500 })

    // Step 2: PUT to presigned URL
    await fetch(putUrl, {
      method: 'PUT',
      body: await file.arrayBuffer(),
      headers: { 'Content-Type': file.type || 'image/jpeg' },
    })

    return NextResponse.json({ file_id })
  } catch (e: unknown) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'

const BASE = 'https://yce-api-01.perfectcorp.com'

export async function POST(req: NextRequest) {
  const form = await req.formData()
  const file = form.get('file') as File
  const feature = form.get('feature') as string || 'cloth'

  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

  // Step 1: get presigned URL
  const initRes = await fetch(`${BASE}/s2s/v1.0/file/${feature}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PERFECT_CORP_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      files: [{ file_name: file.name, content_type: file.type }]
    }),
  })
  const initData = await initRes.json()
  if (!initRes.ok) return NextResponse.json({ error: initData.message }, { status: 500 })

  const fileInfo = initData.result.files[0]
  const { url, headers, method } = fileInfo.requests[0]

  // Step 2: PUT to presigned URL
  const bytes = await file.arrayBuffer()
  await fetch(url, { method, headers, body: bytes })

  return NextResponse.json({ file_id: fileInfo.file_id })
}

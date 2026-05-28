// Perfect Corp API client — all v1.0 endpoints
const BASE = 'https://yce-api-01.perfectcorp.com'

function authHeader() {
  return { Authorization: `Bearer ${process.env.PERFECT_CORP_API_KEY}` }
}

// ── File upload ──────────────────────────────────────────────────────────────
export async function uploadFile(feature: string, file: File): Promise<string> {
  // Step 1: get presigned URL
  const res = await fetch(`${BASE}/s2s/v1.0/file/${feature}`, {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({
      files: [{ file_name: file.name, content_type: file.type }]
    }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'File init failed')

  const fileInfo = data.result.files[0]
  const { url, headers, method } = fileInfo.requests[0]

  // Step 2: PUT to presigned URL
  await fetch(url, {
    method,
    headers,
    body: file,
  })

  return fileInfo.file_id
}

// ── Task runner ──────────────────────────────────────────────────────────────
export async function runTask(feature: string, payload: object): Promise<string> {
  const res = await fetch(`${BASE}/s2s/v1.0/task/${feature}`, {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ request_id: Date.now(), payload }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Task start failed')
  return data.result.task_id
}

// ── Poll until done ──────────────────────────────────────────────────────────
export async function pollTask(feature: string, taskId: string): Promise<string> {
  for (let i = 0; i < 60; i++) {
    const res = await fetch(`${BASE}/s2s/v1.0/task/${feature}?task_id=${encodeURIComponent(taskId)}`, {
      headers: authHeader(),
    })
    const data = await res.json()
    const result = data.result
    if (result.status === 'success') {
      return result.results[0].data[0].url
    }
    if (result.status === 'error') throw new Error(result.error || 'Task failed')
    await new Promise(r => setTimeout(r, result.polling_interval || 1000))
  }
  throw new Error('Task timed out')
}

// ── High-level helpers ───────────────────────────────────────────────────────
export async function vtoClothes(selfieId: string, garmentUrl: string) {
  const taskId = await runTask('cloth', {
    file_sets: { src_ids: [selfieId] },
    actions: [{ id: 0, params: { ref_file_url: garmentUrl, garment_category: 'auto' } }],
    output_ext: 'jpg',
  })
  return pollTask('cloth', taskId)
}

export async function vtoShoes(selfieId: string, shoeUrl: string) {
  const taskId = await runTask('shoes', {
    file_sets: { src_ids: [selfieId] },
    actions: [{ id: 0, params: { ref_file_url: shoeUrl, gender: 'female' } }],
    output_ext: 'jpg',
  })
  return pollTask('shoes', taskId)
}

export async function vtoBag(selfieId: string, bagUrl: string) {
  const taskId = await runTask('bag', {
    file_sets: { src_ids: [selfieId] },
    actions: [{ id: 0, params: { ref_file_url: bagUrl } }],
    output_ext: 'jpg',
  })
  return pollTask('bag', taskId)
}

export async function vtoEarring(selfieId: string, earringUrl: string) {
  const taskId = await runTask('2d-vto/earring', {
    file_sets: { src_ids: [selfieId] },
    actions: [{ id: 0, params: { ref_file_url: earringUrl } }],
    output_ext: 'jpg',
  })
  return pollTask('2d-vto/earring', taskId)
}

export async function vtoRing(selfieId: string, ringUrl: string) {
  const taskId = await runTask('2d-vto/ring', {
    file_sets: { src_ids: [selfieId] },
    actions: [{ id: 0, params: { ref_file_url: ringUrl } }],
    output_ext: 'jpg',
  })
  return pollTask('2d-vto/ring', taskId)
}

export async function vtoBracelet(selfieId: string, braceletUrl: string) {
  const taskId = await runTask('2d-vto/bracelet', {
    file_sets: { src_ids: [selfieId] },
    actions: [{ id: 0, params: { ref_file_url: braceletUrl } }],
    output_ext: 'jpg',
  })
  return pollTask('2d-vto/bracelet', taskId)
}

export async function vtoWatch(selfieId: string, watchUrl: string) {
  const taskId = await runTask('2d-vto/watch', {
    file_sets: { src_ids: [selfieId] },
    actions: [{ id: 0, params: { ref_file_url: watchUrl } }],
    output_ext: 'jpg',
  })
  return pollTask('2d-vto/watch', taskId)
}

export async function vtoNecklace(selfieId: string, necklaceUrl: string) {
  const taskId = await runTask('2d-vto/necklace', {
    file_sets: { src_ids: [selfieId] },
    actions: [{ id: 0, params: { ref_file_url: necklaceUrl } }],
    output_ext: 'jpg',
  })
  return pollTask('2d-vto/necklace', taskId)
}

export async function vtoMakeup(selfieId: string, refId: string) {
  const taskId = await runTask('mu-trans-rec', {
    file_sets: { src_ids: [selfieId], ref_ids: [refId] },
    actions: [{ id: 0 }],
    output_ext: 'jpg',
  })
  return pollTask('mu-trans-rec', taskId)
}

export async function vtoHairStyle(selfieId: string, styleGroupId: number, styleId: number) {
  const taskId = await runTask('hair-style', {
    file_sets: { src_ids: [selfieId] },
    actions: [{ id: 0, params: { style_group_id: styleGroupId, style_ids: [styleId] } }],
    output_ext: 'jpg',
  })
  return pollTask('hair-style', taskId)
}

export async function vtoHairColor(selfieId: string, styleGroupId: number, styleId: number) {
  const taskId = await runTask('hair-color', {
    file_sets: { src_ids: [selfieId] },
    actions: [{ id: 0, params: { style_group_id: styleGroupId, style_ids: [styleId] } }],
    output_ext: 'jpg',
  })
  return pollTask('hair-color', taskId)
}

export async function analyzeSkin(selfieId: string) {
  const taskId = await runTask('skin-analysis', {
    file_sets: { src_ids: [selfieId] },
    actions: [{ id: 0, params: { dst_actions: ['hd_acne', 'hd_pore', 'hd_moisture'] } }],
    output_ext: 'jpg',
  })
  return pollTask('skin-analysis', taskId)
}

export async function analyzeFace(selfieId: string) {
  const taskId = await runTask('face-attr-analysis', {
    file_sets: { src_ids: [selfieId] },
    actions: [{ id: 0 }],
  })
  return pollTask('face-attr-analysis', taskId)
}

export async function textToImage(prompt: string, styleGroupId: number, styleId: number) {
  const taskId = await runTask('text-to-image', {
    actions: [{ id: 0, params: { prompt, style_group_id: styleGroupId, style_ids: [styleId] } }],
    output_ext: 'jpg',
  })
  return pollTask('text-to-image', taskId)
}

export async function getHairStyles() {
  const res = await fetch(`${BASE}/s2s/v1.0/task/style-group/hair-style`, { headers: authHeader() })
  return res.json()
}

export async function getTextToImageStyles() {
  const res = await fetch(`${BASE}/s2s/v1.0/task/style-group/text-to-image`, { headers: authHeader() })
  return res.json()
}

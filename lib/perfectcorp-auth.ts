// Perfect Corp authentication — exchanges API key for access_token
// The access_token is valid for 2 hours; we cache it in memory.

const BASE = 'https://yce-api-01.perfectcorp.com'

let cachedToken: string | null = null
let tokenExpiry = 0

export async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiry) return cachedToken

  const clientId = process.env.PERFECT_CORP_API_KEY!
  const publicKeyPem = process.env.PERFECT_CORP_PUBLIC_KEY!

  const timestamp = Date.now()
  const plaintext = `client_id=${clientId}&timestamp=${timestamp}`

  // Import RSA public key and encrypt
  const keyData = pemToArrayBuffer(publicKeyPem)
  const cryptoKey = await crypto.subtle.importKey(
    'spki',
    keyData,
    { name: 'RSA-OAEP', hash: 'SHA-1' },
    false,
    ['encrypt']
  )
  const encrypted = await crypto.subtle.encrypt(
    { name: 'RSA-OAEP' },
    cryptoKey,
    new TextEncoder().encode(plaintext)
  )
  const idToken = btoa(String.fromCharCode(...new Uint8Array(encrypted)))

  const res = await fetch(`${BASE}/s2s/v1.0/client/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ client_id: clientId, id_token: idToken }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || `Auth failed (${res.status})`)

  cachedToken = data.result.access_token
  tokenExpiry = Date.now() + 90 * 60 * 1000 // cache for 90 min (token valid 2h)
  return cachedToken!
}

function pemToArrayBuffer(pem: string): ArrayBuffer {
  const b64 = pem
    .replace(/-----BEGIN PUBLIC KEY-----/, '')
    .replace(/-----END PUBLIC KEY-----/, '')
    .replace(/\s/g, '')
  const binary = atob(b64)
  const buf = new ArrayBuffer(binary.length)
  const view = new Uint8Array(buf)
  for (let i = 0; i < binary.length; i++) view[i] = binary.charCodeAt(i)
  return buf
}

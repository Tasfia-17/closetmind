'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { CornerSprig } from '@/components/Botanicals'

const STYLE_OPTIONS = ['Minimalist', 'Classic', 'Bohemian', 'Streetwear', 'Preppy', 'Romantic', 'Edgy', 'Sporty']

export default function OnboardPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selfie, setSelfie] = useState<File | null>(null)
  const [selfiePreview, setSelfiePreview] = useState('')
  const [styles, setStyles] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)

  function handleSelfie(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    setSelfie(f)
    setSelfiePreview(URL.createObjectURL(f))
  }

  function toggleStyle(s: string) {
    setStyles(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
  }

  async function finish() {
    setUploading(true)
    if (selfie) {
      const form = new FormData()
      form.append('file', selfie)
      form.append('feature', 'cloth')
      const res = await fetch('/api/vto/upload', { method: 'POST', body: form })
      const data = await res.json()
      if (data.file_id) localStorage.setItem('closetmind_selfie_id', data.file_id)
    }
    if (selfiePreview) localStorage.setItem('closetmind_selfie_url', selfiePreview)
    localStorage.setItem('closetmind_styles', JSON.stringify(styles))
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#f7f4ed] flex flex-col">
      <nav className="flex items-center justify-between px-8 py-5 max-w-4xl mx-auto w-full">
        <Link href="/" className="font-serif text-xl text-[#191919]">ClosetMind</Link>
        <div className="flex gap-1">
          {[1, 2, 3].map(n => (
            <div key={n} className={`w-8 h-1 rounded-full transition-colors ${n <= step ? 'bg-[#191919]' : 'bg-[#e8e4da]'}`} />
          ))}
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="card p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0"><CornerSprig flip /></div>

            {step === 1 && (
              <>
                <h2 className="font-serif text-2xl text-[#191919] mb-2">Upload your selfie</h2>
                <p className="text-sm text-[#6b6b6b] mb-6">This is how Perfect Corp will render your clothes on you today.</p>
                <label className="block w-full aspect-square rounded-xl border-2 border-dashed border-[#d4cfc4] hover:border-[#191919] transition-colors cursor-pointer overflow-hidden">
                  {selfiePreview
                    ? <img src={selfiePreview} alt="selfie" className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-[#9e9a91]">
                        <span className="text-3xl">📸</span>
                        <span className="text-sm">Click to upload</span>
                      </div>
                  }
                  <input type="file" accept="image/*" className="hidden" onChange={handleSelfie} />
                </label>
                <button onClick={() => setStep(2)} className="btn-primary w-full mt-6">
                  {selfie ? 'Continue' : 'Skip for now'}
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="font-serif text-2xl text-[#191919] mb-2">Your style profile</h2>
                <p className="text-sm text-[#6b6b6b] mb-6">Pick up to 3. This helps the AI understand your preferences.</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {STYLE_OPTIONS.map(s => (
                    <button
                      key={s}
                      onClick={() => toggleStyle(s)}
                      className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                        styles.includes(s)
                          ? 'bg-[#191919] text-white border-[#191919]'
                          : 'border-[#d4cfc4] text-[#333] hover:border-[#191919]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="btn-secondary flex-1">Back</button>
                  <button onClick={() => setStep(3)} className="btn-primary flex-1">Continue</button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="font-serif text-2xl text-[#191919] mb-2">You&apos;re ready</h2>
                <p className="text-sm text-[#6b6b6b] mb-6">Your wardrobe has 15 demo items pre-loaded. Add your own from the dashboard.</p>
                <div className="space-y-3 mb-6">
                  {[
                    { icon: '✓', text: 'Selfie uploaded for VTO' },
                    { icon: '✓', text: '15 demo wardrobe items ready' },
                    { icon: '✓', text: 'Hybrid search engine active' },
                    { icon: '✓', text: 'Smart 3 algorithm enabled' },
                  ].map(item => (
                    <div key={item.text} className="flex items-center gap-3 text-sm text-[#333]">
                      <span className="w-5 h-5 rounded-full bg-[#50B33A]/10 text-[#50B33A] flex items-center justify-center text-xs font-bold">{item.icon}</span>
                      {item.text}
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="btn-secondary flex-1">Back</button>
                  <button onClick={finish} disabled={uploading} className="btn-primary flex-1">
                    {uploading ? 'Setting up...' : 'Go to dashboard'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

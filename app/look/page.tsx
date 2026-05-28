'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getWardrobe } from '@/lib/memory'
import type { WardrobeItem } from '@/types'

const CATEGORY_FEATURES: Record<string, string> = {
  clothing: 'cloth', outerwear: 'cloth',
  footwear: 'shoes', bag: 'bag',
  jewelry: '2d-vto/earring',
}

export default function LookPage() {
  const [wardrobe, setWardrobe] = useState<WardrobeItem[]>([])
  const [selected, setSelected] = useState<WardrobeItem[]>([])
  const [selfieId, setSelfieId] = useState('')
  const [selfiePreview, setSelfiePreview] = useState('')
  const [results, setResults] = useState<{ item: WardrobeItem; url: string }[]>([])
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState('')

  useEffect(() => {
    setWardrobe(getWardrobe())
    setSelfieId(localStorage.getItem('closetmind_selfie_id') || '')
    setSelfiePreview(localStorage.getItem('closetmind_selfie_url') || '')
  }, [])

  function toggleItem(item: WardrobeItem) {
    setSelected(prev =>
      prev.find(i => i.id === item.id)
        ? prev.filter(i => i.id !== item.id)
        : prev.length < 6 ? [...prev, item] : prev
    )
  }

  async function assembleLook() {
    if (!selfieId || selected.length === 0) return
    setLoading(true)
    setResults([])
    const newResults: { item: WardrobeItem; url: string }[] = []
    for (const item of selected) {
      setCurrentStep(`Rendering ${item.name}...`)
      try {
        const feature = CATEGORY_FEATURES[item.category] || 'cloth'
        const res = await fetch('/api/vto', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ feature, selfie_id: selfieId, item_url: item.imageUrl }),
        })
        const data = await res.json()
        if (data.url) newResults.push({ item, url: data.url })
      } catch { /* skip failed items */ }
    }
    setResults(newResults)
    setCurrentStep('')
    setLoading(false)
  }

  async function uploadSelfie(file: File) {
    setSelfiePreview(URL.createObjectURL(file))
    const fd = new FormData()
    fd.append('file', file)
    fd.append('feature', 'cloth')
    const res = await fetch('/api/vto/upload', { method: 'POST', body: fd })
    const data = await res.json()
    if (data.file_id) {
      setSelfieId(data.file_id)
      localStorage.setItem('closetmind_selfie_id', data.file_id)
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f4ed]">
      <nav className="flex items-center justify-between px-8 py-5 max-w-6xl mx-auto border-b border-[#e8e4da]">
        <Link href="/dashboard" className="font-serif text-xl text-[#191919]">ClosetMind</Link>
        <Link href="/dashboard" className="text-sm text-[#6b6b6b] hover:text-[#191919]">← Dashboard</Link>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="font-serif text-3xl text-[#191919] mb-2">Complete look</h1>
        <p className="text-[#6b6b6b] text-sm mb-8">Select up to 6 items. See each one on you in sequence.</p>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Left: selfie + selected */}
          <div className="space-y-4">
            <div className="card p-4">
              <div className="text-xs font-medium text-[#333] mb-2">Your selfie</div>
              <label className="block aspect-square rounded-lg border-2 border-dashed border-[#d4cfc4] hover:border-[#191919] cursor-pointer overflow-hidden">
                {selfiePreview
                  ? <img src={selfiePreview} alt="selfie" className="w-full h-full object-cover" />
                  : <div className="w-full h-full flex items-center justify-center text-[#9e9a91] text-xs">Upload selfie</div>
                }
                <input type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) uploadSelfie(f) }} />
              </label>
            </div>

            <div className="card p-4">
              <div className="text-xs font-medium text-[#333] mb-2">Selected ({selected.length}/6)</div>
              <div className="space-y-2">
                {selected.map(item => (
                  <div key={item.id} className="flex items-center gap-2">
                    <img src={item.imageUrl} alt={item.name} className="w-8 h-8 object-cover rounded" />
                    <span className="text-xs text-[#333] flex-1 truncate">{item.name}</span>
                    <button onClick={() => toggleItem(item)} className="text-[#9e9a91] hover:text-[#191919] text-xs">✕</button>
                  </div>
                ))}
                {selected.length === 0 && <div className="text-xs text-[#9e9a91]">No items selected</div>}
              </div>
            </div>

            <button
              onClick={assembleLook}
              disabled={!selfieId || selected.length === 0 || loading}
              className="btn-primary w-full"
            >
              {loading ? currentStep || 'Rendering...' : 'Assemble look'}
            </button>
          </div>

          {/* Middle: wardrobe grid */}
          <div className="md:col-span-2">
            <div className="text-xs font-medium text-[#333] mb-3">Pick items (tap to select)</div>
            <div className="grid grid-cols-3 gap-2">
              {wardrobe.map(item => (
                <button key={item.id} onClick={() => toggleItem(item)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selected.find(i => i.id === item.id)
                      ? 'border-[#191919] ring-2 ring-[#191919]/20'
                      : 'border-transparent hover:border-[#d4cfc4]'
                  }`}>
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: results */}
          <div>
            <div className="text-xs font-medium text-[#333] mb-3">VTO results</div>
            {results.length > 0 ? (
              <div className="space-y-3">
                {results.map(({ item, url }) => (
                  <div key={item.id} className="card overflow-hidden">
                    <img src={url} alt={item.name} className="w-full aspect-square object-cover" />
                    <div className="p-2 text-xs font-medium text-[#191919]">{item.name}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card p-6 text-center text-[#9e9a91]">
                <div className="text-3xl mb-2">👗</div>
                <div className="text-xs">Results appear here</div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

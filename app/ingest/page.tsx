'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { addItem } from '@/lib/memory'
import type { WardrobeItem } from '@/types'

const CATEGORIES = ['clothing', 'footwear', 'jewelry', 'bag', 'outerwear'] as const
const FORMALITIES = ['casual', 'smart-casual', 'formal'] as const
const SEASONS = ['spring', 'summer', 'fall', 'winter']

export default function IngestPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState('')
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    name: '', category: 'clothing' as WardrobeItem['category'],
    subcategory: '', color: '', pattern: 'solid', fabric: '',
    formality: 'casual' as WardrobeItem['formality'],
    seasons: [] as string[], tags: '',
  })

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  function toggleSeason(s: string) {
    setForm(prev => ({
      ...prev,
      seasons: prev.seasons.includes(s) ? prev.seasons.filter(x => x !== s) : [...prev.seasons, s]
    }))
  }

  async function save() {
    if (!form.name) return
    setSaving(true)
    let imageUrl = preview
    if (file) {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('feature', 'cloth')
      const res = await fetch('/api/vto/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.file_id) imageUrl = preview // keep local preview; file_id stored separately
    }
    const item: WardrobeItem = {
      id: `item-${Date.now()}`,
      name: form.name,
      category: form.category,
      subcategory: form.subcategory,
      color: form.color,
      pattern: form.pattern,
      fabric: form.fabric,
      season: form.seasons.length ? form.seasons : ['spring', 'summer', 'fall', 'winter'],
      formality: form.formality,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
      wearCount: 0,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      addedAt: new Date().toISOString(),
    }
    addItem(item)
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#f7f4ed]">
      <nav className="flex items-center justify-between px-8 py-5 max-w-4xl mx-auto border-b border-[#e8e4da]">
        <Link href="/dashboard" className="font-serif text-xl text-[#191919]">ClosetMind</Link>
        <Link href="/dashboard" className="text-sm text-[#6b6b6b] hover:text-[#191919]">← Dashboard</Link>
      </nav>

      <main className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="font-serif text-3xl text-[#191919] mb-2">Add to wardrobe</h1>
        <p className="text-[#6b6b6b] text-sm mb-8">Upload a photo and tag it. AI will help you find it later.</p>

        <div className="card p-6 space-y-5">
          {/* Photo upload */}
          <label className="block w-full aspect-video rounded-xl border-2 border-dashed border-[#d4cfc4] hover:border-[#191919] transition-colors cursor-pointer overflow-hidden">
            {preview
              ? <img src={preview} alt="item" className="w-full h-full object-contain bg-[#f7f4ed]" />
              : <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-[#9e9a91]">
                  <span className="text-4xl">👗</span>
                  <span className="text-sm">Upload photo or flat-lay</span>
                  <span className="text-xs">JPG, PNG up to 10MB</span>
                </div>
            }
            <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
          </label>

          {/* Name */}
          <div>
            <label className="block text-xs font-medium text-[#333] mb-1.5">Item name *</label>
            <input className="input" placeholder="e.g. Navy Blazer" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
          </div>

          {/* Category + Subcategory */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#333] mb-1.5">Category</label>
              <select className="input" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value as WardrobeItem['category'] }))}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#333] mb-1.5">Subcategory</label>
              <input className="input" placeholder="e.g. blazer, dress, boots" value={form.subcategory} onChange={e => setForm(p => ({ ...p, subcategory: e.target.value }))} />
            </div>
          </div>

          {/* Color + Pattern */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#333] mb-1.5">Color</label>
              <input className="input" placeholder="e.g. navy, cream, black" value={form.color} onChange={e => setForm(p => ({ ...p, color: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#333] mb-1.5">Pattern</label>
              <input className="input" placeholder="e.g. solid, stripe, floral" value={form.pattern} onChange={e => setForm(p => ({ ...p, pattern: e.target.value }))} />
            </div>
          </div>

          {/* Fabric + Formality */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#333] mb-1.5">Fabric</label>
              <input className="input" placeholder="e.g. wool, silk, denim" value={form.fabric} onChange={e => setForm(p => ({ ...p, fabric: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#333] mb-1.5">Formality</label>
              <select className="input" value={form.formality} onChange={e => setForm(p => ({ ...p, formality: e.target.value as WardrobeItem['formality'] }))}>
                {FORMALITIES.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
          </div>

          {/* Seasons */}
          <div>
            <label className="block text-xs font-medium text-[#333] mb-2">Seasons</label>
            <div className="flex gap-2">
              {SEASONS.map(s => (
                <button key={s} type="button" onClick={() => toggleSeason(s)}
                  className={`px-3 py-1 rounded-full text-xs border transition-colors capitalize ${
                    form.seasons.includes(s) ? 'bg-[#191919] text-white border-[#191919]' : 'border-[#d4cfc4] text-[#333]'
                  }`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-medium text-[#333] mb-1.5">Tags (comma separated)</label>
            <input className="input" placeholder="e.g. work, date, travel" value={form.tags} onChange={e => setForm(p => ({ ...p, tags: e.target.value }))} />
          </div>

          <button onClick={save} disabled={!form.name || saving} className="btn-primary w-full py-2.5">
            {saving ? 'Saving...' : 'Add to wardrobe'}
          </button>
        </div>
      </main>
    </div>
  )
}

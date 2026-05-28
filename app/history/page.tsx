'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getHistory, getWardrobe, logOutfit } from '@/lib/memory'
import type { WardrobeItem } from '@/types'

export default function HistoryPage() {
  const [history, setHistory] = useState<ReturnType<typeof getHistory>>([])
  const [wardrobe, setWardrobe] = useState<WardrobeItem[]>([])
  const [logging, setLogging] = useState(false)
  const [selected, setSelected] = useState<string[]>([])
  const [occasion, setOccasion] = useState('')

  useEffect(() => {
    setHistory(getHistory())
    setWardrobe(getWardrobe())
  }, [])

  function getItems(ids: string[]) {
    return ids.map(id => wardrobe.find(i => i.id === id)).filter(Boolean) as WardrobeItem[]
  }

  function logToday() {
    if (selected.length === 0) return
    logOutfit({ date: new Date().toISOString().split('T')[0], itemIds: selected, occasion })
    setHistory(getHistory())
    setWardrobe(getWardrobe())
    setSelected([])
    setOccasion('')
    setLogging(false)
  }

  return (
    <div className="min-h-screen bg-[#f7f4ed]">
      <nav className="flex items-center justify-between px-8 py-5 max-w-4xl mx-auto border-b border-[#e8e4da]">
        <Link href="/dashboard" className="font-serif text-xl text-[#191919]">ClosetMind</Link>
        <Link href="/dashboard" className="text-sm text-[#6b6b6b] hover:text-[#191919]">← Dashboard</Link>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl text-[#191919] mb-1">Outfit history</h1>
            <p className="text-[#6b6b6b] text-sm">Track what you wear. Never repeat to the same crowd.</p>
          </div>
          <button onClick={() => setLogging(!logging)} className="btn-primary">
            Log today
          </button>
        </div>

        {/* Log today panel */}
        {logging && (
          <div className="card p-5 mb-6">
            <h3 className="font-medium text-[#191919] mb-3 text-sm">What did you wear today?</h3>
            <div className="grid grid-cols-5 gap-2 mb-4">
              {wardrobe.map(item => (
                <button key={item.id} onClick={() => setSelected(prev => prev.includes(item.id) ? prev.filter(x => x !== item.id) : [...prev, item.id])}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${selected.includes(item.id) ? 'border-[#191919]' : 'border-transparent hover:border-[#d4cfc4]'}`}>
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <input className="input mb-3" placeholder="Occasion (optional)" value={occasion} onChange={e => setOccasion(e.target.value)} />
            <div className="flex gap-3">
              <button onClick={() => setLogging(false)} className="btn-secondary flex-1">Cancel</button>
              <button onClick={logToday} disabled={selected.length === 0} className="btn-primary flex-1">Save</button>
            </div>
          </div>
        )}

        {/* History timeline */}
        {history.length === 0 ? (
          <div className="text-center py-16 text-[#9e9a91]">
            <div className="text-4xl mb-3">📅</div>
            <div className="font-medium text-[#333] mb-1">No outfits logged yet</div>
            <div className="text-sm">Click &ldquo;Log today&rdquo; to start tracking</div>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map(entry => {
              const items = getItems(entry.itemIds)
              return (
                <div key={entry.id} className="card p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-medium text-[#191919] text-sm">
                        {new Date(entry.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                      </div>
                      {entry.occasion && <div className="text-xs text-[#6b6b6b] mt-0.5">{entry.occasion}</div>}
                    </div>
                    <div className="text-xs text-[#9e9a91]">{items.length} items</div>
                  </div>
                  <div className="flex gap-2">
                    {items.map(item => (
                      <div key={item.id} className="relative group">
                        <img src={item.imageUrl} alt={item.name} className="w-14 h-14 object-cover rounded-lg" />
                        <div className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white text-[9px] text-center px-1">{item.name}</span>
                        </div>
                      </div>
                    ))}
                    <Link href={`/look?items=${entry.itemIds.join(',')}`}
                      className="w-14 h-14 rounded-lg border-2 border-dashed border-[#d4cfc4] hover:border-[#191919] flex items-center justify-center text-[#9e9a91] hover:text-[#191919] transition-colors text-xs">
                      Remix
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}

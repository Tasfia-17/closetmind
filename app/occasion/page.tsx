'use client'
import { useState } from 'react'
import Link from 'next/link'
import { smart3 } from '@/lib/memory'
import type { WardrobeItem } from '@/types'

const OCCASION_EXAMPLES = [
  'Client dinner tonight, confident but not flashy',
  'Casual brunch with friends this weekend',
  'Job interview at a tech startup',
  'First date at a nice restaurant',
  'Work from home but have a video call',
  'Weekend farmers market',
]

export default function OccasionPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<[WardrobeItem, WardrobeItem, WardrobeItem] | null>(null)
  const [searched, setSearched] = useState(false)

  function solve() {
    if (!query.trim()) return
    const r = smart3(query)
    setResults(r)
    setSearched(true)
  }

  const LABELS = [
    { key: 'safe', label: 'Safe choice', desc: 'Highest preference score, proven for similar occasions', color: 'bg-[#50B33A]/10 text-[#50B33A]' },
    { key: 'fresh', label: 'Fresh choice', desc: 'Unworn 60+ days, high semantic match', color: 'bg-blue-50 text-blue-600' },
    { key: 'remix', label: 'Remix choice', desc: 'Different category, new combination', color: 'bg-purple-50 text-purple-600' },
  ]

  return (
    <div className="min-h-screen bg-[#f7f4ed]">
      <nav className="flex items-center justify-between px-8 py-5 max-w-4xl mx-auto border-b border-[#e8e4da]">
        <Link href="/dashboard" className="font-serif text-xl text-[#191919]">ClosetMind</Link>
        <Link href="/dashboard" className="text-sm text-[#6b6b6b] hover:text-[#191919]">← Dashboard</Link>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="font-serif text-3xl text-[#191919] mb-2">Occasion solver</h1>
        <p className="text-[#6b6b6b] text-sm mb-8">Describe your event. Get exactly 3 outfit options from your wardrobe in 90 seconds.</p>

        <div className="card p-6 mb-8">
          <textarea
            className="input resize-none h-24 mb-4"
            placeholder="e.g. Client dinner tonight, confident but not flashy..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button onClick={solve} disabled={!query.trim()} className="btn-primary w-full py-2.5">
            Find my outfit
          </button>
        </div>

        {/* Examples */}
        {!searched && (
          <div>
            <div className="text-xs text-[#9e9a91] mb-3 uppercase tracking-wide">Try these</div>
            <div className="space-y-2">
              {OCCASION_EXAMPLES.map(ex => (
                <button key={ex} onClick={() => setQuery(ex)}
                  className="w-full text-left px-4 py-3 card hover:border-[#191919] transition-colors text-sm text-[#333]">
                  {ex}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Smart 3 results */}
        {searched && results && (
          <div>
            <div className="text-sm text-[#6b6b6b] mb-4">Smart 3 for: <em>&ldquo;{query}&rdquo;</em></div>
            <div className="grid md:grid-cols-3 gap-4">
              {results.map((item, i) => (
                <div key={item.id} className="card overflow-hidden">
                  <div className="aspect-square overflow-hidden">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${LABELS[i].color}`}>
                      {LABELS[i].label}
                    </span>
                    <div className="font-medium text-[#191919] mt-2 text-sm">{item.name}</div>
                    <div className="text-xs text-[#9e9a91] mt-0.5 capitalize">{item.color} · {item.formality}</div>
                    <div className="text-xs text-[#9e9a91] mt-1">{LABELS[i].desc}</div>
                    <Link href={`/studio?item=${item.id}`} className="btn-primary w-full mt-3 text-center block text-xs py-1.5">
                      Try it on →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => { setSearched(false); setResults(null); setQuery('') }}
              className="btn-secondary mt-6 mx-auto block">
              Try another occasion
            </button>
          </div>
        )}

        {searched && !results && (
          <div className="text-center py-12 text-[#9e9a91]">
            <div className="text-3xl mb-3">🤔</div>
            <div className="font-medium text-[#333] mb-1">Not enough items matched</div>
            <div className="text-sm">Try a broader description or <Link href="/ingest" className="underline">add more items</Link></div>
          </div>
        )}
      </main>
    </div>
  )
}

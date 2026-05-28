'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { hybridSearch } from '@/lib/memory'
import type { SearchResult } from '@/types'

const SUGGESTIONS = [
  'cozy rainy day', 'client dinner tonight', 'casual weekend',
  'black blazer', 'something elegant', 'summer dress',
]

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [searched, setSearched] = useState(false)

  useEffect(() => {
    if (!query.trim()) { setResults([]); setSearched(false); return }
    const r = hybridSearch(query)
    setResults(r)
    setSearched(true)
  }, [query])

  return (
    <div className="min-h-screen bg-[#f7f4ed]">
      <nav className="flex items-center justify-between px-8 py-5 max-w-6xl mx-auto border-b border-[#e8e4da]">
        <Link href="/dashboard" className="font-serif text-xl text-[#191919]">ClosetMind</Link>
        <Link href="/dashboard" className="text-sm text-[#6b6b6b] hover:text-[#191919]">← Dashboard</Link>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="font-serif text-3xl text-[#191919] mb-2">Search your wardrobe</h1>
        <p className="text-[#6b6b6b] text-sm mb-6">Natural language, color, occasion, or date. It finds it.</p>

        {/* Search bar */}
        <div className="relative mb-4">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9e9a91]">🔍</span>
          <input
            className="input pl-10 py-3 text-base"
            placeholder="e.g. cozy rainy day, black blazer, Sarah's wedding..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9e9a91] hover:text-[#191919]">✕</button>
          )}
        </div>

        {/* Suggestions */}
        {!query && (
          <div className="flex flex-wrap gap-2 mb-8">
            {SUGGESTIONS.map(s => (
              <button key={s} onClick={() => setQuery(s)}
                className="px-3 py-1.5 rounded-full text-xs border border-[#d4cfc4] text-[#6b6b6b] hover:border-[#191919] hover:text-[#191919] transition-colors">
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Results */}
        {searched && (
          <div className="mb-4 text-sm text-[#6b6b6b]">
            {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
          </div>
        )}

        {results.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {results.map(({ item, score, matchType }) => (
              <Link key={item.id} href={`/studio?item=${item.id}`} className="card overflow-hidden hover:border-[#191919] transition-colors group">
                <div className="aspect-square overflow-hidden relative">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-2 right-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      matchType === 'semantic' ? 'bg-[#50B33A]/10 text-[#50B33A]' : 'bg-[#191919]/10 text-[#191919]'
                    }`}>
                      {matchType}
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <div className="text-sm font-medium text-[#191919] truncate">{item.name}</div>
                  <div className="text-xs text-[#9e9a91] mt-0.5 capitalize">{item.color} · {item.formality}</div>
                  <div className="mt-1.5 h-1 bg-[#e8e4da] rounded-full overflow-hidden">
                    <div className="h-full bg-[#191919] rounded-full" style={{ width: `${Math.round(score * 100)}%` }} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {searched && results.length === 0 && (
          <div className="text-center py-16 text-[#9e9a91]">
            <div className="text-4xl mb-3">🔍</div>
            <div className="font-medium text-[#333] mb-1">No matches found</div>
            <div className="text-sm">Try different words or <Link href="/ingest" className="underline">add more items</Link></div>
          </div>
        )}
      </main>
    </div>
  )
}

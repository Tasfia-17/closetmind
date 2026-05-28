'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CornerSprig } from '@/components/Botanicals'
import { getWardrobe, getRediscoveries } from '@/lib/memory'
import type { WardrobeItem } from '@/types'

export default function DashboardPage() {
  const [wardrobe, setWardrobe] = useState<WardrobeItem[]>([])
  const [rediscoveries, setRediscoveries] = useState<WardrobeItem[]>([])

  useEffect(() => {
    setWardrobe(getWardrobe())
    setRediscoveries(getRediscoveries())
  }, [])

  const stats = [
    { label: 'Total items', value: wardrobe.length },
    { label: 'Worn this month', value: wardrobe.filter(i => i.lastWorn && new Date(i.lastWorn) > new Date(Date.now() - 30 * 86400000)).length },
    { label: 'Unworn 90+ days', value: rediscoveries.length },
    { label: 'Total wears logged', value: wardrobe.reduce((s, i) => s + i.wearCount, 0) },
  ]

  const quickActions = [
    { href: '/ingest', icon: '📸', label: 'Add item', desc: 'Upload a new piece' },
    { href: '/search', icon: '🔍', label: 'Search wardrobe', desc: 'Natural language search' },
    { href: '/studio', icon: '✨', label: 'AI Studio', desc: 'Virtual try-on' },
    { href: '/occasion', icon: '🎯', label: 'Occasion solver', desc: 'What should I wear?' },
    { href: '/look', icon: '👗', label: 'Complete look', desc: 'Assemble an outfit' },
    { href: '/history', icon: '📅', label: 'History', desc: 'Past outfits' },
  ]

  return (
    <div className="min-h-screen bg-[#f7f4ed]">
      <nav className="flex items-center justify-between px-8 py-5 max-w-6xl mx-auto border-b border-[#e8e4da]">
        <Link href="/" className="font-serif text-xl text-[#191919]">ClosetMind</Link>
        <div className="flex items-center gap-4">
          <Link href="/search" className="text-sm text-[#6b6b6b] hover:text-[#191919]">Search</Link>
          <Link href="/ingest" className="btn-primary">Add item</Link>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl text-[#191919] mb-1">Your wardrobe</h1>
            <p className="text-[#6b6b6b] text-sm">Everything you own, searchable and visualizable.</p>
          </div>
          <div className="hidden md:block"><CornerSprig /></div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map(s => (
            <div key={s.label} className="card p-5">
              <div className="font-serif text-2xl text-[#191919] mb-1">{s.value}</div>
              <div className="text-xs text-[#6b6b6b]">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <h2 className="font-serif text-xl text-[#191919] mb-4">Quick actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
          {quickActions.map(a => (
            <Link key={a.href} href={a.href} className="card p-5 hover:border-[#191919] transition-colors group">
              <div className="text-2xl mb-2">{a.icon}</div>
              <div className="font-medium text-[#191919] text-sm group-hover:underline">{a.label}</div>
              <div className="text-xs text-[#6b6b6b] mt-0.5">{a.desc}</div>
            </Link>
          ))}
        </div>

        {/* Rediscoveries */}
        {rediscoveries.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-xl text-[#191919]">Rediscover these</h2>
              <span className="text-xs text-[#6b6b6b]">Unworn 90+ days</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
              {rediscoveries.map(item => (
                <Link key={item.id} href={`/studio?item=${item.id}`} className="card overflow-hidden hover:border-[#191919] transition-colors group">
                  <div className="aspect-square overflow-hidden">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-2">
                    <div className="text-xs font-medium text-[#191919] truncate">{item.name}</div>
                    <div className="text-[10px] text-[#9e9a91] mt-0.5">
                      {item.lastWorn ? `Last worn ${new Date(item.lastWorn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` : 'Never worn'}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* Full wardrobe grid */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-xl text-[#191919]">All items</h2>
          <Link href="/search" className="text-sm text-[#6b6b6b] hover:text-[#191919]">Search →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {wardrobe.map(item => (
            <Link key={item.id} href={`/studio?item=${item.id}`} className="card overflow-hidden hover:border-[#191919] transition-colors group">
              <div className="aspect-square overflow-hidden">
                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-3">
                <div className="text-xs font-medium text-[#191919] truncate">{item.name}</div>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-[10px] text-[#9e9a91] capitalize">{item.category}</span>
                  <span className="text-[10px] text-[#d4cfc4]">·</span>
                  <span className="text-[10px] text-[#9e9a91]">{item.wearCount}×</span>
                </div>
              </div>
            </Link>
          ))}
          <Link href="/ingest" className="card border-dashed flex flex-col items-center justify-center aspect-square hover:border-[#191919] transition-colors text-[#9e9a91] hover:text-[#191919]">
            <span className="text-2xl mb-1">+</span>
            <span className="text-xs">Add item</span>
          </Link>
        </div>
      </main>
    </div>
  )
}

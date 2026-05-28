'use client'
import Link from 'next/link'

export default function SettingsPage() {
  function clearData() {
    if (confirm('Reset all wardrobe data to demo items?')) {
      localStorage.removeItem('closetmind_wardrobe')
      localStorage.removeItem('closetmind_history')
      window.location.href = '/dashboard'
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f4ed]">
      <nav className="flex items-center justify-between px-8 py-5 max-w-4xl mx-auto border-b border-[#e8e4da]">
        <Link href="/dashboard" className="font-serif text-xl text-[#191919]">ClosetMind</Link>
        <Link href="/dashboard" className="text-sm text-[#6b6b6b] hover:text-[#191919]">← Dashboard</Link>
      </nav>
      <main className="max-w-xl mx-auto px-6 py-10">
        <h1 className="font-serif text-3xl text-[#191919] mb-8">Settings</h1>
        <div className="card p-6 space-y-4">
          <div>
            <div className="font-medium text-[#191919] text-sm mb-1">API Status</div>
            <div className="text-xs text-[#50B33A]">✓ Perfect Corp API key configured</div>
          </div>
          <div className="border-t border-[#e8e4da] pt-4">
            <div className="font-medium text-[#191919] text-sm mb-1">Data</div>
            <div className="text-xs text-[#6b6b6b] mb-3">Wardrobe data is stored locally in your browser.</div>
            <button onClick={clearData} className="text-xs text-red-500 hover:text-red-700 underline">
              Reset to demo data
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

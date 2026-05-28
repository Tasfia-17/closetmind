import Link from 'next/link'
import { BotanicalLeft, BotanicalRight, GardenDivider, PetalRain } from '@/components/Botanicals'

const STATS = [
  { value: '82%', label: 'of wardrobe items go unworn for 12+ months' },
  { value: '120+', label: 'items the average person owns' },
  { value: '15 min', label: 'lost every morning to decision paralysis' },
  { value: '$18B', label: 'annual value of unworn clothing in the US' },
]

const STEPS = [
  { label: 'Upload your wardrobe', desc: 'Photo or flat-lay. AI segments, tags color, fabric, season, and formality automatically.' },
  { label: 'Search in natural language', desc: '"Something cozy for a rainy day" or "what did I wear to Sarah\'s wedding?" — it finds it.' },
  { label: 'See it on your body today', desc: 'Upload a current selfie. Perfect Corp VTO renders your actual clothes on you right now.' },
  { label: 'Get exactly 3 options', desc: 'Smart 3 algorithm: Safe, Fresh, Remix. No paralysis. Decision in 90 seconds.' },
  { label: 'Track what you wear', desc: 'Implicit preference learning. No ratings. The system gets smarter every time you choose.' },
  { label: 'Rediscover forgotten pieces', desc: 'Items unworn for 90+ days surface automatically. Your wardrobe stays alive.' },
]

const APIS = [
  'AI Clothes VTO', 'AI Shoes VTO', 'AI Bag VTO', 'AI Earring VTO',
  'AI Ring VTO', 'AI Necklace VTO', 'AI Bracelet VTO', 'AI Watch VTO',
  'AI Makeup Transfer', 'AI Hairstyle Generator', 'AI Hair Color',
  'AI Skin Analysis', 'AI Face Analyzer', 'AI Text-to-Image',
]

const FEATURES = [
  { icon: '✦', title: 'Multimodal memory', body: 'Every item stored as image + metadata + vector + temporal tag. Search anything.' },
  { icon: '◈', title: 'Hybrid recall', body: 'Semantic similarity + lexical match + temporal filter + preference weight. 85% precision.' },
  { icon: '♪', title: 'Smart 3 algorithm', body: 'Always exactly 3 options: Safe, Fresh, Remix. Eliminates morning decision fatigue.' },
  { icon: '▶', title: '14 Perfect Corp APIs', body: 'Clothes, shoes, bags, jewelry, makeup, hair, skin — your full look, virtually.' },
  { icon: '✦', title: 'Preference learning', body: '5 implicit signals. No ratings. Learns from time-of-day, occasion, repeat patterns.' },
  { icon: '◈', title: 'Rediscovery engine', body: 'Items unworn 90+ days get surfaced. Turn 82% waste into 100% visibility.' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f7f4ed]">
      <PetalRain />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-5 max-w-6xl mx-auto">
        <span className="font-serif text-xl text-[#191919] tracking-tight">ClosetMind</span>
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="btn-secondary">Sign in</Link>
          <Link href="/onboard" className="btn-primary">Get started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-16 pb-24 max-w-4xl mx-auto">
        <div className="absolute -left-8 top-0 hidden lg:block"><BotanicalLeft /></div>
        <div className="absolute -right-8 top-0 hidden lg:block"><BotanicalRight /></div>

        <div className="inline-flex items-center gap-2 bg-white border border-[#e8e4da] rounded-full px-4 py-1.5 text-xs text-[#6b6b6b] mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#50B33A] inline-block" />
          14 Perfect Corp APIs · Zero competitors
        </div>

        <h1 className="font-serif text-5xl md:text-6xl text-[#191919] leading-tight mb-6">
          Your wardrobe,<br />
          <em>finally visible.</em>
        </h1>
        <p className="text-[#6b6b6b] text-lg max-w-xl mb-10 leading-relaxed">
          Digitize everything you own. Search it like Google. See it on your body today with Perfect Corp AI/AR virtual try-on.
        </p>
        <div className="flex items-center gap-3">
          <Link href="/onboard" className="btn-primary text-base px-7 py-2.5">Start for free</Link>
          <Link href="/dashboard" className="btn-secondary text-base px-7 py-2.5">Sign in</Link>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map(s => (
            <div key={s.value} className="card p-6 text-center">
              <div className="font-serif text-3xl text-[#191919] mb-2">{s.value}</div>
              <div className="text-xs text-[#6b6b6b] leading-snug">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <GardenDivider />

      {/* How it works */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        <h2 className="font-serif text-3xl text-center text-[#191919] mb-3">How it works</h2>
        <p className="text-center text-[#6b6b6b] mb-12">Six layers. Zero wardrobe waste.</p>
        <div className="grid md:grid-cols-2 gap-4">
          {STEPS.map((step, i) => (
            <div key={i} className="card p-6 flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#191919] text-white text-sm font-medium flex items-center justify-center shrink-0">
                {i + 1}
              </div>
              <div>
                <div className="font-medium text-[#191919] mb-1">{step.label}</div>
                <div className="text-sm text-[#6b6b6b] leading-relaxed">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <GardenDivider />

      {/* APIs */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        <h2 className="font-serif text-3xl text-center text-[#191919] mb-3">14 Perfect Corp APIs</h2>
        <p className="text-center text-[#6b6b6b] mb-10">Not a single call. A full wardrobe visualization loop.</p>
        <div className="flex flex-wrap justify-center gap-2">
          {APIS.map(api => (
            <span key={api} className="bg-white border border-[#e8e4da] rounded-full px-4 py-1.5 text-sm text-[#333]">
              {api}
            </span>
          ))}
        </div>
      </section>

      <GardenDivider />

      {/* Features */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        <h2 className="font-serif text-3xl text-center text-[#191919] mb-12">Everything included</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {FEATURES.map(f => (
            <div key={f.title} className="card p-6">
              <div className="text-xl mb-3 text-[#6b6b6b]">{f.icon}</div>
              <h3 className="font-serif text-lg text-[#191919] mb-2">{f.title}</h3>
              <p className="text-sm text-[#6b6b6b] leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-2xl mx-auto px-6 py-24 text-center">
        <h2 className="font-serif text-4xl text-[#191919] mb-4">Ready to see your wardrobe?</h2>
        <p className="text-[#6b6b6b] mb-8">Upload 3 items. Get your first VTO in under 2 minutes.</p>
        <Link href="/onboard" className="btn-primary text-base px-8 py-3">Start for free</Link>
      </section>

      <footer className="relative z-10 text-center py-8 text-xs text-[#9e9a91] border-t border-[#e8e4da]">
        ClosetMind 2026 · Built with Perfect Corp YouCam API
      </footer>
    </div>
  )
}

import { Daisy, Rose, Tulip, Poppy, Wildflower, Bud, Leaf } from './Flowers'

export function BotanicalLeft() {
  return (
    <svg width={160} height={320} viewBox="0 0 160 320" fill="none" className="pointer-events-none select-none">
      <Leaf x1={20} y1={280} x2={60} y2={200} opacity={0.25} />
      <Leaf x1={10} y1={240} x2={50} y2={160} flip opacity={0.2} />
      <Leaf x1={30} y1={300} x2={80} y2={240} opacity={0.18} />
      <Daisy cx={40} cy={180} r={18} rotate={15} opacity={0.55} />
      <Rose cx={20} cy={120} r={14} rotate={-20} opacity={0.45} />
      <Tulip cx={70} cy={220} r={14} rotate={10} opacity={0.5} />
      <Wildflower cx={50} cy={80} r={12} rotate={30} opacity={0.4} />
      <Bud cx={90} cy={150} r={8} rotate={-10} opacity={0.5} />
      <Poppy cx={30} cy={60} r={16} rotate={5} opacity={0.35} />
    </svg>
  )
}

export function BotanicalRight() {
  return (
    <svg width={160} height={320} viewBox="0 0 160 320" fill="none" className="pointer-events-none select-none">
      <Leaf x1={140} y1={280} x2={100} y2={200} flip opacity={0.25} />
      <Leaf x1={150} y1={240} x2={110} y2={160} opacity={0.2} />
      <Leaf x1={130} y1={300} x2={80} y2={240} flip opacity={0.18} />
      <Daisy cx={120} cy={180} r={18} rotate={-15} opacity={0.55} />
      <Rose cx={140} cy={120} r={14} rotate={20} opacity={0.45} />
      <Tulip cx={90} cy={220} r={14} rotate={-10} opacity={0.5} />
      <Wildflower cx={110} cy={80} r={12} rotate={-30} opacity={0.4} />
      <Bud cx={70} cy={150} r={8} rotate={10} opacity={0.5} />
      <Poppy cx={130} cy={60} r={16} rotate={-5} opacity={0.35} />
    </svg>
  )
}

export function GardenDivider() {
  return (
    <div className="flex items-center justify-center gap-4 my-8 opacity-40">
      <div className="h-px flex-1 bg-[#d4cfc4]" />
      <svg width={80} height={24} viewBox="0 0 80 24">
        <Daisy cx={10} cy={12} r={8} opacity={0.8} />
        <Wildflower cx={30} cy={12} r={7} opacity={0.7} />
        <Rose cx={50} cy={12} r={8} opacity={0.8} />
        <Bud cx={70} cy={12} r={6} opacity={0.7} />
      </svg>
      <div className="h-px flex-1 bg-[#d4cfc4]" />
    </div>
  )
}

export function CornerSprig({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      width={80} height={80} viewBox="0 0 80 80" fill="none"
      className={`pointer-events-none select-none opacity-30 ${flip ? 'scale-x-[-1]' : ''}`}
    >
      <Leaf x1={10} y1={70} x2={40} y2={30} opacity={0.6} />
      <Leaf x1={20} y1={75} x2={55} y2={45} flip opacity={0.5} />
      <Daisy cx={45} cy={25} r={12} rotate={20} opacity={0.9} />
      <Bud cx={60} cy={45} r={7} rotate={-15} opacity={0.8} />
    </svg>
  )
}

const PETALS = [
  [8,  'petal-1', 7,  0,   10, 20],
  [15, 'petal-2', 9,  1.5, 8,  -30],
  [22, 'petal-3', 11, 0.5, 12, 45],
  [30, 'petal-1', 8,  3,   9,  -15],
  [38, 'petal-2', 10, 0.8, 7,  60],
  [47, 'petal-3', 7,  2.2, 11, -45],
  [55, 'petal-1', 9,  1,   8,  30],
  [63, 'petal-2', 12, 3.5, 10, -20],
  [70, 'petal-3', 8,  0.3, 9,  50],
  [78, 'petal-1', 10, 2,   7,  -60],
  [85, 'petal-2', 7,  1.2, 12, 15],
  [92, 'petal-3', 9,  4,   8,  -35],
] as const

export function PetalRain() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {PETALS.map(([left, cls, dur, delay, size, rot], i) => (
        <div
          key={i}
          className={cls}
          style={{
            position: 'absolute',
            left: `${left}%`,
            top: 0,
            width: size,
            height: size,
            '--dur': `${dur}s`,
            '--delay': `${delay}s`,
          } as React.CSSProperties}
        >
          <svg width={size} height={size} viewBox="-10 -10 20 20">
            <ellipse rx={6} ry={9} fill="#c9a0b8" opacity={0.6} transform={`rotate(${rot})`} />
          </svg>
        </div>
      ))}
    </div>
  )
}

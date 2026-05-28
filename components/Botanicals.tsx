import { Daisy, Rose, Tulip, Poppy, Wildflower, Bud, Leaf } from './Flowers'

export function BotanicalLeft() {
  return (
    <svg width={180} height={340} viewBox="0 0 180 340" fill="none"
      className="pointer-events-none select-none" aria-hidden="true">
      <Leaf x1={30} y1={320} x2={80} y2={220} opacity={0.25} />
      <Leaf x1={10} y1={280} x2={60} y2={180} flip opacity={0.2} />
      <Leaf x1={50} y1={300} x2={100} y2={240} opacity={0.18} />
      <Leaf x1={20} y1={200} x2={70} y2={140} flip opacity={0.15} />
      <Daisy cx={55} cy={200} r={20} rotate={15} opacity={0.55} />
      <Rose cx={25} cy={130} r={16} rotate={-20} opacity={0.45} />
      <Tulip cx={85} cy={250} r={15} rotate={10} opacity={0.5} />
      <Wildflower cx={60} cy={90} r={13} rotate={30} opacity={0.4} />
      <Bud cx={100} cy={165} r={9} rotate={-10} opacity={0.5} />
      <Poppy cx={35} cy={65} r={17} rotate={5} opacity={0.35} />
      <Bud cx={140} cy={210} r={7} rotate={25} opacity={0.35} />
      <Wildflower cx={120} cy={290} r={10} rotate={-15} opacity={0.3} />
    </svg>
  )
}

export function BotanicalRight() {
  return (
    <svg width={180} height={340} viewBox="0 0 180 340" fill="none"
      className="pointer-events-none select-none" aria-hidden="true">
      <Leaf x1={150} y1={320} x2={100} y2={220} flip opacity={0.25} />
      <Leaf x1={170} y1={280} x2={120} y2={180} opacity={0.2} />
      <Leaf x1={130} y1={300} x2={80} y2={240} flip opacity={0.18} />
      <Leaf x1={160} y1={200} x2={110} y2={140} opacity={0.15} />
      <Daisy cx={125} cy={200} r={20} rotate={-15} opacity={0.55} />
      <Rose cx={155} cy={130} r={16} rotate={20} opacity={0.45} />
      <Tulip cx={95} cy={250} r={15} rotate={-10} opacity={0.5} />
      <Wildflower cx={120} cy={90} r={13} rotate={-30} opacity={0.4} />
      <Bud cx={80} cy={165} r={9} rotate={10} opacity={0.5} />
      <Poppy cx={145} cy={65} r={17} rotate={-5} opacity={0.35} />
      <Bud cx={40} cy={210} r={7} rotate={-25} opacity={0.35} />
      <Wildflower cx={60} cy={290} r={10} rotate={15} opacity={0.3} />
    </svg>
  )
}

export function GardenDivider() {
  return (
    <div className="flex items-center justify-center gap-4 my-8 opacity-40" aria-hidden="true">
      <div className="h-px flex-1 bg-[#d4cfc4]" />
      <svg width={100} height={28} viewBox="0 0 100 28">
        <Daisy cx={12} cy={14} r={9} opacity={0.9} />
        <Wildflower cx={32} cy={14} r={8} rotate={18} opacity={0.8} />
        <Rose cx={52} cy={14} r={9} rotate={-10} opacity={0.85} />
        <Bud cx={72} cy={14} r={7} rotate={5} opacity={0.8} />
        <Tulip cx={90} cy={14} r={8} rotate={-8} opacity={0.75} />
      </svg>
      <div className="h-px flex-1 bg-[#d4cfc4]" />
    </div>
  )
}

export function CornerSprig({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      width={90} height={90} viewBox="0 0 90 90" fill="none"
      className={`pointer-events-none select-none opacity-30 ${flip ? 'scale-x-[-1]' : ''}`}
      aria-hidden="true"
    >
      <Leaf x1={10} y1={80} x2={45} y2={35} opacity={0.7} />
      <Leaf x1={22} y1={82} x2={60} y2={50} flip opacity={0.55} />
      <Daisy cx={50} cy={28} r={14} rotate={20} opacity={0.95} />
      <Bud cx={65} cy={50} r={8} rotate={-15} opacity={0.85} />
      <Wildflower cx={30} cy={55} r={7} rotate={10} opacity={0.6} />
    </svg>
  )
}

// ── Petal rain — exact mirrorweb data ────────────────────────────────────────
const PETALS = [
  // [left%, animClass, dur(s), delay(s), size(px), rotate]
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
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden="true">
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
          <svg width={size} height={size} viewBox="-8 -10 16 20">
            <path
              d={`M0,-9 C3,-6 4,-1 2,3 C0,6 -2,6 -2,3 C-4,-1 -3,-6 0,-9Z`}
              fill="#c9a0b8"
              opacity={0.65}
              transform={`rotate(${rot})`}
            />
          </svg>
        </div>
      ))}
    </div>
  )
}

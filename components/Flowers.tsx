// Exact botanical SVG components from mirrorweb

export function Daisy({ cx = 0, cy = 0, r = 22, rotate = 0, opacity = 1 }: {
  cx?: number; cy?: number; r?: number; rotate?: number; opacity?: number
}) {
  const petals = [
    "M0,-1 C3,-8 8,-14 0,-18 C-8,-14 -3,-8 0,-1",
    "M1,-1 C8,-5 14,-8 12,-16 C5,-12 3,-6 1,-1",
    "M1,0 C8,3 14,6 16,0 C12,-6 6,-4 1,0",
    "M1,1 C8,5 12,12 6,16 C0,12 0,6 1,1",
    "M0,1 C3,8 2,15 -4,16 C-8,10 -4,5 0,1",
    "M-1,1 C-8,5 -14,8 -14,2 C-10,-4 -5,-1 -1,1",
    "M-1,0 C-8,-3 -14,-6 -12,-14 C-5,-10 -3,-4 -1,0",
    "M-1,-1 C-8,-5 -10,-12 -4,-16 C0,-12 0,-5 -1,-1",
  ]
  return (
    <g transform={`translate(${cx},${cy}) rotate(${rotate}) scale(${r / 22})`} opacity={opacity}>
      {petals.map((d, i) => (
        <path key={i} d={d} fill="#d4a574" opacity={0.6} />
      ))}
      <circle r={4} fill="#c8956c" opacity={0.8} />
    </g>
  )
}

export function Rose({ cx = 0, cy = 0, r = 20, rotate = 0, opacity = 1 }: {
  cx?: number; cy?: number; r?: number; rotate?: number; opacity?: number
}) {
  return (
    <g transform={`translate(${cx},${cy}) rotate(${rotate}) scale(${r / 20})`} opacity={opacity}>
      <path d="M0,-18 C6,-14 10,-8 8,-2 C6,4 2,6 0,8 C-2,6 -6,4 -8,-2 C-10,-8 -6,-14 0,-18Z" fill="#c9a0a0" opacity={0.5} />
      <path d="M0,-12 C4,-8 6,-4 4,0 C2,4 0,5 0,6 C0,5 -2,4 -4,0 C-6,-4 -4,-8 0,-12Z" fill="#b88080" opacity={0.6} />
      <path d="M-14,-6 C-10,-10 -4,-10 0,-8 C-2,-4 -4,0 -6,2 C-10,0 -14,-2 -14,-6Z" fill="#c9a0a0" opacity={0.45} />
      <path d="M14,-6 C10,-10 4,-10 0,-8 C2,-4 4,0 6,2 C10,0 14,-2 14,-6Z" fill="#c9a0a0" opacity={0.45} />
      <path d="M-10,6 C-6,2 -2,2 0,4 C-2,8 -6,10 -10,8 C-12,7 -11,6 -10,6Z" fill="#c9a0a0" opacity={0.4} />
      <path d="M10,6 C6,2 2,2 0,4 C2,8 6,10 10,8 C12,7 11,6 10,6Z" fill="#c9a0a0" opacity={0.4} />
      <circle r={3} fill="#a06060" opacity={0.7} />
    </g>
  )
}

export function Tulip({ cx = 0, cy = 0, r = 18, rotate = 0, opacity = 1 }: {
  cx?: number; cy?: number; r?: number; rotate?: number; opacity?: number
}) {
  return (
    <g transform={`translate(${cx},${cy}) rotate(${rotate}) scale(${r / 18})`} opacity={opacity}>
      {/* Left petal */}
      <path d="M0,0 C-4,-4 -8,-12 -6,-18 C-2,-16 0,-10 0,0Z" fill="#a8b890" opacity={0.6} />
      {/* Right petal */}
      <path d="M0,0 C4,-4 8,-12 6,-18 C2,-16 0,-10 0,0Z" fill="#a8b890" opacity={0.6} />
      {/* Center petal */}
      <path d="M0,0 C-3,-6 -2,-14 0,-18 C2,-14 3,-6 0,0Z" fill="#b8c8a0" opacity={0.7} />
      {/* Sepal */}
      <line x1={0} y1={0} x2={0} y2={10} stroke="#7a8a60" strokeWidth={1.5} opacity={0.5} />
    </g>
  )
}

export function Poppy({ cx = 0, cy = 0, r = 20, rotate = 0, opacity = 1 }: {
  cx?: number; cy?: number; r?: number; rotate?: number; opacity?: number
}) {
  return (
    <g transform={`translate(${cx},${cy}) rotate(${rotate}) scale(${r / 20})`} opacity={opacity}>
      <path d="M0,-18 C8,-16 14,-8 12,0 C10,8 4,12 0,14 C-4,12 -10,8 -12,0 C-14,-8 -8,-16 0,-18Z" fill="#c9a0a0" opacity={0.45} />
      <path d="M-18,0 C-16,-8 -8,-14 0,-12 C8,-10 12,-4 14,0 C12,4 8,10 0,12 C-8,10 -16,8 -18,0Z" fill="#c9a0a0" opacity={0.45} />
      {/* Ruffled inner */}
      <path d="M0,-10 C4,-8 8,-4 6,0 C4,4 0,6 0,8 C0,6 -4,4 -6,0 C-8,-4 -4,-8 0,-10Z" fill="#b08080" opacity={0.5} />
      <circle r={3} fill="#6a4040" opacity={0.6} />
    </g>
  )
}

export function Wildflower({ cx = 0, cy = 0, r = 16, rotate = 0, opacity = 1 }: {
  cx?: number; cy?: number; r?: number; rotate?: number; opacity?: number
}) {
  const angles = [0, 72, 144, 216, 288]
  return (
    <g transform={`translate(${cx},${cy}) rotate(${rotate}) scale(${r / 16})`} opacity={opacity}>
      {angles.map((a, i) => {
        const rad = (a * Math.PI) / 180
        const x = Math.sin(rad) * 14
        const y = -Math.cos(rad) * 14
        const cx1 = Math.sin(rad - 0.3) * 8
        const cy1 = -Math.cos(rad - 0.3) * 8
        const cx2 = Math.sin(rad + 0.3) * 8
        const cy2 = -Math.cos(rad + 0.3) * 8
        return (
          <path key={i} d={`M0,0 C${cx1},${cy1} ${cx2},${cy2} ${x},${y}`}
            fill="none" stroke="#c9b080" strokeWidth={1.5} strokeLinecap="round" opacity={0.6} />
        )
      })}
      <circle r={3} fill="#d4a040" opacity={0.7} />
    </g>
  )
}

export function Bud({ cx = 0, cy = 0, r = 10, rotate = 0, opacity = 1 }: {
  cx?: number; cy?: number; r?: number; rotate?: number; opacity?: number
}) {
  return (
    <g transform={`translate(${cx},${cy}) rotate(${rotate}) scale(${r / 10})`} opacity={opacity}>
      <path d="M0,-10 C4,-6 4,0 0,2 C-4,0 -4,-6 0,-10Z" fill="#c9a0b8" opacity={0.6} />
      <path d="M-3,-4 C-2,-8 0,-10 0,-10 C0,-10 2,-8 3,-4 C1,-2 -1,-2 -3,-4Z" fill="#d4b0c8" opacity={0.5} />
      <path d="M0,2 C-2,4 -1,8 0,10 C1,8 2,4 0,2Z" fill="#8a9a70" opacity={0.5} />
    </g>
  )
}

export function Leaf({ x1 = 0, y1 = 0, x2 = 0, y2 = 0, flip = false, opacity = 0.3 }: {
  x1?: number; y1?: number; x2?: number; y2?: number; flip?: boolean; opacity?: number
}) {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2
  const dx = x2 - x1, dy = y2 - y1
  const len = Math.sqrt(dx * dx + dy * dy)
  const nx = -dy / len * 18 * (flip ? -1 : 1)
  const ny = dx / len * 18 * (flip ? -1 : 1)
  return (
    <path
      d={`M${x1},${y1} Q${mx + nx},${my + ny} ${x2},${y2} Q${mx - nx * 0.3},${my - ny * 0.3} ${x1},${y1}`}
      fill="#8a9a70"
      opacity={opacity}
    />
  )
}

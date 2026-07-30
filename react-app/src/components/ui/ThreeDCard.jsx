import { useRef, useState } from 'react'

// Carte 3D (Aceternity 3D Card) — inclinaison au survol
export default function ThreeDCard({ children, className = '', intensity = 8 }) {
  const ref = useRef(null)
  const [style, setStyle] = useState({})

  const onMove = (e) => {
    if (window.matchMedia('(hover: none)').matches) return
    const el = ref.current
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    setStyle({
      transform: `perspective(1000px) rotateY(${px * intensity}deg) rotateX(${-py * intensity}deg) translateZ(0)`,
    })
  }
  const reset = () => setStyle({ transform: 'perspective(1000px) rotateX(0) rotateY(0)' })

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ transition: 'transform .35s cubic-bezier(.2,.8,.2,1)', transformStyle: 'preserve-3d', ...style }}
      className={className}
    >
      {children}
    </div>
  )
}

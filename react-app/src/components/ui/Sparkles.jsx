import { useEffect, useRef } from 'react'

// Sparkles léger (canvas) — particules scintillantes, inspiré Aceternity Sparkles
export default function Sparkles({ density = 60, color = '#E8C39E', className = '' }) {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = canvas.getContext('2d')
    let raf, w, h, dpr
    const parent = canvas.parentElement
    const particles = []

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = parent.clientWidth
      h = parent.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      particles.length = 0
      const count = Math.round((w * h) / 14000 * (density / 60))
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.4 + 0.3,
          a: Math.random(),
          sp: Math.random() * 0.02 + 0.004,
          dir: Math.random() > 0.5 ? 1 : -1,
        })
      }
    }
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of particles) {
        p.a += p.sp * p.dir
        if (p.a <= 0) { p.a = 0; p.dir = 1 }
        if (p.a >= 1) { p.a = 1; p.dir = -1 }
        ctx.beginPath()
        ctx.globalAlpha = p.a * 0.9
        ctx.fillStyle = color
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }
    resize()
    if (!reduce) draw()
    else draw() && cancelAnimationFrame(raf)
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [density, color])

  return <canvas ref={canvasRef} className={className} style={{ position: 'absolute', inset: 0 }} aria-hidden="true" />
}

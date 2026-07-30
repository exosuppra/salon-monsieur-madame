import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

// Compteur animé (Magic UI - Number Ticker)
export default function NumberTicker({ value, decimals = 0, suffix = '', prefix = '', className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { setDisplay(value); return }
    let raf
    const dur = 1600
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min((now - start) / dur, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(value * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
      else setDisplay(value)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  const formatted = display
    .toFixed(decimals)
    .replace('.', ',')

  return (
    <span ref={ref} className={className}>
      {prefix}{formatted}{suffix}
    </span>
  )
}

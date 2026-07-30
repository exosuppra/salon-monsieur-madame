import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Bouton magnétique (suit légèrement la souris)
export default function MagneticButton({ children, className = '', as = 'a', strength = 0.35, ...props }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  const handleMove = (e) => {
    if (window.matchMedia('(hover: none)').matches) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => { x.set(0); y.set(0) }

  const MotionTag = motion[as] || motion.a
  return (
    <MotionTag
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={className}
      {...props}
    >
      {children}
    </MotionTag>
  )
}

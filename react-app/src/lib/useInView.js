import { useEffect, useRef, useState } from 'react'

/**
 * Petit équivalent de `useInView` de Framer Motion, basé sur IntersectionObserver.
 *
 * Évite d'embarquer Framer Motion (~40 Ko compressés) dans le paquet de la page
 * d'accueil : c'était la principale cause de lenteur au premier affichage.
 */
export default function useInView({ once = true, margin = '0px' } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) io.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { rootMargin: margin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [once, margin])

  return [ref, inView]
}

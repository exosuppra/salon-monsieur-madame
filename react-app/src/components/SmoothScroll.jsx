import { useEffect } from 'react'

// Smooth scroll global (désactivé en prefers-reduced-motion).
//
// Lenis est chargé en import dynamique, après le premier affichage : le confort
// de défilement n'a aucune raison de retarder l'apparition de la page.
// Les clics sur les ancres internes fonctionnent immédiatement, avec le
// défilement natif tant que Lenis n'est pas encore prêt.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let lenis = null
    let raf = null
    let cancelled = false

    const onClick = (e) => {
      const a = e.target.closest('a[href^="#/"], a[data-anchor]')
      if (!a) return
      const anchor = a.getAttribute('data-anchor')
      if (!anchor) return
      const el = document.querySelector(anchor)
      if (!el) return
      e.preventDefault()
      if (lenis) lenis.scrollTo(el, { offset: -80 })
      else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
    }
    document.addEventListener('click', onClick)

    const start = async () => {
      const { default: Lenis } = await import('lenis')
      if (cancelled) return
      lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 })
      const loop = (time) => {
        lenis.raf(time)
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
    }

    // On attend que le navigateur n'ait plus rien d'urgent à faire.
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(start, { timeout: 2500 })
      : setTimeout(start, 1200)

    return () => {
      cancelled = true
      document.removeEventListener('click', onClick)
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle)
      clearTimeout(idle)
      if (raf) cancelAnimationFrame(raf)
      if (lenis) lenis.destroy()
    }
  }, [])

  return null
}

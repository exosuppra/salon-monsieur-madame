import { cn } from '../../lib/utils'

/**
 * Révélation au scroll, 100 % en CSS (voir `.reveal-on-scroll` dans index.css).
 *
 * Aucun JavaScript n'intervient : l'animation est pilotée par la position de
 * l'élément dans la page (`animation-timeline: view()`). Conséquences :
 *
 * - Le contenu est visible par défaut. Sur un navigateur qui ne gère pas les
 *   animations liées au défilement, tout s'affiche normalement, sans animation.
 *   Il n'existe aucun cas où un bloc peut rester invisible.
 * - Le haut de page n'est jamais masqué : un élément déjà à l'écran est
 *   au-delà de sa plage d'animation, donc affiché d'emblée. Le grand titre
 *   (l'élément mesuré par Google pour le LCP) apparaît immédiatement.
 * - Zéro coût sur le fil principal : plus d'IntersectionObserver, plus de
 *   classes ajoutées après coup.
 *
 * `delay` est conservé pour ne pas toucher aux appels existants ; il décale
 * légèrement le début de l'animation.
 */
export default function SectionReveal({ children, className = '', delay = 0, y = 32, as: Tag = 'div' }) {
  return (
    <Tag
      className={cn('reveal-on-scroll', className)}
      style={{ '--reveal-y': `${y}px`, '--reveal-offset': `${Math.round(delay * 40)}%` }}
    >
      {children}
    </Tag>
  )
}

/** Conteneur dont les enfants <StaggerItem> apparaissent en léger décalage. */
export function StaggerGroup({ children, className = '' }) {
  return <div className={className}>{children}</div>
}

export function StaggerItem({ children, className = '', y = 28 }) {
  return (
    <div className={cn('reveal-on-scroll', className)} style={{ '--reveal-y': `${y}px` }}>
      {children}
    </div>
  )
}

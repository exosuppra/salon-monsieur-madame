import { cn } from '../../lib/utils'
import { Star } from 'lucide-react'

// Infinite Moving Cards (Aceternity / Magic UI) — défilement continu SANS couture.
// Deux groupes identiques animés ensemble ; le parent porte le --gap, chaque
// groupe se translate de sa propre largeur → boucle parfaitement fluide.
// Les avis viennent de Planity (publiés sans nom d'auteur) : on affiche la note
// et la date de dépôt plutôt qu'une identité qu'on ne connaît pas.
export default function InfiniteMovingCards({ items, speed = 'slow', card = '', starClass = '' }) {
  const duration = speed === 'fast' ? '26s' : speed === 'normal' ? '40s' : '60s'
  const GAP = '1.25rem'

  const Group = ({ ariaHidden }) => (
    <ul
      data-marquee
      aria-hidden={ariaHidden}
      className="flex shrink-0 items-stretch animate-marquee"
      style={{ '--duration': duration, '--gap': GAP, gap: GAP }}
    >
      {items.map((it, i) => (
        <li key={i} className={cn('flex w-[300px] shrink-0 flex-col rounded-2xl p-6 sm:w-[380px]', card)}>
          <div className="mb-3 flex items-center gap-2">
            <div className={cn('flex gap-0.5', starClass)} aria-hidden="true">
              {[0, 1, 2, 3, 4].map((s) => (
                <Star key={s} size={14} className={s < Math.round(it.rating) ? 'fill-current' : 'opacity-25'} />
              ))}
            </div>
            <span className="text-xs opacity-70">{String(it.rating).replace('.', ',')}/5</span>
          </div>
          <p className="text-[0.98rem] leading-relaxed opacity-90">“{it.text}”</p>
          <div className="mt-5 flex items-center justify-between gap-3 text-xs opacity-75">
            <span>Avis vérifié · Planity</span>
            <span>{it.date}</span>
          </div>
        </li>
      ))}
    </ul>
  )

  return (
    <div
      className="relative flex overflow-hidden marquee-pause py-2"
      style={{
        gap: GAP,
        maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
      }}
    >
      <Group ariaHidden={false} />
      <Group ariaHidden={true} />
    </div>
  )
}

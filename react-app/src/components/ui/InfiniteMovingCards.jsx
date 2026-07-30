import { cn } from '../../lib/utils'
import { Star } from 'lucide-react'

// Infinite Moving Cards (Aceternity) — défilement continu des avis, en CSS marquee
export default function InfiniteMovingCards({ items, speed = 'slow', card = '' }) {
  const duration = speed === 'fast' ? '26s' : speed === 'normal' ? '40s' : '60s'
  const doubled = [...items, ...items]
  return (
    <div
      className="relative overflow-hidden marquee-pause"
      style={{ maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)' }}
    >
      <ul
        data-marquee
        className="flex w-max gap-5 py-2 animate-marquee"
        style={{ '--duration': duration, '--gap': '1.25rem' }}
      >
        {doubled.map((it, i) => (
          <li key={i} className={cn('w-[300px] sm:w-[380px] shrink-0 rounded-2xl p-6', card)}>
            <div className="mb-3 flex gap-0.5" aria-hidden="true">
              {[0,1,2,3,4].map((s) => <Star key={s} size={14} className="fill-current" />)}
            </div>
            <p className="text-[0.98rem] leading-relaxed opacity-90">“{it.text}”</p>
            <div className="mt-5 flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-sm font-semibold">
                {it.name.charAt(0)}
              </span>
              <div>
                <div className="text-sm font-medium">{it.name}</div>
                <div className="text-xs opacity-60">{it.city}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

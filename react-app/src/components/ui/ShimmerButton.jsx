import { cn } from '../../lib/utils'
import MagneticButton from './MagneticButton'

// Bouton premium avec liseré lumineux (Magic UI Shimmer Button) + magnétisme
export default function ShimmerButton({ children, className = '', href, ...props }) {
  return (
    <MagneticButton
      as="a"
      href={href}
      className={cn(
        'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-3.5 text-sm font-medium tracking-wide transition-transform',
        className
      )}
      {...props}
    >
      <span
        className="pointer-events-none absolute inset-0 -z-0 opacity-70"
        style={{
          background: 'conic-gradient(from 90deg at 50% 50%, transparent 0deg, rgba(255,255,255,.55) 90deg, transparent 180deg)',
          animation: 'spin 4s linear infinite',
        }}
        aria-hidden="true"
      />
      <span className="absolute inset-[1.5px] -z-0 rounded-full bg-[inherit]" aria-hidden="true" />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </MagneticButton>
  )
}

import { cn } from '../../lib/utils'

// Texte à dégradé animé (Magic UI)
export default function AnimatedGradientText({ children, className = '', from = '#E8C39E', via = '#C97B5A', to = '#E8C39E' }) {
  return (
    <span
      className={cn('inline-block bg-[length:200%_auto] text-gradient animate-shimmer', className)}
      style={{ backgroundImage: `linear-gradient(90deg, ${from}, ${via}, ${to})` }}
    >
      {children}
    </span>
  )
}

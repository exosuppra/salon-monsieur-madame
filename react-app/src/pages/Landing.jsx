import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'
import { SALON } from '../data'
import { Spotlight } from '../components/ui/Spotlight'
import Sparkles from '../components/ui/Sparkles'
import AnimatedGradientText from '../components/ui/AnimatedGradientText'

const CARDS = [
  {
    to: '/signature', n: '01', name: 'Signature', tag: 'Dark premium',
    desc: 'Contemporain audacieux : dégradés animés, glassmorphism, effet waouh.',
    art: 'radial-gradient(60% 60% at 25% 25%, rgba(232,195,158,.55), transparent 60%), radial-gradient(55% 55% at 80% 70%, rgba(201,123,90,.55), transparent 60%), #0a0a0b',
  },
  {
    to: '/eclat', n: '02', name: 'Éclat', tag: 'Éditorial luxe',
    desc: 'Élégance magazine : serif haute couture, charbon & or champagne.',
    art: 'radial-gradient(120% 120% at 20% 20%, #2a2521, #14110f)',
  },
  {
    to: '/nuance', n: '03', name: 'Nuance', tag: 'Minimal provençal',
    desc: 'Douceur du Sud : lin & terracotta, formes arrondies, bento grid.',
    art: 'radial-gradient(90% 90% at 80% 15%, #e9d6c2, transparent 60%), radial-gradient(90% 90% at 15% 90%, #cdd8c2, transparent 55%), #f6efe3',
  },
]

export default function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-ink font-sans text-[#F5F3EF]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[10%] top-[6%] h-[40vw] w-[40vw] rounded-full bg-champagne/15 blur-[120px] animate-aurora" />
        <div className="absolute right-[8%] bottom-[10%] h-[36vw] w-[36vw] rounded-full bg-cuivre/15 blur-[120px] animate-aurora" style={{ animationDelay: '-7s' }} />
      </div>
      <Spotlight className="-top-40 left-10 md:left-60" fill="#E8C39E" />
      <Sparkles density={60} color="#E8C39E" className="opacity-60" />

      <main className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <motion.header
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs backdrop-blur">
            <span className="flex text-champagne" aria-hidden="true">{[0,1,2,3,4].map(i => <Star key={i} size={12} className="fill-current" />)}</span>
            {SALON.rating}/5 · {SALON.reviews} avis
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl font-display text-5xl font-semibold leading-[1] tracking-tight md:text-7xl">
            {SALON.name}<br /><AnimatedGradientText>trois visions premium</AnimatedGradientText>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-white/65">
            Trois maquettes de site pour le salon, à {SALON.city}. Chacune reliée à la réservation Planity. Version React · composants premium animés.
          </p>
        </motion.header>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {CARDS.map((c, i) => (
            <motion.div
              key={c.to}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.19, 1, 0.22, 1] }}
            >
              <Link
                to={c.to}
                className="group block overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-all hover:-translate-y-2 hover:border-champagne/40 hover:shadow-[0_30px_70px_-30px_rgba(232,195,158,.4)]"
              >
                <div className="relative h-44 overflow-hidden" style={{ background: c.art }}>
                  <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-black/25 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-white backdrop-blur">{c.tag}</span>
                  <span className="absolute bottom-2 right-4 font-display text-6xl text-white/85">{c.n}</span>
                </div>
                <div className="p-6">
                  <h2 className="font-display text-2xl font-semibold">{c.name}</h2>
                  <p className="mt-2 text-sm text-white/60">{c.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm text-champagne">
                    Voir la maquette <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="mx-auto mt-14 max-w-2xl text-center text-xs text-white/40">
          Versions HTML légères également disponibles. Photos de démonstration (Unsplash) · couleurs, textes et visuels entièrement personnalisables.
        </p>
      </main>
    </div>
  )
}

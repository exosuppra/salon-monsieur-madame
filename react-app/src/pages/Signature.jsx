import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Scissors, Sparkles as SparklesIcon, User, Droplet, Star, MapPin, Phone, Clock, ArrowRight, Calendar, Menu, X, ArrowLeft } from 'lucide-react'
import { SALON, STATS, SERVICES, PRICING, REVIEWS } from '../data'
import { PLANITY_URL } from '../lib/utils'
import SmoothScroll from '../components/SmoothScroll'
import { Spotlight } from '../components/ui/Spotlight'
import Sparkles from '../components/ui/Sparkles'
import ThreeDCard from '../components/ui/ThreeDCard'
import InfiniteMovingCards from '../components/ui/InfiniteMovingCards'
import NumberTicker from '../components/ui/NumberTicker'
import ShimmerButton from '../components/ui/ShimmerButton'
import AnimatedGradientText from '../components/ui/AnimatedGradientText'
import SectionReveal, { StaggerGroup, StaggerItem } from '../components/ui/SectionReveal'
import useLegacyFonts from '../lib/useLegacyFonts'

const ICONS = { Scissors, Sparkles: SparklesIcon, User, Droplet }

const NAV = [
  { href: '#salon', label: 'Le salon' },
  { href: '#prestations', label: 'Prestations' },
  { href: '#tarifs', label: 'Tarifs' },
  { href: '#avis', label: 'Avis' },
  { href: '#contact', label: 'Contact' },
]

function Reserve({ className = '', children = 'Prendre rendez-vous' }) {
  return (
    <ShimmerButton
      href={PLANITY_URL}
      target="_blank"
      rel="noopener"
      className={`bg-gradient-to-r from-champagne to-cuivre text-ink shadow-[0_10px_40px_-10px_rgba(232,195,158,.5)] ${className}`}
    >
      <Calendar size={16} /> {children}
    </ShimmerButton>
  )
}

export default function Signature() {
  useLegacyFonts()
  const [open, setOpen] = useState(false)
  return (
    <div className="min-h-screen bg-ink font-sans text-[#F5F3EF] selection:bg-champagne/30">
      <SmoothScroll />

      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-ink2/70 px-5 py-3 backdrop-blur-xl md:mt-4">
          <Link to="/signature" className="font-display text-lg font-semibold tracking-tight">
            {SALON.name}
            <span className="ml-2 hidden text-[0.6rem] font-normal uppercase tracking-[0.3em] text-champagne/70 sm:inline">Gréoux-les-Bains</span>
          </Link>
          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map((n) => (
              <a key={n.href} data-anchor={n.href} href={n.href} className="text-sm text-white/70 transition-colors hover:text-champagne">{n.label}</a>
            ))}
          </nav>
          <div className="hidden lg:block"><Reserve className="!px-6 !py-2.5">Réserver</Reserve></div>
          <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Ouvrir le menu"><Menu /></button>
        </div>
      </header>

      {/* MENU MOBILE */}
      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8 bg-ink/95 backdrop-blur-xl">
          <button className="absolute right-6 top-6" onClick={() => setOpen(false)} aria-label="Fermer le menu"><X size={28} /></button>
          {NAV.map((n) => (
            <a key={n.href} data-anchor={n.href} href={n.href} onClick={() => setOpen(false)} className="font-display text-2xl">{n.label}</a>
          ))}
          <Reserve />
        </div>
      )}

      {/* HERO */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        {/* Mesh gradient animé */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[8%] top-[12%] h-[42vw] w-[42vw] rounded-full bg-champagne/20 blur-[120px] animate-aurora" />
          <div className="absolute right-[6%] top-[28%] h-[38vw] w-[38vw] rounded-full bg-cuivre/20 blur-[120px] animate-aurora" style={{ animationDelay: '-6s' }} />
          <div className="absolute bottom-[6%] left-[38%] h-[30vw] w-[30vw] rounded-full bg-[#7c5cff]/15 blur-[130px] animate-aurora" style={{ animationDelay: '-11s' }} />
        </div>
        <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="#E8C39E" />
        <Sparkles density={70} color="#E8C39E" className="opacity-70" />

        <div className="mx-auto w-full max-w-6xl px-6 pt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs backdrop-blur">
              <span className="flex text-champagne" aria-hidden="true">{[0,1,2,3,4].map(i => <Star key={i} size={12} className="fill-current" />)}</span>
              <span className="text-white/80">{SALON.rating}/5 · {SALON.reviews} avis</span>
            </span>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[0.98] tracking-tight sm:text-7xl">
              L'art de <AnimatedGradientText>sublimer</AnimatedGradientText><br />vos cheveux
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/70">
              Coupe, couleur et balayage d'exception à {SALON.city}. Le savoir-faire d'{SALON.stylist}, plus de {SALON.experience} ans de passion, dans un écrin contemporain.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Reserve />
              <a data-anchor="#prestations" href="#prestations" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm transition-colors hover:border-champagne hover:text-champagne">
                Découvrir <ArrowRight size={16} />
              </a>
            </div>
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-white/40">Réservation en ligne 24h/24 via Planity</p>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-white/10 bg-ink2/50">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-14 md:grid-cols-4">
          {STATS.map((s, i) => (
            <SectionReveal key={s.label} delay={i * 0.08} className="text-center">
              <div className="font-display text-4xl font-semibold text-champagne md:text-5xl">
                <NumberTicker value={s.value} decimals={s.decimals || 0} suffix={s.suffix || ''} />
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.16em] text-white/50">{s.label}</div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* LE SALON */}
      <section id="salon" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:py-32">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <SectionReveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-ink2"
              style={{ backgroundImage: `url('${import.meta.env.BASE_URL}photos/realisation-balayage-blond.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 rounded-2xl border border-white/10 bg-ink/70 px-5 py-3 backdrop-blur">
                <div className="font-display text-xl">{SALON.stylist}</div>
                <div className="text-xs uppercase tracking-[0.16em] text-champagne/80">Coiffeuse · {SALON.experience} ans d'expérience</div>
              </div>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <span className="text-xs uppercase tracking-[0.3em] text-champagne">01 — Le salon</span>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight md:text-5xl">Un lieu familial, comme à la maison</h2>
            <p className="mt-6 text-white/70">
              Au cœur de {SALON.city}, village thermal de Haute-Provence, {SALON.name} cultive un art de recevoir aussi soigné que ses coupes. On y pousse la porte pour une couleur, on y revient pour l'accueil et la douceur d'{SALON.stylist}.
            </p>
            <p className="mt-4 text-white/70">
              Spécialiste des techniques de balayage contemporaines, {SALON.stylist} met plus de vingt années d'expérience au service d'un conseil personnalisé : chaque chevelure appelle sa réponse sur-mesure.
            </p>
            <div className="mt-8 font-serif text-2xl italic text-champagne">« Ici, on prend le temps de vous. »</div>
          </SectionReveal>
        </div>
      </section>

      {/* PRESTATIONS */}
      <section id="prestations" className="scroll-mt-24 border-t border-white/10 bg-ink2/40 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <SectionReveal className="mb-14 text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-champagne">02 — Prestations</span>
            <h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl">Nos univers de coiffure</h2>
          </SectionReveal>
          <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => {
              const Icon = ICONS[s.icon] || Scissors
              return (
                <StaggerItem key={s.key}>
                  <ThreeDCard className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur transition-colors hover:border-champagne/40">
                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-champagne/20 to-cuivre/20 text-champagne">
                      <Icon size={22} />
                    </div>
                    <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm text-white/60">{s.desc}</p>
                    <ul className="mt-5 space-y-2 border-t border-white/10 pt-4">
                      {s.items.map((it) => (
                        <li key={it.n} className="flex items-center justify-between gap-3 text-sm">
                          <span className="text-white/75">{it.n}</span>
                          <span className="whitespace-nowrap text-champagne">{it.p}</span>
                        </li>
                      ))}
                    </ul>
                  </ThreeDCard>
                </StaggerItem>
              )
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* TARIFS */}
      <section id="tarifs" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:py-32">
        <SectionReveal className="mb-14">
          <span className="text-xs uppercase tracking-[0.3em] text-champagne">03 — Tarifs</span>
          <h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl">La carte des prestations</h2>
        </SectionReveal>
        <div className="md:columns-2 md:gap-10">
          {PRICING.map((cat) => (
            <SectionReveal key={cat.group} className="mb-10 break-inside-avoid rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <h3 className="mb-5 font-serif text-2xl italic text-champagne">{cat.group}</h3>
              <ul className="divide-y divide-white/10">
                {cat.rows.map((it) => (
                  <li key={it.n} className="flex items-baseline justify-between gap-4 py-3.5">
                    <span className="text-white/85">
                      {it.n} {it.d && <span className="text-xs text-white/45">· {it.d}</span>}
                    </span>
                    <span className="whitespace-nowrap font-display text-champagne">
                      {it.from && <span className="mr-1 text-xs uppercase tracking-wider text-white/45">dès</span>}
                      {it.p}
                    </span>
                  </li>
                ))}
              </ul>
            </SectionReveal>
          ))}
        </div>
        <p className="mt-2 text-sm text-white/50">Tarifs indicatifs relevés sur Planity. Le prix définitif est confirmé en salon après diagnostic.</p>
        <div className="mt-12 text-center"><Reserve /></div>
      </section>

      {/* AVIS */}
      <section id="avis" className="scroll-mt-24 border-y border-white/10 bg-ink2/40 py-24 md:py-32">
        <SectionReveal className="mb-12 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-champagne">04 — Elles en parlent</span>
          <div className="mt-4 font-display text-6xl font-semibold text-champagne">{SALON.rating}<span className="text-2xl text-white/40">/5</span></div>
          <p className="mt-2 text-white/60">Une note d'excellence sur {SALON.reviews} avis vérifiés</p>
        </SectionReveal>
        <InfiniteMovingCards
          items={REVIEWS}
          speed="slow"
          card="border border-white/10 bg-white/[0.04] text-white backdrop-blur"
        />
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-2">
          <SectionReveal>
            <span className="text-xs uppercase tracking-[0.3em] text-champagne">05 — Infos pratiques</span>
            <h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl">Venir au salon</h2>
            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 text-champagne" size={20} />
                <div><div className="text-xs uppercase tracking-[0.2em] text-white/45">Adresse</div><div className="mt-1 font-display text-lg">{SALON.address}</div></div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-1 text-champagne" size={20} />
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-white/45">Téléphone</div>
                  <a href={SALON.phoneHref} className="mt-1 block font-display text-lg transition-colors hover:text-champagne">{SALON.phone}</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-1 text-champagne" size={20} />
                <div className="w-full">
                  <div className="text-xs uppercase tracking-[0.2em] text-white/45">Horaires</div>
                  <table className="mt-2 w-full max-w-sm text-sm">
                    <tbody>
                      {SALON.hours.map((h) => (
                        <tr key={h.d} className="border-b border-white/10">
                          <td className="py-2 text-white/75">{h.d}</td>
                          <td className={`py-2 text-right ${h.closed ? 'italic text-white/40' : 'text-white'}`}>{h.h}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="mt-8"><Reserve /></div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <div className="relative h-full min-h-[340px] overflow-hidden rounded-3xl border border-white/10 bg-ink2">
              <iframe
                title="Carte — Madame Monsieur"
                loading="lazy"
                className="absolute inset-0 h-full w-full opacity-80"
                style={{ filter: 'grayscale(.3) invert(.9) contrast(.85)', border: 0 }}
                src={`https://www.google.com/maps?q=${SALON.mapsQuery}&z=18&output=embed`}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink to-transparent p-6">
                <a href={SALON.mapsLink} target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-sm text-champagne">
                  Ouvrir dans Google Maps <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="relative overflow-hidden border-t border-white/10 py-24 text-center md:py-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[30vw] w-[60vw] -translate-x-1/2 rounded-full bg-champagne/15 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-3xl px-6">
          <span className="text-xs uppercase tracking-[0.3em] text-champagne">Votre prochain rendez-vous</span>
          <h2 className="mt-4 font-display text-4xl font-semibold md:text-6xl">
            Offrez à vos cheveux l'<AnimatedGradientText>éclat</AnimatedGradientText> qu'ils méritent
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-white/70">Réservez en quelques clics, à toute heure. {SALON.stylist} vous accueille du mardi au samedi.</p>
          <div className="mt-9 flex justify-center"><Reserve /></div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#08080a] px-6 py-14">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <div className="font-display text-xl font-semibold">{SALON.name}</div>
            <div className="text-sm text-white/50">{SALON.tagline}</div>
          </div>
          <div className="text-sm text-white/50">© 2026 {SALON.name} — {SALON.city}</div>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-champagne"><ArrowLeft size={15} /> Retour aux maquettes</Link>
        </div>
        <div className="mx-auto mt-8 max-w-6xl border-t border-white/10 pt-6 text-center text-xs text-white/40">
          Site développé par{' '}
          <a href="https://logiqia.fr" target="_blank" rel="noopener" className="font-medium text-champagne/80 underline-offset-4 transition-colors hover:text-champagne hover:underline">Logiq IA</a>
        </div>
      </footer>
    </div>
  )
}

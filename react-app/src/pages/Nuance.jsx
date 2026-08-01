import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Scissors, Sparkles as SparklesIcon, User, Droplet, Star, MapPin, Phone, Clock, ArrowRight, Calendar, Menu, X, ArrowLeft } from 'lucide-react'
import { SALON, STATS, SERVICES, PRICING, REVIEWS } from '../data'
import { PLANITY_URL } from '../lib/utils'
import SmoothScroll from '../components/SmoothScroll'
import InfiniteMovingCards from '../components/ui/InfiniteMovingCards'
import NumberTicker from '../components/ui/NumberTicker'
import SectionReveal, { StaggerGroup, StaggerItem } from '../components/ui/SectionReveal'

const ICONS = { Scissors, Sparkles: SparklesIcon, User, Droplet }

const NAV = [
  { href: '#salon', label: 'Le salon' },
  { href: '#prestations', label: 'Prestations' },
  { href: '#tarifs', label: 'Tarifs' },
  { href: '#avis', label: 'Avis' },
  { href: '#contact', label: 'Contact' },
]

// Accents doux par carte du bento (thème clair, toujours texte foncé)
const BENTO = [
  { span: 'lg:col-span-3 lg:row-span-2', pastille: 'bg-terra/15 text-terradeep', featured: true },
  { span: 'lg:col-span-3', pastille: 'bg-sauge/20 text-sauge', featured: false },
  { span: 'lg:col-span-3', pastille: 'bg-terra/15 text-terradeep', featured: false },
  { span: 'lg:col-span-6', pastille: 'bg-sauge/20 text-sauge', featured: false },
]

function Reserve({ className = '', children = 'Prendre rendez-vous' }) {
  return (
    <a
      href={PLANITY_URL}
      target="_blank"
      rel="noopener"
      className={`inline-flex items-center gap-2 rounded-full bg-terra px-7 py-3.5 text-sm font-medium text-white shadow-[0_12px_30px_-12px_rgba(185,113,79,.7)] transition-colors hover:bg-terradeep ${className}`}
    >
      <Calendar size={16} /> {children}
    </a>
  )
}

export default function Nuance() {
  const [open, setOpen] = useState(false)
  return (
    <div className="min-h-screen bg-lin font-sans text-brun selection:bg-terra/20">
      <SmoothScroll />

      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-full border border-brun/10 bg-lin/80 px-5 py-3 shadow-[0_8px_30px_-18px_rgba(59,51,43,.4)] backdrop-blur-xl md:mt-4">
          <Link to="/nuance" className="font-fraunces text-lg font-semibold tracking-tight text-brun">
            {SALON.name}
            <span className="ml-2 hidden text-[0.6rem] font-normal uppercase tracking-[0.3em] text-terra sm:inline">Gréoux-les-Bains</span>
          </Link>
          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map((n) => (
              <a key={n.href} data-anchor={n.href} href={n.href} className="text-sm text-brun/70 transition-colors hover:text-terradeep">{n.label}</a>
            ))}
          </nav>
          <div className="hidden lg:block"><Reserve className="!px-6 !py-2.5">Réserver</Reserve></div>
          <button className="text-brun lg:hidden" onClick={() => setOpen(true)} aria-label="Ouvrir le menu"><Menu /></button>
        </div>
      </header>

      {/* MENU MOBILE */}
      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8 bg-lin/95 backdrop-blur-xl">
          <button className="absolute right-6 top-6 text-brun" onClick={() => setOpen(false)} aria-label="Fermer le menu"><X size={28} /></button>
          {NAV.map((n) => (
            <a key={n.href} data-anchor={n.href} href={n.href} onClick={() => setOpen(false)} className="font-fraunces text-2xl text-brun">{n.label}</a>
          ))}
          <Reserve />
        </div>
      )}

      {/* HERO */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        {/* Blobs décoratifs doux (CSS pur) */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-[6%] top-[14%] h-[38vw] w-[38vw] rounded-full bg-terra/10 blur-[110px]" />
          <div className="absolute -right-[4%] top-[8%] h-[32vw] w-[32vw] rounded-full bg-sauge/15 blur-[120px]" />
          <div className="absolute bottom-[4%] left-[40%] h-[26vw] w-[26vw] rounded-full bg-terra/10 blur-[120px]" />
        </div>

        <div className="mx-auto w-full max-w-6xl px-6 pt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-terra/25 bg-white/60 px-4 py-1.5 text-xs backdrop-blur">
              <span className="flex text-terra" aria-hidden="true">{[0,1,2,3,4].map(i => <Star key={i} size={12} className="fill-current" />)}</span>
              <span className="text-brun/80">{SALON.rating}/5 · {SALON.reviews} avis</span>
            </span>
            <h1 className="mt-6 font-fraunces text-5xl font-semibold leading-[1.02] tracking-tight text-brun sm:text-7xl">
              La coiffure,<br /><span className="italic text-terradeep">tout en nuances</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-brun/70">
              Coupe, couleur et balayage à {SALON.city}, au fil de la lumière provençale. Le savoir-faire d'{SALON.stylist}, plus de {SALON.experience} ans de passion, dans un salon chaleureux et lumineux.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Reserve />
              <a data-anchor="#prestations" href="#prestations" className="inline-flex items-center gap-2 rounded-full border border-brun/20 bg-white/50 px-7 py-3.5 text-sm text-brun transition-colors hover:border-terra hover:text-terradeep">
                Découvrir <ArrowRight size={16} />
              </a>
            </div>
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-brun/40">Réservation en ligne 24h/24 via Planity</p>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-brun/10 bg-white/40">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-14 md:grid-cols-4">
          {STATS.map((s, i) => (
            <SectionReveal key={s.label} delay={i * 0.08} className="text-center">
              <div className="font-fraunces text-4xl font-semibold text-terradeep md:text-5xl">
                <NumberTicker value={s.value} decimals={s.decimals || 0} suffix={s.suffix || ''} />
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.16em] text-brun/55">{s.label}</div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* LE SALON + ELODIE */}
      <section id="salon" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:py-32">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <SectionReveal>
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-brun/10 shadow-[0_30px_60px_-30px_rgba(59,51,43,.45)]"
              style={{ backgroundColor: '#E9DFD2', backgroundImage: `url('${import.meta.env.BASE_URL}photos/salon-terrasse.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-brun/45 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 rounded-3xl border border-white/40 bg-lin/85 px-5 py-3 backdrop-blur">
                <div className="font-fraunces text-xl text-brun">{SALON.stylist}</div>
                <div className="text-xs uppercase tracking-[0.16em] text-terradeep">Coiffeuse · {SALON.experience} ans d'expérience</div>
              </div>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <span className="inline-block rounded-full bg-sauge/20 px-4 py-1 text-xs uppercase tracking-[0.25em] text-sauge">01 — Le salon</span>
            <h2 className="mt-4 font-fraunces text-4xl font-semibold leading-tight text-brun md:text-5xl">Un lieu familial, comme à la maison</h2>
            <p className="mt-6 text-brun/75">
              Au cœur de {SALON.city}, village thermal de Haute-Provence, {SALON.name} cultive un art de recevoir aussi soigné que ses coupes. On y pousse la porte pour une couleur, on y revient pour l'accueil et la douceur d'{SALON.stylist}.
            </p>
            <p className="mt-4 text-brun/75">
              Spécialiste des techniques de balayage contemporaines, {SALON.stylist} met plus de vingt années d'expérience au service d'un conseil personnalisé : chaque chevelure appelle sa réponse sur-mesure.
            </p>
            <div className="mt-8 font-fraunces text-2xl italic text-terradeep">« Ici, on prend le temps de vous. »</div>
          </SectionReveal>
        </div>
      </section>

      {/* PRESTATIONS — BENTO GRID */}
      <section id="prestations" className="scroll-mt-24 border-t border-brun/10 bg-white/40 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <SectionReveal className="mb-14 text-center">
            <span className="inline-block rounded-full bg-terra/15 px-4 py-1 text-xs uppercase tracking-[0.25em] text-terradeep">02 — Prestations</span>
            <h2 className="mt-4 font-fraunces text-4xl font-semibold text-brun md:text-5xl">Nos univers de coiffure</h2>
          </SectionReveal>
          <StaggerGroup className="grid gap-5 lg:grid-cols-6">
            {SERVICES.map((s, i) => {
              const Icon = ICONS[s.icon] || Scissors
              const b = BENTO[i] || BENTO[0]
              return (
                <StaggerItem key={s.key} className={b.span}>
                  <div className={`flex h-full flex-col rounded-[2rem] border border-brun/10 bg-lin p-7 shadow-[0_20px_40px_-28px_rgba(59,51,43,.5)] transition-colors hover:border-terra/40 ${b.featured ? 'md:p-9' : ''}`}>
                    <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${b.pastille}`}>
                      <Icon size={22} />
                    </div>
                    <h3 className={`font-fraunces font-semibold text-brun ${b.featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>{s.title}</h3>
                    <p className="mt-2 text-sm text-brun/65">{s.desc}</p>
                    <ul className="mt-5 space-y-2 border-t border-brun/10 pt-4">
                      {s.items.map((it) => (
                        <li key={it.n} className="flex items-center justify-between gap-3 text-sm">
                          <span className="text-brun/75">{it.n}</span>
                          <span className="whitespace-nowrap font-medium text-terradeep">{it.p}</span>
                        </li>
                      ))}
                    </ul>
                    {b.featured && (
                      <div className="mt-auto pt-6">
                        <span className="inline-flex items-center gap-2 rounded-full bg-terra/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-terradeep">
                          <SparklesIcon size={13} /> La signature du salon
                        </span>
                      </div>
                    )}
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* TARIFS */}
      <section id="tarifs" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:py-32">
        <SectionReveal className="mb-14">
          <span className="inline-block rounded-full bg-sauge/20 px-4 py-1 text-xs uppercase tracking-[0.25em] text-sauge">03 — Tarifs</span>
          <h2 className="mt-4 font-fraunces text-4xl font-semibold text-brun md:text-5xl">La carte des prestations</h2>
        </SectionReveal>
        <div className="md:columns-2 md:gap-8">
          {PRICING.map((cat) => (
            <SectionReveal key={cat.group} className="mb-8 break-inside-avoid rounded-[2rem] border border-brun/10 bg-white/60 p-8 shadow-[0_20px_45px_-30px_rgba(59,51,43,.5)]">
              <h3 className="mb-5 font-fraunces text-2xl italic text-terradeep">{cat.group}</h3>
              <ul className="divide-y divide-brun/10">
                {cat.rows.map((it) => (
                  <li key={it.n} className="flex items-baseline justify-between gap-4 py-3.5">
                    <span className="text-brun/85">
                      {it.n} {it.d && <span className="text-xs text-brun/50">· {it.d}</span>}
                    </span>
                    <span className="whitespace-nowrap font-fraunces font-semibold text-terradeep">
                      {it.from && <span className="mr-1 text-xs font-normal uppercase tracking-wider text-brun/50">dès</span>}
                      {it.p}
                    </span>
                  </li>
                ))}
              </ul>
            </SectionReveal>
          ))}
        </div>
        <p className="mt-2 text-sm text-brun/55">Tarifs indicatifs relevés sur Planity. Le prix définitif est confirmé en salon après diagnostic.</p>
        <div className="mt-12 text-center"><Reserve /></div>
      </section>

      {/* AVIS */}
      <section id="avis" className="scroll-mt-24 border-y border-brun/10 bg-white/40 py-24 md:py-32">
        <SectionReveal className="mb-12 text-center">
          <span className="inline-block rounded-full bg-terra/15 px-4 py-1 text-xs uppercase tracking-[0.25em] text-terradeep">04 — Elles en parlent</span>
          <div className="mt-4 font-fraunces text-6xl font-semibold text-terradeep">{SALON.rating}<span className="text-2xl text-brun/40">/5</span></div>
          <p className="mt-2 text-brun/65">Une note d'excellence sur {SALON.reviews} avis vérifiés</p>
        </SectionReveal>
        <InfiniteMovingCards
          items={REVIEWS}
          speed="slow"
          card="border border-brun/10 bg-lin text-brun shadow-[0_18px_40px_-28px_rgba(59,51,43,.45)]"
        />
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-2">
          <SectionReveal>
            <span className="inline-block rounded-full bg-sauge/20 px-4 py-1 text-xs uppercase tracking-[0.25em] text-sauge">05 — Infos pratiques</span>
            <h2 className="mt-4 font-fraunces text-4xl font-semibold text-brun md:text-5xl">Venir au salon</h2>
            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 text-terra" size={20} />
                <div><div className="text-xs uppercase tracking-[0.2em] text-brun/50">Adresse</div><div className="mt-1 font-fraunces text-lg text-brun">{SALON.address}</div></div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-1 text-terra" size={20} />
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-brun/50">Téléphone</div>
                  <a href={SALON.phoneHref} className="mt-1 block font-fraunces text-lg text-brun transition-colors hover:text-terradeep">{SALON.phone}</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-1 text-terra" size={20} />
                <div className="w-full">
                  <div className="text-xs uppercase tracking-[0.2em] text-brun/50">Horaires</div>
                  <table className="mt-2 w-full max-w-sm text-sm">
                    <tbody>
                      {SALON.hours.map((h) => (
                        <tr key={h.d} className="border-b border-brun/10">
                          <td className="py-2 text-brun/75">{h.d}</td>
                          <td className={`py-2 text-right ${h.closed ? 'italic text-brun/40' : 'font-medium text-brun'}`}>{h.h}</td>
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
            <div className="relative h-full min-h-[340px] overflow-hidden rounded-[2rem] border border-brun/10 shadow-[0_24px_50px_-30px_rgba(59,51,43,.5)]" style={{ backgroundColor: '#E9DFD2' }}>
              <iframe
                title="Carte — Madame Monsieur"
                loading="lazy"
                className="absolute inset-0 h-full w-full"
                style={{ border: 0 }}
                src={`https://www.google.com/maps?q=${SALON.mapsQuery}&z=18&output=embed`}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-lin to-transparent p-6">
                <a href={SALON.mapsLink} target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-sm font-medium text-terradeep">
                  Ouvrir dans Google Maps <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="relative overflow-hidden border-t border-brun/10 py-24 text-center md:py-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[26vw] w-[54vw] -translate-x-1/2 rounded-full bg-terra/10 blur-[120px]" />
          <div className="absolute bottom-0 left-[20%] h-[20vw] w-[30vw] rounded-full bg-sauge/12 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-3xl px-6">
          <span className="inline-block rounded-full bg-terra/15 px-4 py-1 text-xs uppercase tracking-[0.25em] text-terradeep">Votre prochain rendez-vous</span>
          <h2 className="mt-4 font-fraunces text-4xl font-semibold text-brun md:text-6xl">
            Offrez à vos cheveux l'<span className="italic text-terradeep">éclat</span> qu'ils méritent
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-brun/70">Réservez en quelques clics, à toute heure. {SALON.stylist} vous accueille du mardi au samedi.</p>
          <div className="mt-9 flex justify-center"><Reserve /></div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-brun/10 bg-white/50 px-6 py-14">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <div className="font-fraunces text-xl font-semibold text-brun">{SALON.name}</div>
            <div className="text-sm text-brun/55">{SALON.tagline}</div>
          </div>
          <div className="text-sm text-brun/55">© 2026 {SALON.name} — {SALON.city}</div>
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-terradeep"><ArrowLeft size={15} /> Retour aux maquettes</Link>
        </div>
      </footer>
    </div>
  )
}

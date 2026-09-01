import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Scissors, Sparkles as SparklesIcon, User, Droplet, Star, MapPin, Phone, Clock, ArrowRight, Calendar, Menu, X, ArrowLeft } from 'lucide-react'
import { SALON, STATS, SERVICES, PRICING, REVIEWS } from '../data'
import { PLANITY_URL } from '../lib/utils'
import SmoothScroll from '../components/SmoothScroll'
import ThreeDCard from '../components/ui/ThreeDCard'
import InfiniteMovingCards from '../components/ui/InfiniteMovingCards'
import NumberTicker from '../components/ui/NumberTicker'
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

function Reserve({ className = '', children = 'Prendre rendez-vous', dark = false }) {
  // dark=true → destiné à un fond charbon (texte clair) ; sinon fond clair (texte charbon/or foncé)
  const base = dark
    ? 'border border-orclair/40 bg-transparent text-ivoire hover:bg-orclair hover:text-charbon'
    : 'border border-charbon/25 bg-charbon text-ivoire hover:bg-or hover:border-or hover:text-charbon'
  return (
    <a
      href={PLANITY_URL}
      target="_blank"
      rel="noopener"
      className={`group inline-flex items-center gap-2.5 px-7 py-3.5 text-xs uppercase tracking-[0.22em] transition-colors duration-300 ${base} ${className}`}
    >
      <Calendar size={16} />
      <span>{children}</span>
    </a>
  )
}

export default function Eclat() {
  useLegacyFonts()
  const [open, setOpen] = useState(false)
  return (
    <div className="min-h-screen bg-ivoire font-jost text-charbon selection:bg-or/30">
      <SmoothScroll />

      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-charbon/10 bg-ivoire/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/eclat" className="font-playfair text-xl font-medium tracking-tight text-charbon">
            {SALON.name}
            <span className="ml-3 hidden text-[0.6rem] font-normal uppercase tracking-[0.32em] text-or sm:inline">Gréoux-les-Bains</span>
          </Link>
          <nav className="hidden items-center gap-9 lg:flex">
            {NAV.map((n) => (
              <a key={n.href} data-anchor={n.href} href={n.href} className="text-xs uppercase tracking-[0.2em] text-charbon/60 transition-colors hover:text-or">{n.label}</a>
            ))}
          </nav>
          <div className="hidden lg:block"><Reserve className="!px-6 !py-2.5">Réserver</Reserve></div>
          <button className="text-charbon lg:hidden" onClick={() => setOpen(true)} aria-label="Ouvrir le menu"><Menu /></button>
        </div>
      </header>

      {/* MENU MOBILE */}
      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8 bg-ivoire/98 backdrop-blur-xl">
          <button className="absolute right-6 top-6 text-charbon" onClick={() => setOpen(false)} aria-label="Fermer le menu"><X size={28} /></button>
          {NAV.map((n) => (
            <a key={n.href} data-anchor={n.href} href={n.href} onClick={() => setOpen(false)} className="font-playfair text-3xl text-charbon">{n.label}</a>
          ))}
          <Reserve />
        </div>
      )}

      {/* HERO */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute right-[-6%] top-[10%] h-[36vw] w-[36vw] rounded-full bg-orclair/20 blur-[130px]" />
          <div className="absolute left-[-4%] bottom-[8%] h-[28vw] w-[28vw] rounded-full bg-or/10 blur-[120px]" />
        </div>

        <div className="mx-auto w-full max-w-6xl px-6 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
            className="max-w-4xl"
          >
            <span className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-or">
              <span className="h-px w-10 bg-or" aria-hidden="true" />
              Maison de coiffure · Haute-Provence
            </span>
            <h1 className="mt-8 font-playfair text-6xl font-medium leading-[0.95] tracking-tight text-charbon sm:text-8xl">
              L'éclat<br />
              <span className="font-serif italic text-or">révélé</span> du cheveu
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-charbon/70">
              Coupe, couleur et balayage d'exception à {SALON.city}. Le savoir-faire d'{SALON.stylist}, plus de {SALON.experience} ans de passion, dans un écrin lumineux et intemporel.
            </p>
            <div className="mt-6 inline-flex items-center gap-3 text-sm text-charbon/70">
              <span className="flex text-or" aria-hidden="true">{[0,1,2,3,4].map(i => <Star key={i} size={14} className="fill-current" />)}</span>
              <span className="tracking-wide">{SALON.rating}/5 · {SALON.reviews} avis vérifiés</span>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Reserve />
              <a data-anchor="#prestations" href="#prestations" className="group inline-flex items-center gap-2 border-b border-charbon/30 pb-1 text-xs uppercase tracking-[0.22em] text-charbon/70 transition-colors hover:border-or hover:text-or">
                Découvrir la maison <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
            <p className="mt-10 text-[0.65rem] uppercase tracking-[0.28em] text-charbon/40">Réservation en ligne 24h/24 via Planity</p>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-charbon/10 bg-ivoire">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-16 md:grid-cols-4">
          {STATS.map((s, i) => (
            <SectionReveal key={s.label} delay={i * 0.08} className="text-center">
              <div className="font-playfair text-5xl font-medium text-charbon md:text-6xl">
                <NumberTicker value={s.value} decimals={s.decimals || 0} suffix={s.suffix || ''} />
              </div>
              <div className="mt-3 text-[0.65rem] uppercase tracking-[0.24em] text-or">{s.label}</div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* LE SALON */}
      <section id="salon" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28 md:py-36">
        <div className="grid items-center gap-14 md:grid-cols-2">
          <SectionReveal>
            <div className="relative aspect-[4/5] overflow-hidden border border-charbon/10"
              style={{ backgroundColor: '#e6ddcd', backgroundImage: `url('${import.meta.env.BASE_URL}photos/realisation-balayage-blond.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div className="absolute inset-0 bg-gradient-to-t from-charbon/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 border-l-2 border-or bg-ivoire/90 px-6 py-4 backdrop-blur">
                <div className="font-playfair text-xl text-charbon">{SALON.stylist}</div>
                <div className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-or">Coiffeuse · {SALON.experience} ans d'expérience</div>
              </div>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <span className="text-xs uppercase tracking-[0.32em] text-or">01 — Le salon</span>
            <h2 className="mt-5 font-playfair text-4xl font-medium leading-tight text-charbon md:text-5xl">Un lieu familial, comme à la maison</h2>
            <p className="mt-7 leading-relaxed text-charbon/70">
              Au cœur de {SALON.city}, village thermal de Haute-Provence, {SALON.name} cultive un art de recevoir aussi soigné que ses coupes. On y pousse la porte pour une couleur, on y revient pour l'accueil et la douceur d'{SALON.stylist}.
            </p>
            <p className="mt-4 leading-relaxed text-charbon/70">
              Spécialiste des techniques de balayage contemporaines, {SALON.stylist} met plus de vingt années d'expérience au service d'un conseil personnalisé : chaque chevelure appelle sa réponse sur-mesure.
            </p>
            <div className="mt-9 border-t border-charbon/15 pt-7 font-serif text-2xl italic text-or">« Ici, on prend le temps de vous. »</div>
          </SectionReveal>
        </div>
      </section>

      {/* PRESTATIONS */}
      <section id="prestations" className="scroll-mt-24 border-t border-charbon/10 bg-[#efe8da] px-6 py-28 md:py-36">
        <div className="mx-auto max-w-6xl">
          <SectionReveal className="mb-16 text-center">
            <span className="text-xs uppercase tracking-[0.32em] text-or">02 — Prestations</span>
            <h2 className="mt-5 font-playfair text-4xl font-medium text-charbon md:text-5xl">Nos univers de coiffure</h2>
          </SectionReveal>
          <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => {
              const Icon = ICONS[s.icon] || Scissors
              return (
                <StaggerItem key={s.key}>
                  <ThreeDCard className="h-full border border-charbon/12 bg-ivoire p-8 transition-colors hover:border-or/50">
                    <div className="mb-6 inline-flex h-12 w-12 items-center justify-center border border-or/30 text-or">
                      <Icon size={22} />
                    </div>
                    <h3 className="font-playfair text-xl font-medium text-charbon">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-charbon/60">{s.desc}</p>
                    <ul className="mt-6 space-y-2.5 border-t border-charbon/10 pt-5">
                      {s.items.map((it) => (
                        <li key={it.n} className="flex items-center justify-between gap-3 text-sm">
                          <span className="text-charbon/75">{it.n}</span>
                          <span className="whitespace-nowrap font-medium text-or">{it.p}</span>
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
      <section id="tarifs" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28 md:py-36">
        <SectionReveal className="mb-16">
          <span className="text-xs uppercase tracking-[0.32em] text-or">03 — Tarifs</span>
          <h2 className="mt-5 font-playfair text-4xl font-medium text-charbon md:text-5xl">La carte des prestations</h2>
        </SectionReveal>
        <div className="md:columns-2 md:gap-12">
          {PRICING.map((cat) => (
            <SectionReveal key={cat.group} className="mb-12 break-inside-avoid border-t-2 border-or pt-8">
              <h3 className="mb-6 font-serif text-2xl italic text-or">{cat.group}</h3>
              <ul className="divide-y divide-charbon/12">
                {cat.rows.map((it) => (
                  <li key={it.n} className="flex items-baseline justify-between gap-4 py-4">
                    <span className="text-charbon/85">
                      {it.n} {it.d && <span className="text-xs text-charbon/45">· {it.d}</span>}
                    </span>
                    <span className="whitespace-nowrap font-playfair text-lg text-or">
                      {it.from && <span className="mr-1 font-sans text-xs uppercase tracking-wider text-charbon/45">dès</span>}
                      {it.p}
                    </span>
                  </li>
                ))}
              </ul>
            </SectionReveal>
          ))}
        </div>
        <p className="mt-4 text-sm text-charbon/50">Tarifs indicatifs relevés sur Planity. Le prix définitif est confirmé en salon après diagnostic.</p>
        <div className="mt-14 text-center"><Reserve /></div>
      </section>

      {/* AVIS */}
      <section id="avis" className="scroll-mt-24 bg-charbon py-28 text-ivoire md:py-36">
        <SectionReveal className="mb-14 text-center">
          <span className="text-xs uppercase tracking-[0.32em] text-orclair">04 — Elles en parlent</span>
          <div className="mt-5 font-playfair text-7xl font-medium text-orclair">{SALON.rating}<span className="text-2xl text-ivoire/40">/5</span></div>
          <p className="mt-3 text-ivoire/60">Une note d'excellence sur {SALON.reviews} avis vérifiés</p>
        </SectionReveal>
        <InfiniteMovingCards
          items={REVIEWS}
          speed="slow"
          card="border border-ivoire/15 bg-ivoire/[0.06] text-ivoire backdrop-blur"
        />
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28 md:py-36">
        <div className="grid gap-14 md:grid-cols-2">
          <SectionReveal>
            <span className="text-xs uppercase tracking-[0.32em] text-or">05 — Infos pratiques</span>
            <h2 className="mt-5 font-playfair text-4xl font-medium text-charbon md:text-5xl">Venir au salon</h2>
            <div className="mt-9 space-y-7">
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 text-or" size={20} />
                <div><div className="text-[0.65rem] uppercase tracking-[0.24em] text-charbon/45">Adresse</div><div className="mt-1.5 font-playfair text-lg text-charbon">{SALON.address}</div></div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="mt-1 text-or" size={20} />
                <div>
                  <div className="text-[0.65rem] uppercase tracking-[0.24em] text-charbon/45">Téléphone</div>
                  <a href={SALON.phoneHref} className="mt-1.5 block font-playfair text-lg text-charbon transition-colors hover:text-or">{SALON.phone}</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="mt-1 text-or" size={20} />
                <div className="w-full">
                  <div className="text-[0.65rem] uppercase tracking-[0.24em] text-charbon/45">Horaires</div>
                  <table className="mt-3 w-full max-w-sm text-sm">
                    <tbody>
                      {SALON.hours.map((h) => (
                        <tr key={h.d} className="border-b border-charbon/12">
                          <td className="py-2.5 text-charbon/75">{h.d}</td>
                          <td className={`py-2.5 text-right ${h.closed ? 'italic text-charbon/40' : 'text-charbon'}`}>{h.h}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="mt-9"><Reserve /></div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <div className="relative h-full min-h-[340px] overflow-hidden border border-charbon/12 bg-[#e6ddcd]">
              <iframe
                title="Carte — Madame Monsieur"
                loading="lazy"
                className="absolute inset-0 h-full w-full"
                style={{ filter: 'grayscale(.25) contrast(.95)', border: 0 }}
                src={`https://www.google.com/maps?q=${SALON.mapsQuery}&z=18&output=embed`}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ivoire to-transparent p-6">
                <a href={SALON.mapsLink} target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-sm font-medium text-or">
                  Ouvrir dans Google Maps <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="relative overflow-hidden border-t border-charbon/10 bg-[#efe8da] py-28 text-center md:py-36">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[26vw] w-[52vw] -translate-x-1/2 rounded-full bg-orclair/25 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-3xl px-6">
          <span className="text-xs uppercase tracking-[0.32em] text-or">Votre prochain rendez-vous</span>
          <h2 className="mt-5 font-playfair text-4xl font-medium leading-tight text-charbon md:text-6xl">
            Offrez à vos cheveux l'<span className="font-serif italic text-or">éclat</span> qu'ils méritent
          </h2>
          <p className="mx-auto mt-7 max-w-xl leading-relaxed text-charbon/70">Réservez en quelques clics, à toute heure. {SALON.stylist} vous accueille du mardi au samedi.</p>
          <div className="mt-10 flex justify-center"><Reserve /></div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-charbon/10 bg-charbon px-6 py-16 text-ivoire">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <div className="font-playfair text-xl font-medium text-ivoire">{SALON.name}</div>
            <div className="mt-1 text-sm text-ivoire/50">{SALON.tagline}</div>
          </div>
          <div className="text-sm text-ivoire/50">© 2026 {SALON.name} — {SALON.city}</div>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-orclair transition-colors hover:text-ivoire"><ArrowLeft size={15} /> Retour aux maquettes</Link>
        </div>
      </footer>
    </div>
  )
}

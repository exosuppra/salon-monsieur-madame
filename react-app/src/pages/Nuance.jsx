import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, CalendarDays, Menu, X } from 'lucide-react'
import { cn } from '../lib/utils'
import { SALON, STATS, PRICING, REVIEWS } from '../data'
import SmoothScroll from '../components/SmoothScroll'
import InfiniteMovingCards from '../components/ui/InfiniteMovingCards'
import NumberTicker from '../components/ui/NumberTicker'
import SectionReveal, { StaggerGroup, StaggerItem } from '../components/ui/SectionReveal'

// Base des assets (respecte le base Vite /salon-monsieur-madame/app/)
const P = import.meta.env.BASE_URL + 'photos/'

const NAV = [
  ['#salon', 'Le salon'],
  ['#prestations', 'Prestations'],
  ['#realisations', 'Réalisations'],
  ['#tarifs', 'Tarifs'],
  ['#avis', 'Avis'],
  ['#contact', 'Contact'],
]

const SERVICES = [
  { ic: '✂', t: 'Coupe & Brushing', d: 'Coupe façonnée sur mesure et brushing lumineux, du court au très long.', tag: 'Dès 32 €' },
  { ic: '❋', t: 'Coloration', d: 'Couleurs profondes ou éclaircissantes, adaptées à votre base et à votre peau.', tag: 'Dès 64 €' },
  { ic: '✧', t: 'Balayage & Mèches', d: 'La signature du salon : des reflets naturels qui repoussent sans démarcation.', tag: 'Dès 90 €' },
  { ic: '❁', t: 'Soins & Lissage', d: 'Le protocole YBERA, du soin botox express au lissage brésilien complet.', tag: 'Dès 40 €' },
  { ic: '◈', t: 'Homme', d: 'Coupe nette, barbe taillée et tracée, shampooing compris.', tag: 'Coupe 23 € · Forfait 32 €' },
  { ic: '☺', t: 'Enfants', d: 'Shampooing et coupe pour les moins de 10 ans, en douceur et sans stress.', tag: '18 € – 30 €' },
  { ic: '◐', t: 'Permanente', d: 'Du mouvement durable, seul ou associé à une coupe.', tag: 'Dès 55 €' },
  { ic: '♡', t: 'Mariage & Événement', d: 'Chignon, coiffure création, extensions : sur devis, avec essai.', tag: 'Sur devis' },
]

const GALLERY = [
  { src: 'realisation-balayage-blond.jpg', cap: 'Balayage blond, reflets sable', alt: 'Balayage blond aux reflets sable sur carré long ondulé' },
  { src: 'realisation-contraste-racines.jpg', cap: 'Racines fondues, blond lumineux', alt: 'Coloration blonde très claire avec racines fondues' },
  { src: 'realisation-brushing-ondule.jpg', cap: 'Brushing ondulé', alt: 'Brushing ondulé sur base blond doré' },
  { src: 'realisation-cheveux-longs.jpg', cap: 'Longueurs et vagues souples', alt: 'Cheveux longs châtain clair travaillés en vagues souples' },
  { src: 'realisation-carre-blond.jpg', cap: 'Carré blond polaire', alt: 'Carré blond polaire structuré' },
]

const SHADOW = 'shadow-[0_24px_60px_-34px_rgba(51,42,33,.45)]'
const SHADOW_SOFT = 'shadow-[0_12px_34px_-22px_rgba(51,42,33,.4)]'

// Titres manuscrits (Caveat) + corps en italique serif : identité « bohème »
const TITLE = 'font-hand font-semibold leading-[1.02]'
const LEAD = 'font-newsreader italic'

function Reserve({ children = 'Prendre rendez-vous', className = '' }) {
  return (
    <a
      href={SALON.booking}
      target="_blank"
      rel="noopener"
      className={cn('inline-flex items-center justify-center gap-2 rounded-full bg-terracotta px-7 py-3 text-sm font-medium text-creme transition-all hover:-translate-y-0.5 hover:bg-cognac', SHADOW_SOFT, className)}
    >
      <CalendarDays size={16} /> {children}
    </a>
  )
}

function Ghost({ href, anchor, tel, children, className = '' }) {
  const props = tel
    ? { href: SALON.phoneHref }
    : anchor
      ? { href: anchor, 'data-anchor': anchor }
      : { href }
  return (
    <a
      {...props}
      className={cn('inline-flex items-center justify-center gap-2 rounded-full border border-rose bg-rose-soft px-6 py-3 text-sm font-medium text-rose-deep transition-all hover:-translate-y-0.5 hover:bg-rose hover:text-encre', className)}
    >
      {children}
    </a>
  )
}

function Eyebrow({ children, center = false }) {
  return (
    <span className={cn('inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.26em] text-terracotta', center && 'justify-center')}>
      <span className="h-px w-7 bg-gradient-to-r from-terracotta to-rose" /> {children}
    </span>
  )
}

export default function Nuance() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="relative min-h-screen bg-lin font-karla text-encre selection:bg-terracotta selection:text-creme">
      <SmoothScroll />
      {/* Texture papier très légère */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-50"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")" }}
      />

      {/* HEADER */}
      <header className={cn('fixed inset-x-0 top-0 z-50 transition-all', scrolled ? 'bg-lin/90 py-2.5 shadow-[0_1px_0_rgba(51,42,33,.08)] backdrop-blur-xl' : 'py-5')}>
        <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-8 px-6">
          <Link to="/nuance" className="flex flex-col leading-none">
            <span className="font-hand text-[1.7rem] font-bold leading-none">{SALON.name}</span>
            <span className="mt-1 text-[0.56rem] font-semibold uppercase tracking-[0.32em] text-terracotta">Gréoux-les-Bains</span>
          </Link>
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV.map(([href, label]) => (
              <a key={href} href={href} data-anchor={href} className="group relative text-sm text-encre-doux transition-colors hover:text-encre">
                {label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-terracotta transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2.5">
            <a href={SALON.phoneHref} className="hidden rounded-full border border-rose bg-rose-soft px-4 py-2 text-sm font-medium text-rose-deep transition-colors hover:bg-rose hover:text-encre sm:inline-flex">{SALON.phone}</a>
            <Reserve className="!hidden !px-5 !py-2.5 sm:!inline-flex">Réserver</Reserve>
            <button className="grid h-11 w-11 place-items-center rounded-xl border border-encre/15 bg-creme text-encre lg:hidden" onClick={() => setOpen(true)} aria-label="Ouvrir le menu">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* MENU MOBILE */}
      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-5 bg-lin">
          <button className="absolute right-6 top-6 text-encre" onClick={() => setOpen(false)} aria-label="Fermer le menu"><X size={26} /></button>
          {NAV.map(([href, label]) => (
            <a key={href} href={href} data-anchor={href} onClick={() => setOpen(false)} className="font-hand text-4xl font-semibold text-encre">{label}</a>
          ))}
          <div className="mt-2 flex flex-col items-center gap-3">
            <a href={SALON.phoneHref} className="rounded-full border border-encre/20 px-6 py-3 text-sm">{SALON.phone}</a>
            <Reserve />
          </div>
        </div>
      )}

      <main className="relative z-10">
        {/* HERO */}
        <section className="relative flex min-h-screen items-center overflow-hidden px-6 pb-16 pt-32">
          {/* Halos rose poudré + terracotta */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
            <div className="absolute -right-24 top-10 h-[44vw] w-[44vw] rounded-full bg-rose/70 blur-[110px]" />
            <div className="absolute left-[30%] bottom-4 h-[26vw] w-[26vw] rounded-full bg-rose/40 blur-[120px]" />
          </div>
          <div className="relative z-10 mx-auto grid max-w-[1180px] items-center gap-10 md:grid-cols-[1.05fr_.95fr]">
            <div>
              <SectionReveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-rose bg-rose-soft px-4 py-2 text-sm">
                  <span className="tracking-widest text-terracotta" aria-hidden="true">★★★★★</span> {SALON.rating}/5 · {SALON.reviews} avis vérifiés
                </span>
              </SectionReveal>
              <SectionReveal delay={0.08}>
                <h1 className={cn(TITLE, 'mt-5 text-[clamp(3.6rem,9.5vw,6.6rem)]')}>
                  Un salon<br />où l'on prend<br /><span className="text-terracotta">le temps</span>
                </h1>
              </SectionReveal>
              <SectionReveal delay={0.16}>
                <p className={cn(LEAD, 'mt-5 max-w-lg text-[1.2rem] text-encre-doux')}>
                  Coupe, couleur et balayage à {SALON.city}. Vingt ans de métier, une pièce chaleureuse en bois et cuir, et une seule idée en tête : que vos cheveux vous ressemblent.
                </p>
              </SectionReveal>
              <SectionReveal delay={0.22}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Reserve />
                  <Ghost anchor="#prestations">Découvrir le salon</Ghost>
                </div>
                <p className="mt-6 text-xs uppercase tracking-[0.16em] text-encre-doux/75">Réservation en ligne 24h/24 via Planity · {SALON.phone}</p>
              </SectionReveal>
            </div>

            {/* Photos réelles du salon */}
            <SectionReveal delay={0.15}>
              <div className="relative aspect-[4/4.6]">
                <div
                  role="img" aria-label="Balayage blond réalisé au salon"
                  className={cn('absolute inset-[0_0_18%_22%] overflow-hidden rounded-[32px] bg-sable bg-cover bg-center', SHADOW)}
                  style={{ backgroundImage: `url('${P}realisation-balayage-blond.jpg')` }}
                />
                <div
                  role="img" aria-label="Coloration contrastée avec racines fondues"
                  className={cn('absolute bottom-0 left-0 aspect-[1/1.15] w-[46%] overflow-hidden rounded-[32px] border-[6px] border-lin bg-sable bg-cover bg-center', SHADOW)}
                  style={{ backgroundImage: `url('${P}realisation-contraste-racines.jpg')` }}
                />
                <motion.div
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }}
                  className={cn('absolute right-[6%] top-[8%] rounded-[20px] bg-creme px-[1.15rem] py-[0.7rem] text-center ring-1 ring-rose/50', SHADOW_SOFT)}
                >
                  <div className="font-hand text-[2.4rem] font-bold leading-none text-cognac">20</div>
                  <div className="text-[0.62rem] uppercase tracking-[0.18em] text-encre-doux">ans de métier</div>
                </motion.div>
              </div>
            </SectionReveal>
          </div>
        </section>

        {/* STATS */}
        <section className="border-y border-rose/40 bg-rose-soft/70">
          <div className="mx-auto grid max-w-[1180px] grid-cols-2 gap-8 px-6 py-12 text-center md:grid-cols-4">
            {STATS.map((s, i) => (
              <SectionReveal key={s.label} delay={i * 0.08}>
                <div className="font-hand text-5xl font-bold leading-none text-cognac md:text-6xl">
                  <NumberTicker value={s.value} decimals={s.decimals || 0} suffix={s.suffix || ''} />
                </div>
                <div className="mt-1.5 text-xs uppercase tracking-[0.14em] text-encre-doux">{s.label}</div>
              </SectionReveal>
            ))}
          </div>
        </section>

        {/* LE SALON */}
        <section id="salon" className="scroll-mt-24 px-6 py-24 md:py-32">
          <div className="mx-auto grid max-w-[1180px] items-center gap-10 md:grid-cols-[.95fr_1.05fr]">
            <SectionReveal>
              <div
                role="img" aria-label="La terrasse devant le salon Madame Monsieur"
                className={cn('relative aspect-[4/3] overflow-hidden rounded-[32px] bg-sable bg-cover bg-center', SHADOW)}
                style={{ backgroundImage: `url('${P}salon-terrasse.jpg')` }}
              >
                <div className="absolute bottom-5 left-5 rounded-[20px] bg-creme/95 px-5 py-2.5 backdrop-blur">
                  <div className="font-hand text-2xl font-bold leading-none">Elodie</div>
                  <div className="mt-1 text-[0.66rem] uppercase tracking-[0.16em] text-terracotta">Coiffeuse · 20 ans d'expérience</div>
                </div>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <Eyebrow>Le salon</Eyebrow>
              <h2 className={cn(TITLE, 'mt-3 text-[clamp(2.7rem,5.5vw,4.1rem)]')}>Une maison plus qu'un <span className="text-terracotta">salon</span></h2>
              <p className={cn(LEAD, 'mt-4 text-[1.12rem] text-encre-doux')}>
                Au cœur de {SALON.city}, village thermal de Haute-Provence, {SALON.name} cultive un art de recevoir aussi soigné que ses coupes. Du bois brut, un fauteuil de cuir patiné, des paniers d'osier et beaucoup de lumière : on y pousse la porte pour une couleur, on y revient pour l'accueil.
              </p>
              <ul className="mt-7 grid gap-4">
                {[
                  ['Diagnostic avant chaque couleur', "on regarde la matière, l'historique, l'entretien réaliste au quotidien."],
                  ['Femme, homme et enfant', 'toute la famille au même endroit, sans surcoût déguisé.'],
                  ['Soins et lissage YBERA', 'pour discipliner sans alourdir, du soin express au lissage complet.'],
                  ['Curistes bienvenus', 'beaucoup reviennent chaque saison, on connaît leurs cheveux.'],
                ].map(([t, d], i) => (
                  <li key={t} className="flex items-start gap-3.5 text-encre-doux">
                    <span className={cn('mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full text-xs text-cognac', i % 2 ? 'bg-rose-soft' : 'bg-sable')}>✓</span>
                    <span><strong className="text-encre">{t}</strong> — {d}</span>
                  </li>
                ))}
              </ul>
            </SectionReveal>
          </div>
        </section>

        {/* PRESTATIONS */}
        <section id="prestations" className="scroll-mt-24 border-y border-sable bg-creme/50 px-6 py-24 md:py-32">
          <div className="mx-auto max-w-[1180px]">
            <SectionReveal className="mb-12 max-w-2xl">
              <Eyebrow>Prestations</Eyebrow>
              <h2 className={cn(TITLE, 'mt-3 text-[clamp(2.8rem,6vw,4.4rem)]')}>Ce que l'on fait, <span className="text-terracotta">simplement</span></h2>
              <p className={cn(LEAD, 'mt-3 text-[1.12rem] text-encre-doux')}>Huit familles de prestations, une grille de tarifs complète juste en dessous. Pas de mauvaise surprise en caisse.</p>
            </SectionReveal>
            <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {SERVICES.map((s, i) => (
                <StaggerItem key={s.t}>
                  <div className="h-full rounded-[28px] border border-encre/10 bg-creme p-7 transition-all hover:-translate-y-1.5 hover:shadow-[0_24px_60px_-34px_rgba(51,42,33,.45)]">
                    <div className={cn('mb-4 grid h-12 w-12 place-items-center rounded-2xl text-xl', i % 2 ? 'bg-rose-soft' : 'bg-sable')} aria-hidden="true">{s.ic}</div>
                    <h3 className="font-hand text-[1.85rem] font-semibold leading-none">{s.t}</h3>
                    <p className={cn(LEAD, 'mt-2 text-[0.98rem] text-encre-doux')}>{s.d}</p>
                    <span className="mt-5 inline-block rounded-full bg-rose-soft px-4 py-1.5 text-sm font-medium text-rose-deep">{s.tag}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>

        {/* RÉALISATIONS */}
        <section id="realisations" className="scroll-mt-24 px-6 py-24 md:py-32">
          <div className="mx-auto max-w-[1180px]">
            <SectionReveal className="mb-12 max-w-2xl">
              <Eyebrow>Réalisations</Eyebrow>
              <h2 className={cn(TITLE, 'mt-3 text-[clamp(2.8rem,6vw,4.4rem)]')}>Le travail d'<span className="text-terracotta">Elodie</span></h2>
              <p className={cn(LEAD, 'mt-3 text-[1.12rem] text-encre-doux')}>Des couleurs faites au salon, photographiées telles quelles, sans retouche. C'est le meilleur argument qu'on puisse donner.</p>
            </SectionReveal>
            <SectionReveal>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {GALLERY.map((g, i) => (
                  <figure key={g.src} className={cn('group relative overflow-hidden rounded-[28px] bg-sable', SHADOW_SOFT, i === 0 && 'col-span-2 row-span-2')}>
                    <img
                      src={`${P}${g.src}`} alt={g.alt} loading="lazy"
                      className={cn('h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105', i === 0 ? 'aspect-[3/3.4]' : 'aspect-[3/4]')}
                    />
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-encre/80 to-transparent px-4 pb-3 pt-6 font-newsreader text-sm italic text-creme">{g.cap}</figcaption>
                  </figure>
                ))}
              </div>
            </SectionReveal>
            <div className="mt-10 flex flex-wrap gap-3">
              <Reserve />
              <Ghost anchor="#tarifs">Voir les tarifs</Ghost>
            </div>
          </div>
        </section>

        {/* TARIFS */}
        <section id="tarifs" className="scroll-mt-24 border-y border-sable bg-creme/50 px-6 py-24 md:py-32">
          <div className="mx-auto max-w-[1180px]">
            <SectionReveal className="mb-12 max-w-2xl">
              <Eyebrow>Tarifs</Eyebrow>
              <h2 className={cn(TITLE, 'mt-3 text-[clamp(2.8rem,6vw,4.4rem)]')}>La carte <span className="text-terracotta">complète</span></h2>
              <p className={cn(LEAD, 'mt-3 text-[1.12rem] text-encre-doux')}>Toutes les prestations du salon, avec leur durée. Exactement la grille que vous retrouverez au moment de réserver sur Planity.</p>
            </SectionReveal>
            <SectionReveal>
              <div className={cn('rounded-[32px] border border-encre/10 bg-creme p-6 sm:p-10', SHADOW_SOFT)}>
                <div className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
                  {PRICING.map((grp) => (
                    <div key={grp.group} className="break-inside-avoid">
                      <h3 className="mb-2 border-b-2 border-sable pb-2.5 font-newsreader text-xl text-cognac">{grp.group}</h3>
                      <ul>
                        {grp.rows.map((r) => (
                          <li key={r.n} className="flex items-baseline justify-between gap-4 border-b border-dashed border-encre/15 py-2.5 last:border-none">
                            <span className="text-[0.93rem] leading-snug text-encre">
                              {r.n}
                              {r.d && <small className="mt-0.5 block text-[0.74rem] tracking-wide text-encre-doux/85">{r.d}</small>}
                            </span>
                            <span className="whitespace-nowrap font-newsreader font-medium text-cognac">{r.from ? 'dès ' : ''}{r.p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <p className={cn(LEAD, 'mt-8 text-sm text-encre-doux')}>Tarifs relevés sur Planity. Le prix définitif est confirmé en salon après diagnostic.</p>
              </div>
            </SectionReveal>
            <div className="mt-10 flex flex-wrap gap-3">
              <Reserve>Réserver un créneau</Reserve>
              <Ghost tel>Une question ? {SALON.phone}</Ghost>
            </div>
          </div>
        </section>

        {/* AVIS (défilement) */}
        <section id="avis" className="scroll-mt-24 py-24 md:py-32">
          <div className="mx-auto mb-12 max-w-[1180px] px-6 text-center">
            <SectionReveal>
              <Eyebrow center>Avis clients</Eyebrow>
              <div className="mt-3 font-hand text-[clamp(3.6rem,8vw,5.4rem)] font-bold leading-none text-cognac">{SALON.rating}<sub className="align-super text-[0.3em] text-encre-doux">/5</sub></div>
              <div className="tracking-[3px] text-terracotta" aria-hidden="true">★★★★★</div>
              <p className={cn(LEAD, 'mt-2 text-encre-doux')}>{SALON.reviews} avis vérifiés sur Planity</p>
            </SectionReveal>
          </div>
          <InfiniteMovingCards
            items={REVIEWS}
            speed="slow"
            starClass="text-terracotta"
            card={cn('border border-encre/10 bg-creme text-encre', SHADOW_SOFT)}
          />
        </section>

        {/* CONTACT */}
        <section id="contact" className="scroll-mt-24 px-6 py-24 md:py-32">
          <div className="mx-auto max-w-[1180px]">
            <SectionReveal className="mb-12 max-w-2xl">
              <Eyebrow>Infos pratiques</Eyebrow>
              <h2 className={cn(TITLE, 'mt-3 text-[clamp(2.8rem,6vw,4.4rem)]')}>Venir au <span className="text-terracotta">salon</span></h2>
              <p className={cn(LEAD, 'mt-3 text-[1.12rem] text-encre-doux')}>Avenue des Marronniers, à deux pas des thermes. Stationnement facile devant le salon.</p>
            </SectionReveal>
            <div className="grid gap-6 md:grid-cols-[1fr_1.1fr]">
              <SectionReveal className="flex">
                <div className="flex w-full flex-col rounded-[32px] border border-encre/10 bg-creme p-7 md:p-9">
                  {[
                    { ic: <MapPin size={20} />, h: 'Adresse', body: <>Av. des Marronniers<br />04800 {SALON.city}</> },
                    { ic: <Phone size={20} />, h: 'Téléphone', body: <a href={SALON.phoneHref} className="font-medium text-cognac hover:underline">{SALON.phone}</a> },
                    { ic: <Clock size={20} />, h: 'Horaires', body: <>Mardi – Samedi : 9h00 – 18h00<br /><span className="italic opacity-65">Dimanche &amp; Lundi : fermé</span></> },
                    { ic: <CalendarDays size={20} />, h: 'Réservation', body: 'En ligne 24h/24 via Planity' },
                  ].map((row, i, arr) => (
                    <div key={row.h} className={cn('flex gap-4 py-4', i === 0 && 'pt-0', i < arr.length - 1 && 'border-b border-sable')}>
                      <span className={cn('grid h-10 w-10 flex-none place-items-center rounded-xl text-cognac', i % 2 ? 'bg-rose-soft' : 'bg-sable')}>{row.ic}</span>
                      <div>
                        <h4 className="font-hand text-xl font-semibold leading-none">{row.h}</h4>
                        <p className="mt-1 text-[0.93rem] text-encre-doux">{row.body}</p>
                      </div>
                    </div>
                  ))}
                  <div className="mt-6 grid gap-2.5">
                    <Reserve />
                    <Ghost tel>Appeler le salon</Ghost>
                  </div>
                </div>
              </SectionReveal>
              <SectionReveal delay={0.1} className="flex">
                <div className={cn('relative min-h-[380px] w-full overflow-hidden rounded-[32px] border border-encre/10 bg-sable', SHADOW_SOFT)}>
                  <iframe
                    title="Localisation du salon Madame Monsieur à Gréoux-les-Bains"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full"
                    style={{ border: 0, filter: 'saturate(.85) sepia(.08)' }}
                    src={`https://maps.google.com/maps?q=${SALON.coords}&t=&z=18&ie=UTF8&iwloc=&output=embed`}
                  />
                  <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-baseline gap-x-4 gap-y-1 bg-gradient-to-t from-lin/95 to-transparent p-5">
                    <span className="font-hand text-2xl font-semibold">{SALON.name} — {SALON.city}</span>
                    <a href={SALON.mapsLink} target="_blank" rel="noopener" className="text-sm font-medium text-cognac">Ouvrir dans Google Maps →</a>
                  </div>
                </div>
              </SectionReveal>
            </div>
          </div>
        </section>

        {/* BANDE CTA */}
        <section className="mx-auto max-w-[1180px] px-6 pb-16">
          <SectionReveal>
            <div className="relative overflow-hidden rounded-[32px] bg-cognac px-6 py-14 text-center text-creme md:px-14">
              <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-rose/25 blur-[90px]" />
              <div className="relative">
                <h2 className={cn(TITLE, 'text-[clamp(2.5rem,5.5vw,3.9rem)] text-creme')}>Offrez à vos cheveux<br />le temps qu'ils <span className="text-rose">méritent</span></h2>
                <p className={cn(LEAD, 'mx-auto mt-3 max-w-xl text-[1.1rem] text-creme/85')}>Elodie vous accueille du mardi au samedi, au cœur de {SALON.city}. Réservez en quelques clics, à toute heure.</p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <a href={SALON.booking} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-creme px-7 py-3 text-sm font-medium text-cognac transition-all hover:-translate-y-0.5 hover:bg-rose hover:text-encre">
                    <CalendarDays size={16} /> Prendre rendez-vous
                  </a>
                  <a href={SALON.phoneHref} className="inline-flex items-center gap-2 rounded-full border border-creme/45 px-6 py-3 text-sm font-medium text-creme transition-all hover:-translate-y-0.5 hover:border-creme">{SALON.phone}</a>
                </div>
              </div>
            </div>
          </SectionReveal>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-sable px-6 pb-10 pt-14">
        <div className="mx-auto max-w-[1180px]">
          <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
            <div>
              <div className="flex flex-col leading-none">
                <span className="font-hand text-2xl font-bold leading-none">{SALON.name}</span>
                <span className="mt-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.3em] text-terracotta">Coiffure · {SALON.city}</span>
              </div>
              <p className={cn(LEAD, 'mt-4 max-w-xs text-sm text-encre-doux')}>Un salon familial où l'on prend le temps. Coupe, couleur, balayage et soins, pour toute la famille.</p>
            </div>
            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-encre-doux">Le salon</h4>
              <ul className="grid gap-2.5 text-sm text-encre-doux">
                {NAV.map(([href, label]) => (
                  <li key={href}><a href={href} data-anchor={href} className="transition-colors hover:text-cognac">{label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-encre-doux">Nous joindre</h4>
              <ul className="grid gap-2.5 text-sm text-encre-doux">
                <li><a href={SALON.phoneHref} className="hover:text-cognac">{SALON.phone}</a></li>
                <li><a href={SALON.mapsLink} target="_blank" rel="noopener" className="hover:text-cognac">Av. des Marronniers</a></li>
                <li><a href={SALON.booking} target="_blank" rel="noopener" className="hover:text-cognac">Réserver sur Planity</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-sable pt-6 text-sm text-encre-doux">
            <span>© 2026 {SALON.name} — {SALON.city}</span>
            <span>Mardi au samedi · 9h – 18h</span>
          </div>
          <div className="mt-4 text-center text-xs text-encre-doux/80">
            Site développé par{' '}
            <a href="https://logiq-ia.fr" target="_blank" rel="noopener" className="font-medium text-cognac underline-offset-4 hover:underline">Logiq IA</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Données réelles du salon — source unique de vérité.
// Tarifs et avis relevés sur la fiche Planity du salon :
// https://www.planity.com/madame-monsieur-04800-greoux-les-bains
export const SALON = {
  name: 'Madame Monsieur',
  tagline: 'Salon de coiffure · Gréoux-les-Bains',
  city: 'Gréoux-les-Bains',
  region: 'Provence · Alpes-de-Haute-Provence',
  address: 'Av. des Marronniers, 04800 Gréoux-les-Bains',
  phone: '04 92 78 02 98',
  phoneHref: 'tel:+33492780298',
  booking: 'https://www.planity.com/madame-monsieur-04800-greoux-les-bains',
  hours: [
    { d: 'Mardi — Samedi', h: '9h00 – 18h00', closed: false },
    { d: 'Dimanche', h: 'Fermé', closed: true },
    { d: 'Lundi', h: 'Fermé', closed: true },
  ],
  rating: '4,9',
  reviews: 185,
  stylist: 'Elodie',
  experience: 20,
  // Coordonnées GPS exactes de la vitrine (relevées sur place).
  // On géocode par coordonnées et non par adresse : « Av. des Marronniers »
  // sans numéro fait centrer Google sur le milieu de l'avenue (le rond-point).
  coords: '43.7582631,5.8876745',
  mapsQuery: '43.7582631,5.8876745',
  // Fiche Google Business du salon (CID) — ouvre la vraie fiche, pas juste un point.
  mapsLink: 'https://www.google.com/maps?cid=14567232486715601681',
}

export const STATS = [
  { value: 20, suffix: '+', label: "Années d'expertise" },
  { value: 4.9, decimals: 1, label: 'Note moyenne' },
  { value: 185, suffix: '+', label: 'Avis vérifiés' },
  { value: 100, suffix: '%', label: 'Sur-mesure' },
]

export const SERVICES = [
  {
    key: 'femme',
    title: 'Femme',
    icon: 'Scissors',
    desc: 'Coupes, brushings et mises en beauté qui révèlent votre style.',
    items: [
      { n: 'Shampoing + brushing', p: '28 – 40 €' },
      { n: 'Shampoing coupe brushing', p: '44 – 56 €' },
      { n: 'Permanente', p: '55 – 70 €' },
    ],
  },
  {
    key: 'couleur',
    title: 'Couleur & Balayage',
    icon: 'Sparkles',
    desc: 'La signature du salon : colorations lumineuses et balayages contemporains.',
    items: [
      { n: 'Coloration + brushing', p: 'dès 64 €' },
      { n: 'Balayage + brushing', p: 'dès 76 €' },
      { n: 'Coloration + mèches', p: 'dès 95 €' },
    ],
  },
  {
    key: 'homme',
    title: 'Homme & Enfant',
    icon: 'User',
    desc: 'Coupes nettes et barbe précise, shampooing inclus.',
    items: [
      { n: 'Coupe homme', p: '23 €' },
      { n: 'Forfait coupe + barbe', p: '32 €' },
      { n: 'Coupe enfant', p: '18 – 30 €' },
    ],
  },
  {
    key: 'soins',
    title: 'Soins & Lissage',
    icon: 'Droplet',
    desc: 'Le lissage brésilien YBERA pour une chevelure souple et éclatante.',
    items: [
      { n: 'Lissage YBERA', p: 'dès 150 €' },
      { n: 'Soin bot Express', p: 'dès 40 €' },
      { n: 'Soin bot Profond', p: 'dès 90 €' },
    ],
  },
]

// Grille tarifaire complète, telle qu'affichée sur Planity.
// `d` = durée annoncée. Les prix « à partir de » sont marqués par from: true.
export const PRICING = [
  {
    group: 'Les forfaits femmes — Brushing',
    rows: [
      { n: 'Shampoing + brushing — cheveux courts', d: '20 min', p: '28 €' },
      { n: 'Shampoing + brushing — cheveux mi-longs', d: '30 min', p: '34 €' },
      { n: 'Shampoing + brushing — cheveux longs', d: '45 min', p: '40 €' },
    ],
  },
  {
    group: 'Les forfaits femmes — Séchage',
    rows: [
      { n: 'Shampoing + séchage — cheveux courts', d: '10 min', p: '16 €' },
      { n: 'Shampoing + séchage — cheveux mi-longs', d: '10 min', p: '18 €' },
      { n: 'Shampoing + séchage — cheveux longs', d: '15 min', p: '20 €' },
    ],
  },
  {
    group: 'Les forfaits femmes — Coupe brushing',
    rows: [
      { n: 'Shampoing coupe brushing — cheveux courts', d: '30 min', p: '44 €' },
      { n: 'Shampoing coupe brushing — cheveux mi-longs', d: '30 min', p: '50 €' },
      { n: 'Shampoing coupe brushing — cheveux longs', d: '50 min', p: '56 €' },
    ],
  },
  {
    group: 'Les forfaits femmes — Coupe séchage',
    rows: [
      { n: 'Shampoing coupe séchage — cheveux courts', d: '20 min', p: '35 €' },
      { n: 'Shampoing coupe séchage — cheveux mi-longs', d: '25 min', p: '40 €' },
      { n: 'Shampoing coupe séchage — cheveux longs', d: '40 min', p: '45 €' },
    ],
  },
  {
    group: 'Coloration',
    rows: [
      { n: 'Coloration + shampoing brushing — cheveux courts', d: '1h30', p: '76 €', from: true },
      { n: 'Coloration + shampoing brushing — cheveux mi-longs', d: '1h30', p: '80 €', from: true },
      { n: 'Coloration + shampoing brushing — cheveux longs', d: '2h', p: '64 €', from: true },
      { n: 'Coloration + shampoing coupe brushing — cheveux courts', d: '1h30', p: '74 €', from: true },
      { n: 'Coloration + shampoing coupe brushing — cheveux mi-longs', d: '1h30', p: '77 €', from: true },
    ],
  },
  {
    group: 'Balayage · Ombré hair · Mèches',
    rows: [
      { n: 'Balayage + shampoing brushing — cheveux courts', d: '2h30', p: '76 €', from: true },
      { n: 'Balayage + shampoing brushing — cheveux mi-longs', d: '3h', p: '95 €', from: true },
      { n: 'Balayage + shampoing brushing — cheveux longs', d: '3h30', p: '114 €', from: true },
      { n: 'Balayage + shampoing coupe brushing — cheveux courts', d: '2h30', p: '90 €', from: true },
      { n: 'Balayage + shampoing coupe brushing — cheveux mi-longs', d: '3h', p: '95 €', from: true },
    ],
  },
  {
    group: 'Coloration et mèches',
    rows: [
      { n: 'Coloration + mèches + brushing — cheveux courts', d: '2h15', p: '95 €', from: true },
      { n: 'Coloration + mèches + brushing — cheveux mi-longs', d: '3h', p: '100 €', from: true },
      { n: 'Coloration + mèches + brushing — cheveux longs', d: '3h30', p: '100 €', from: true },
      { n: 'Coloration + mèches + coupe brushing — cheveux courts', d: '2h15', p: '100 €', from: true },
      { n: 'Coloration + mèches + coupe brushing — cheveux mi-longs', d: '3h', p: '135 €', from: true },
    ],
  },
  {
    group: 'Permanente',
    rows: [
      { n: 'Permanente — cheveux courts', d: '1h30', p: '55 €', from: true },
      { n: 'Permanente — cheveux mi-longs', d: '1h30', p: '60 €', from: true },
      { n: 'Permanente — cheveux longs', d: '2h', p: '70 €', from: true },
      { n: 'Permanente + coupe — cheveux courts', d: '1h30', p: '70 €', from: true },
      { n: 'Permanente + coupe — cheveux mi-longs', d: '1h30', p: '80 €', from: true },
    ],
  },
  {
    group: 'Homme',
    rows: [
      { n: 'Coupe homme', d: '30 min', p: '23 €' },
      { n: 'Barbe', d: '30 min', p: '10 €', from: true },
      { n: 'Forfait shampooing + coupe + traçage/barbe', d: '45 min', p: '32 €' },
    ],
  },
  {
    group: 'Enfants',
    rows: [
      { n: 'Shampoing + coupe enfant — 10 ans, garçon', d: '30 min', p: '18 €' },
      { n: 'Shampoing + coupe enfant — 10 ans, fille', d: '30 min', p: '30 €' },
    ],
  },
  {
    group: 'Lissage & soins YBERA',
    rows: [
      { n: 'Lissage YBERA', d: '3h', p: '150 €', from: true },
      { n: 'Soin bot Express YBERA', d: '45 min', p: '40 €', from: true },
      { n: 'Soin bot Profond YBERA', d: '2h30', p: '90 €', from: true },
    ],
  },
  {
    group: 'À la carte',
    rows: [
      { n: 'Chignon et coiffure création', d: '30 min', p: 'Sur devis' },
      { n: 'Forfait mariée', d: '2h', p: 'Sur devis' },
      { n: 'Extension', d: '30 min', p: 'Sur devis' },
      { n: 'Supplément patine', d: '20 min', p: '18 €' },
    ],
  },
]

// Avis réels publiés sur la fiche Planity du salon.
// Planity affiche les avis sans nom d'auteur : on ne remplace donc PAS par des
// prénoms inventés — la note et la date suffisent à établir l'authenticité.
export const REVIEWS = [
  {
    rating: 5,
    date: '24/07/2026',
    text: "2eme année que je viens pendant mon séjour en cure. Elodie est une coiffeuse très agréable et très compétente. Elle sait tout de suite ce qu'il faut à vos cheveux et vous fait une coupe au top !",
  },
  {
    rating: 5,
    date: '25/06/2026',
    text: "Merci Élo au top comme d'hab. Sab",
  },
  {
    rating: 5,
    date: '20/06/2026',
    text: 'Toujours très satisfaite, merci Elodie pour tous les conseils.',
  },
  {
    rating: 5,
    date: '14/06/2026',
    text: 'Superbe coiffeuse, très professionnelle et coup de ciseau magique. Merci beaucoup.',
  },
  {
    rating: 5,
    date: '07/06/2026',
    text: 'Très bon accueil, très satisfaite de la prestation. Je recommande ce salon.',
  },
  {
    rating: 5,
    date: '05/06/2026',
    text: "Elodie sait accueillir avec le sourire ! Elle est énergique et à l'écoute des souhaits, on sent tout de suite son professionnalisme. De plus elle connaît sa région en donnant de très bons conseils.",
  },
  {
    rating: 5,
    date: '04/06/2026',
    text: "Comme d'habitude rien à dire, sauf qu'Élodie nous reçoit toujours avec le sourire, ponctuelle. Toujours contente quand je sors du salon, prestation à la hauteur de mes attentes, je recommande à 100 %.",
  },
  {
    rating: 4.8,
    date: '06/06/2026',
    text: 'Parfait.',
  },
]

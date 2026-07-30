// Données réelles du salon (source : fiche Planity)
export const SALON = {
  name: 'Madame Monsieur',
  tagline: 'Salon de coiffure · Gréoux-les-Bains',
  city: 'Gréoux-les-Bains',
  region: 'Provence · Alpes-de-Haute-Provence',
  address: 'Av. des Marronniers, 04800 Gréoux-les-Bains',
  hours: [
    { d: 'Mardi — Samedi', h: '9h00 – 18h00', closed: false },
    { d: 'Dimanche', h: 'Fermé', closed: true },
    { d: 'Lundi', h: 'Fermé', closed: true },
  ],
  rating: '4,9',
  reviews: 185,
  stylist: 'Elodie',
  experience: 20,
  mapsQuery: 'Av.+des+Marronniers+04800+Gréoux-les-Bains',
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
      { n: 'Brushing', p: '16 – 40 €' },
      { n: 'Coupe + brushing', p: '35 – 45 €' },
      { n: 'Permanente', p: '55 – 70 €' },
    ],
  },
  {
    key: 'couleur',
    title: 'Couleur & Balayage',
    icon: 'Sparkles',
    desc: 'La signature du salon : colorations lumineuses et balayages contemporains.',
    items: [
      { n: 'Coloration', p: 'dès 64 €' },
      { n: 'Mèches / Balayage', p: 'dès 76 €' },
    ],
  },
  {
    key: 'homme',
    title: 'Homme',
    icon: 'User',
    desc: 'Coupes nettes et barbe précise, shampooing inclus.',
    items: [
      { n: 'Coupe (shampooing)', p: '23 €' },
      { n: 'Taille de barbe', p: 'dès 10 €' },
      { n: 'Coupe enfant', p: '18 – 30 €' },
    ],
  },
  {
    key: 'soins',
    title: 'Soins & Lissage',
    icon: 'Droplet',
    desc: 'Le lissage brésilien YBERA pour une chevelure souple et éclatante.',
    items: [
      { n: 'Lissage YBERA', p: '40 – 150 €' },
      { n: 'Sur devis', p: 'mariage, chignon' },
    ],
  },
]

// Tarifs détaillés (deux colonnes)
export const PRICING = {
  femme: [
    { n: 'Brushing', p: '16 à 40 €' },
    { n: 'Coupe + brushing', p: '35 à 45 €' },
    { n: 'Coloration', p: 'dès 64 € · 80 €' },
    { n: 'Mèches / Balayage', p: 'dès 76 € · 114 €' },
    { n: 'Permanente', p: '55 à 70 €' },
    { n: 'Lissage brésilien YBERA', p: '40 à 150 €' },
  ],
  homme: [
    { n: 'Coupe homme', sub: 'shampooing inclus', p: '23 €' },
    { n: 'Taille de barbe', p: 'dès 10 €' },
    { n: 'Coupe enfant', p: '18 à 30 €' },
  ],
}

export const REVIEWS = [
  {
    name: 'Sophie M.',
    city: 'Gréoux-les-Bains',
    text: "Un accueil chaleureux et un vrai sens du conseil. Mon balayage est sublime et tellement naturel. Je ne vais plus ailleurs.",
  },
  {
    name: 'Christine D.',
    city: 'Valensole',
    text: "Toujours à l'écoute, ponctuelle et d'un professionnalisme rare. On se sent vraiment comme à la maison.",
  },
  {
    name: 'Laurent P.',
    city: 'Manosque',
    text: "Salon adorable et ambiance familiale. Coupe homme impeccable et barbe soignée. Un vrai moment de détente.",
  },
  {
    name: 'Nadia B.',
    city: 'Vinon-sur-Verdon',
    text: "Elodie a compris exactement ce que je voulais. Couleur lumineuse qui tient dans le temps. Je recommande les yeux fermés.",
  },
  {
    name: 'Émilie R.',
    city: 'Gréoux-les-Bains',
    text: "Le lissage a transformé mes cheveux. Résultat naturel et durable, avec des conseils d'entretien précieux.",
  },
]

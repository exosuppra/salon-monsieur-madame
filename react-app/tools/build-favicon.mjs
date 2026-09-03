/**
 * Fabrique le favicon du site à partir du « M » de Caveat, la police manuscrite
 * du logo — l'icône de l'onglet reprend ainsi l'identité du salon.
 *
 * Le contour de la lettre est figé dans le SVG (voir tools/glyph-path.py) : la
 * police n'a pas besoin d'être chargée pour que l'icône s'affiche.
 *
 * Produit dans public/ :
 *   favicon.ico          16 + 32 + 48 px — demandé d'office par les navigateurs
 *   favicon.svg          vectoriel, utilisé par les navigateurs récents
 *   apple-touch-icon.png 180 px — écran d'accueil iOS
 *   icon-192.png / icon-512.png + site.webmanifest — Android
 *
 * Usage : node tools/build-favicon.mjs
 */
import fs from 'fs'
import path from 'path'
import { execFileSync } from 'child_process'
import sharp from 'sharp'

const OUT = 'public'
const FONT_DIR = path.join(OUT, 'fonts')

// Couleurs de la charte (voir tailwind.config.js)
const FOND = '#9E5231'   // terracotta-deep
const LETTRE = '#FBF6EF' // crème

const CANVAS = 512
const RADIUS = 112       // coins arrondis, dans l'esprit des cartes du site

// Caveat est une écriture au pinceau : ses déliés disparaissent à 16 px, la
// taille à laquelle le favicon est justement le plus vu. On produit donc deux
// variantes — une épaissie et agrandie pour l'icône d'onglet, une plus fine et
// fidèle pour les grands formats, où la finesse du trait fait tout le charme.
const PETIT = { taille: 0.70, trait: 18 }  // 16 / 32 / 48 px
const GRAND = { taille: 0.62, trait: 6 }   // SVG, écran d'accueil, Android

const caveat = fs.readdirSync(FONT_DIR).find((f) => f.startsWith('caveat-'))
if (!caveat) throw new Error('Police Caveat introuvable — lancer « node tools/build-fonts.mjs » d\'abord.')

const g = JSON.parse(
  execFileSync('python', ['tools/glyph-path.py', path.join(FONT_DIR, caveat), 'M', '700'], { encoding: 'utf8' }),
)

// Les polices ont l'axe Y vers le haut, le SVG vers le bas : d'où le scale négatif.
const largeur = g.xMax - g.xMin
const hauteur = g.yMax - g.yMin
const cx = (g.xMin + g.xMax) / 2
const cy = (g.yMin + g.yMax) / 2

function dessine({ taille, trait }) {
  const echelle = (CANVAS * taille) / Math.max(largeur, hauteur)
  const transform = `translate(${CANVAS / 2} ${CANVAS / 2}) scale(${echelle.toFixed(5)} ${(-echelle).toFixed(5)}) translate(${-cx} ${-cy})`
  // Le trait est exprimé en pixels du carré : on le reconvertit en unités de police.
  const contour = trait
    ? ` stroke="${LETTRE}" stroke-width="${(trait / echelle).toFixed(2)}" stroke-linejoin="round" stroke-linecap="round"`
    : ''
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${CANVAS} ${CANVAS}" role="img" aria-label="Madame Monsieur">
  <rect width="${CANVAS}" height="${CANVAS}" rx="${RADIUS}" fill="${FOND}"/>
  <path transform="${transform}" fill="${LETTRE}"${contour} d="${g.path}"/>
</svg>
`
}

const svgGrand = dessine(GRAND)
const svgPetit = dessine(PETIT)

fs.writeFileSync(path.join(OUT, 'favicon.svg'), svgGrand)

const png = (size, svg = svgGrand) =>
  sharp(Buffer.from(svg), { density: 384 }).resize(size, size).png({ compressionLevel: 9 }).toBuffer()

// --- PNG ---
for (const [size, name] of [[180, 'apple-touch-icon.png'], [192, 'icon-192.png'], [512, 'icon-512.png']]) {
  fs.writeFileSync(path.join(OUT, name), await png(size))
}

// --- ICO (conteneur simple : en-tête + table + PNG bruts) ---
const tailles = [16, 32, 48]
const images = await Promise.all(tailles.map((t) => png(t, svgPetit)))

const entete = Buffer.alloc(6)
entete.writeUInt16LE(0, 0)              // réservé
entete.writeUInt16LE(1, 2)              // type 1 = icône
entete.writeUInt16LE(tailles.length, 4)

let offset = 6 + tailles.length * 16
const table = tailles.map((taille, i) => {
  const e = Buffer.alloc(16)
  e.writeUInt8(taille === 256 ? 0 : taille, 0) // largeur
  e.writeUInt8(taille === 256 ? 0 : taille, 1) // hauteur
  e.writeUInt8(0, 2)                           // palette
  e.writeUInt8(0, 3)                           // réservé
  e.writeUInt16LE(1, 4)                        // plans
  e.writeUInt16LE(32, 6)                       // bits par pixel
  e.writeUInt32LE(images[i].length, 8)
  e.writeUInt32LE(offset, 12)
  offset += images[i].length
  return e
})

fs.writeFileSync(path.join(OUT, 'favicon.ico'), Buffer.concat([entete, ...table, ...images]))

// --- Manifeste Android ---
fs.writeFileSync(path.join(OUT, 'site.webmanifest'), JSON.stringify({
  name: 'Madame Monsieur — Coiffeur à Gréoux-les-Bains',
  short_name: 'Madame Monsieur',
  icons: [
    { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
  ],
  theme_color: FOND,
  background_color: '#F3EBDF',
  display: 'browser',
  start_url: '/',
}, null, 2) + '\n')

const ko = (f) => (fs.statSync(path.join(OUT, f)).size / 1024).toFixed(1)
for (const f of ['favicon.ico', 'favicon.svg', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'site.webmanifest']) {
  console.log(`${f.padEnd(22)} ${ko(f).padStart(6)} Ko`)
}

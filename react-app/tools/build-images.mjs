/**
 * Génère les déclinaisons responsives des photos dans public/photos/opt/.
 * Pour chaque source : AVIF + WebP en plusieurs largeurs, plus un JPEG de repli.
 * Écrit aussi src/generated/images.json (largeur/hauteur natives) pour que le
 * markup puisse réserver la place exacte et éviter tout décalage (CLS).
 *
 * Usage : node tools/build-images.mjs
 */
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const SRC = 'public/photos'
const OUT = path.join(SRC, 'opt')
const MANIFEST = 'src/generated/images.json'

// Largeurs couvrant mobile (1x/2x), tablette et desktop.
const WIDTHS = [320, 420, 540, 680, 840, 1040, 1280, 1400]

fs.rmSync(OUT, { recursive: true, force: true })
fs.mkdirSync(OUT, { recursive: true })
fs.mkdirSync(path.dirname(MANIFEST), { recursive: true })

const manifest = {}
let before = 0
let after = 0

const sources = fs.readdirSync(SRC).filter((f) => /\.jpe?g$/i.test(f))

for (const file of sources) {
  const full = path.join(SRC, file)
  const base = file.replace(/\.jpe?g$/i, '')
  const meta = await sharp(full).metadata()
  before += fs.statSync(full).size

  // On ne suragrandit jamais la source.
  const widths = WIDTHS.filter((w) => w <= meta.width)
  if (!widths.includes(meta.width) && widths.length === 0) widths.push(meta.width)

  const entry = { width: meta.width, height: meta.height, ratio: +(meta.width / meta.height).toFixed(4), widths, avif: {}, webp: {}, fallback: '' }

  for (const w of widths) {
    const pipe = sharp(full).resize({ width: w, withoutEnlargement: true })
    const avif = path.join(OUT, `${base}-${w}.avif`)
    const webp = path.join(OUT, `${base}-${w}.webp`)
    await pipe.clone().avif({ quality: 55, effort: 6 }).toFile(avif)
    await pipe.clone().webp({ quality: 74, effort: 6 }).toFile(webp)
    entry.avif[w] = `photos/opt/${base}-${w}.avif`
    entry.webp[w] = `photos/opt/${base}-${w}.webp`
    after += fs.statSync(avif).size + fs.statSync(webp).size
  }

  // Repli JPEG pour les très vieux navigateurs, à une largeur intermédiaire.
  const fbWidth = widths.includes(760) ? 760 : widths[widths.length - 1]
  const fb = path.join(OUT, `${base}-${fbWidth}.jpg`)
  await sharp(full).resize({ width: fbWidth, withoutEnlargement: true }).jpeg({ quality: 78, mozjpeg: true }).toFile(fb)
  entry.fallback = `photos/opt/${base}-${fbWidth}.jpg`
  entry.fallbackWidth = fbWidth
  after += fs.statSync(fb).size

  manifest[file] = entry
  const largest = Math.max(...widths)
  console.log(
    `${file.padEnd(36)} ${(fs.statSync(full).size / 1024).toFixed(0).padStart(4)} KB` +
    ` -> AVIF ${largest}px ${(fs.statSync(path.join(OUT, `${base}-${largest}.avif`)).size / 1024).toFixed(0).padStart(3)} KB`,
  )
}

fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2))
console.log(`\n${sources.length} photos · sources ${(before / 1024).toFixed(0)} KB · variantes générées ${(after / 1024).toFixed(0)} KB`)
console.log(`Manifeste : ${MANIFEST}`)

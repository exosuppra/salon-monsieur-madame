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
import crypto from 'crypto'
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

  // Les fichiers portent une empreinte de leur contenu : servis avec un cache
  // d'un an, ils doivent changer d'adresse quand la photo change — sinon la
  // nouvelle version ne serait jamais distribuee.
  const emit = async (buffer, ext) => {
    const hash = crypto.createHash('sha256').update(buffer).digest('hex').slice(0, 8)
    const name = `${base}-${hash}.${ext}`
    fs.writeFileSync(path.join(OUT, name), buffer)
    after += buffer.length
    return `photos/opt/${name}`
  }

  for (const w of widths) {
    const pipe = sharp(full).resize({ width: w, withoutEnlargement: true })
    entry.avif[w] = await emit(await pipe.clone().avif({ quality: 55, effort: 6 }).toBuffer(), 'avif')
    entry.webp[w] = await emit(await pipe.clone().webp({ quality: 74, effort: 6 }).toBuffer(), 'webp')
  }

  // Repli JPEG pour les très vieux navigateurs, à une largeur intermédiaire.
  const fbWidth = widths.includes(680) ? 680 : widths[widths.length - 1]
  entry.fallback = await emit(
    await sharp(full).resize({ width: fbWidth, withoutEnlargement: true }).jpeg({ quality: 78, mozjpeg: true }).toBuffer(),
    'jpg',
  )
  entry.fallbackWidth = fbWidth

  manifest[file] = entry
  const largest = Math.max(...widths)
  const largestFile = path.join(OUT, path.basename(entry.avif[largest]))
  console.log(
    `${file.padEnd(36)} ${(fs.statSync(full).size / 1024).toFixed(0).padStart(4)} KB` +
    ` -> AVIF ${largest}px ${(fs.statSync(largestFile).size / 1024).toFixed(0).padStart(3)} KB`,
  )
}

fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2))
console.log(`\n${sources.length} photos · sources ${(before / 1024).toFixed(0)} KB · variantes générées ${(after / 1024).toFixed(0)} KB`)
console.log(`Manifeste : ${MANIFEST}`)

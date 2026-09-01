/**
 * Génère les polices auto-hébergées dans public/fonts/.
 * Récupère les fichiers variables chez Google, les fige aux graisses réellement
 * utilisées, et les réduit au jeu de caractères français.
 *
 * Prérequis : python + `pip install "fonttools[woff]" brotli`
 * Usage     : node tools/build-fonts.mjs
 */
import fs from 'fs'
import path from 'path'
import { execFileSync } from 'child_process'

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36'
const OUT = 'public/fonts'
const TMP = path.join(OUT, '_tmp')

// Latin de base + accents français + ponctuation typographique + € et ★
const UNICODES = [
  'U+0020-007E', 'U+00A0-00FF', 'U+0152-0153', 'U+0178', 'U+2013-2014',
  'U+2018-201A', 'U+201C-201E', 'U+2026', 'U+2030', 'U+2039-203A',
  'U+20AC', 'U+2122', 'U+2605',
].join(',')

// Une entrée par fichier .woff2 produit.
//   pin      : axes figés (réduit fortement le poids)
//   features : `calt` est indispensable à Caveat (alternances manuscrites)
const FONTS = [
  { family: 'Caveat', file: 'caveat-normal', style: 'normal', weight: '600 700',
    query: 'family=Caveat:wght@600..700', pin: { wght: '600:700' }, features: 'kern,liga,calt' },

  { family: 'Karla', file: 'karla-normal', style: 'normal', weight: '400 700',
    query: 'family=Karla:wght@400..700', pin: {}, features: 'kern,liga' },

  { family: 'Newsreader', file: 'newsreader-400-normal', style: 'normal', weight: '400',
    query: 'family=Newsreader:opsz,wght@6..72,400', pin: { opsz: '16', wght: '400' }, features: 'kern,liga' },

  { family: 'Newsreader', file: 'newsreader-500-normal', style: 'normal', weight: '500',
    query: 'family=Newsreader:opsz,wght@6..72,500', pin: { opsz: '16', wght: '500' }, features: 'kern,liga' },

  { family: 'Newsreader', file: 'newsreader-400-italic', style: 'italic', weight: '400',
    query: 'family=Newsreader:ital,opsz,wght@1,6..72,400', pin: { opsz: '16' }, features: 'kern,liga' },
]

const py = (...args) => execFileSync('python', ['-m', ...args], { stdio: 'pipe' })
const kb = (f) => fs.statSync(f).size / 1024

async function fetchLatinWoff2(query, dest) {
  const css = await fetch(`https://fonts.googleapis.com/css2?${query}&display=swap`, { headers: { 'User-Agent': UA } }).then((r) => r.text())
  const block = ('/*' + css).split('/*').map((b) => '/*' + b)
    .find((b) => /\/\*\s*latin\s*\*\//.test(b) && /url\(/.test(b))
  if (!block) throw new Error(`Pas de sous-ensemble latin pour ${query}`)
  const url = block.match(/url\((https:\/\/[^)]+\.woff2)\)/)[1]
  fs.writeFileSync(dest, Buffer.from(await fetch(url, { headers: { 'User-Agent': UA } }).then((r) => r.arrayBuffer())))
}

fs.rmSync(OUT, { recursive: true, force: true })
fs.mkdirSync(TMP, { recursive: true })

const fallbackDone = new Set()
let css = '/* Polices auto-hébergées. Généré par tools/build-fonts.mjs — ne pas éditer à la main. */\n'
let before = 0

for (const f of FONTS) {
  const raw = path.join(TMP, `${f.file}.src.woff2`)
  await fetchLatinWoff2(f.query, raw)
  before += kb(raw)

  // Google sert parfois une police déjà statique : on ne fige que les axes présents.
  const present = execFileSync('python', ['tools/read-axes.py', raw], { encoding: 'utf8' }).trim().split(',').filter(Boolean)
  let input = raw
  const axes = Object.entries(f.pin).filter(([k]) => present.includes(k)).map(([k, v]) => `${k}=${v}`)
  if (axes.length) {
    const pinned = path.join(TMP, `${f.file}.pinned.ttf`)
    py('fontTools.varLib.instancer', input, ...axes, '-o', pinned)
    input = pinned
  }

  const out = path.join(OUT, `${f.file}.woff2`)
  py('fontTools.subset', input, `--unicodes=${UNICODES}`, '--flavor=woff2',
    `--layout-features=${f.features}`, '--desubroutinize', `--output-file=${out}`)

  css += `@font-face{font-family:'${f.family}';font-style:${f.style};font-weight:${f.weight};`
       + `font-display:swap;src:url('/fonts/${f.file}.woff2') format('woff2');}\n`
  console.log(`${f.file.padEnd(24)} ${kb(raw).toFixed(1).padStart(6)} KB -> ${kb(out).toFixed(1).padStart(6)} KB`)

  // Police de repli aux mêmes métriques que la police définitive.
  // Sans cela, le texte change de largeur au moment du remplacement et la mise
  // en page « saute » : c'est exactement ce que Google pénalise sous le nom CLS.
  //
  // Un repli par famille ET par style : l'italique d'une police est nettement
  // plus étroit que son romain, un repli commun ferait retomber le problème.
  const key = `${f.family}|${f.style}`
  if (!fallbackDone.has(key)) {
    fallbackDone.add(key)
    const m = JSON.parse(execFileSync('python', ['tools/font-metrics.py', out], { encoding: 'utf8' }))
    css += `@font-face{font-family:'${f.family} Fallback';font-style:${f.style};`
         + `src:local('Arial'),local('Helvetica'),local('Roboto');`
         + `size-adjust:${m.sizeAdjust}%;ascent-override:${m.ascentOverride}%;`
         + `descent-override:${m.descentOverride}%;line-gap-override:${m.lineGapOverride}%;}\n`
    console.log(`  └─ repli « ${f.family} Fallback » ${f.style} — size-adjust ${m.sizeAdjust}%`)
  }
}

fs.rmSync(TMP, { recursive: true, force: true })

// Les @font-face sont injectés directement dans index.html : aucune requête CSS
// supplémentaire sur le chemin critique. Caveat porte le h1 (l'élément LCP mesuré
// par Lighthouse), on le précharge donc explicitement.
// %BASE_URL% est résolu par Vite : le site fonctionne à la racine du domaine
// comme dans un sous-dossier GitHub Pages.
// Les polices visibles sans défilement sont préchargées : elles arrivent avant
// que React n'ait fini de peindre la page, donc le texte s'affiche directement
// dans sa police définitive — pas de remplacement, donc pas de « saut » (CLS).
//   caveat            : titre principal + logo
//   newsreader italic : paragraphe d'accroche
//   karla             : pastille d'avis, boutons, petites mentions
const PRELOAD = ['caveat-normal', 'newsreader-400-italic', 'karla-normal']

const faces = css
  .split('\n')
  .filter((l) => l.startsWith('@font-face'))
  .map((l) => '      ' + l.replace(/url\('\/fonts\//g, "url('%BASE_URL%fonts/"))

const injected = [
  ...PRELOAD.map((f) => `    <link rel="preload" href="%BASE_URL%fonts/${f}.woff2" as="font" type="font/woff2" crossorigin />`),
  '    <style>',
  ...faces,
  '    </style>',
].join('\n')

const HTML = 'index.html'
const html = fs.readFileSync(HTML, 'utf8')
const marked = html.replace(
  /( *<!-- FONTS:START -->)[\s\S]*?( *<!-- FONTS:END -->)/,
  `$1\n${injected}\n$2`,
)
if (!/<!-- FONTS:START -->/.test(html) || !/<!-- FONTS:END -->/.test(html)) {
  throw new Error('Marqueurs FONTS:START / FONTS:END absents de index.html')
}
fs.writeFileSync(HTML, marked)

const after = fs.readdirSync(OUT).filter((f) => f.endsWith('.woff2')).reduce((a, f) => a + kb(path.join(OUT, f)), 0)
console.log(`\nTotal : ${before.toFixed(1)} KB -> ${after.toFixed(1)} KB`)
console.log('index.html mis à jour (bloc FONTS).')

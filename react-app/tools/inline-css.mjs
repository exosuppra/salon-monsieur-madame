/**
 * Intègre la feuille de style dans le HTML après le build.
 *
 * Le navigateur ne peut rien afficher tant qu'il n'a pas reçu le CSS. Tant qu'il
 * s'agit d'un fichier séparé, cela coûte un aller-retour réseau complet avant le
 * premier pixel. Comme la feuille est petite (~8 Ko compressée), on la place
 * directement dans la page : l'affichage démarre dès la réception du HTML.
 *
 * Lancé automatiquement après `vite build` (voir package.json).
 * Au-delà de MAX_INLINE, on laisse le fichier externe : l'intégrer coûterait
 * plus cher que l'aller-retour économisé.
 */
import fs from 'fs'
import path from 'path'

const DIST = 'dist'
const HTML = path.join(DIST, 'index.html')
const MAX_INLINE = 60 * 1024

const html = fs.readFileSync(HTML, 'utf8')
const link = html.match(/\s*<link rel="stylesheet"[^>]*href="([^"]+\.css)"[^>]*>/)

if (!link) {
  console.log('inline-css : aucune feuille externe à intégrer.')
  process.exit(0)
}

const cssPath = path.join(DIST, link[1].replace(/^\//, ''))
const css = fs.readFileSync(cssPath, 'utf8')

if (css.length > MAX_INLINE) {
  console.log(`inline-css : feuille trop volumineuse (${(css.length / 1024).toFixed(1)} Ko), laissée en fichier externe.`)
  process.exit(0)
}

// `$` a un sens particulier dans les remplacements : on passe par une fonction.
const out = html.replace(link[0], () => `\n    <style>${css}</style>`)
fs.writeFileSync(HTML, out)
fs.rmSync(cssPath, { force: true })

console.log(`inline-css : ${(css.length / 1024).toFixed(1)} Ko intégrés — une requête bloquante en moins.`)

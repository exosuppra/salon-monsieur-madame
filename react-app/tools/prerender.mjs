/**
 * Écrit le HTML de la page d'accueil directement dans dist/index.html.
 *
 * Sans cela, le navigateur reçoit une page vide et doit télécharger puis
 * exécuter ~230 Ko de JavaScript avant d'afficher le moindre mot : c'est ce qui
 * maintenait le délai d'affichage du grand titre autour de 2,2 s sur mobile.
 * Avec le prérendu, le titre et les photos sont dans la page dès la première
 * réponse du serveur ; le JavaScript ne sert plus qu'à rendre la page
 * interactive, en arrière-plan.
 *
 * Déroulé : compile src/entry-server.jsx pour Node, l'exécute, injecte le
 * résultat dans <div id="root">.
 *
 * Lancé automatiquement par `npm run build`.
 */
import fs from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'
import { build } from 'vite'

const DIST = 'dist'
const SSR_OUT = path.join('node_modules', '.prerender')
const HTML = path.join(DIST, 'index.html')

// 1. Compiler le rendu serveur (jamais envoyé au visiteur).
await build({
  logLevel: 'error',
  build: {
    ssr: 'src/entry-server.jsx',
    outDir: SSR_OUT,
    emptyOutDir: true,
    rollupOptions: { output: { entryFileNames: 'entry-server.mjs' } },
  },
})

// 2. Produire le HTML.
const { render } = await import(pathToFileURL(path.resolve(SSR_OUT, 'entry-server.mjs')).href)
const body = render('/')

// 3. L'injecter dans la page.
const html = fs.readFileSync(HTML, 'utf8')
const ROOT = /(<div id="root">)(\s*)(<\/div>)/

if (!ROOT.test(html)) {
  throw new Error('prerender : <div id="root"></div> introuvable dans dist/index.html')
}
if (!body.trim()) {
  throw new Error('prerender : le rendu serveur est vide — vérifier src/entry-server.jsx')
}

// `$` a un sens particulier dans les remplacements : on passe par une fonction.
let out = html.replace(ROOT, () => `<div id="root">${body}</div>`)

// La page étant désormais complète dans le HTML, le JavaScript ne sert plus
// qu'à la rendre interactive : il n'a aucune raison de se disputer la bande
// passante avec les polices et la photo du haut de page, qui, eux, sont
// nécessaires à l'affichage.
//
// On retire donc le `modulepreload` du script d'entrée (que Vite ajoute en
// priorité haute) et on le passe explicitement en priorité basse. Les liens du
// site sont de vrais liens : réserver et téléphoner fonctionnent avant même que
// le JavaScript soit chargé.
const entry = out.match(/<script type="module"[^>]*src="([^"]+)"[^>]*>/)
if (entry) {
  out = out.replace(new RegExp(`\\s*<link rel="modulepreload"[^>]*href="${entry[1]}"[^>]*>`), '')
  out = out.replace(entry[0], entry[0].replace('<script ', '<script fetchpriority="low" '))
}

fs.writeFileSync(HTML, out)
fs.rmSync(SSR_OUT, { recursive: true, force: true })

const kb = (n) => (n / 1024).toFixed(1)
console.log(`prerender : ${kb(body.length)} Ko de HTML injectés — la page s'affiche sans attendre le JavaScript.`)
console.log(`prerender : script d'entrée passé en priorité basse${entry ? '' : ' (script introuvable !)'}`)

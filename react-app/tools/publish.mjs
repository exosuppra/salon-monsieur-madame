/**
 * Recopie le build (`dist/`) vers `app/`, le dossier servi par Cloudflare Pages.
 *
 * `dist/` est ignoré par git ; c'est bien `app/` qui est versionné et publié.
 * Ce script remplace intégralement le contenu de `app/` pour qu'aucun fichier
 * d'une version précédente ne subsiste.
 *
 * Usage : npm run publish   (après `npm run build`)
 */
import fs from 'fs'
import path from 'path'

const DIST = 'dist'
const APP = path.join('..', 'app')

if (!fs.existsSync(path.join(DIST, 'index.html'))) {
  console.error('Erreur : dist/index.html est absent. Lancer « npm run build » d\'abord.')
  process.exit(1)
}

// Garde-fou : le build doit avoir été fait avec VITE_BASE=/ pour Cloudflare.
// Sinon les chemins pointeraient vers /salon-monsieur-madame/app/ (GitHub Pages).
const html = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8')
if (/(src|href)="\/salon-monsieur-madame\//.test(html)) {
  console.error('Erreur : build réalisé avec la base GitHub Pages.')
  console.error('Relancer avec :  VITE_BASE=/ npm run build')
  process.exit(1)
}

fs.rmSync(APP, { recursive: true, force: true })
fs.cpSync(DIST, APP, { recursive: true })

const count = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true })
    .reduce((n, e) => n + (e.isDirectory() ? count(path.join(dir, e.name)) : 1), 0)

console.log(`publish : ${count(APP)} fichiers copiés vers app/`)

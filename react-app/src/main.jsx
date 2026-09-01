import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

const container = document.getElementById('root')

const tree = (
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
)

// Le HTML de la page d'accueil est prérendu à la compilation (voir
// tools/prerender.mjs) : on l'« hydrate » plutôt que de le reconstruire, ce qui
// évite de tout réafficher.
//
// Le prérendu ne concerne que la page d'accueil. Sur les adresses des anciennes
// maquettes (#/eclat, #/signature…), le contenu attendu est différent : on
// repart d'un rendu complet, sinon React signalerait une incohérence.
const hash = window.location.hash.replace(/^#/, '')
const isHome = hash === '' || hash === '/' || hash === '/nuance'
const prerendered = container.hasChildNodes()

if (isHome && prerendered) {
  hydrateRoot(container, tree)
} else {
  container.innerHTML = ''
  createRoot(container).render(tree)
}

import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App.jsx'

/**
 * Point d'entrée utilisé uniquement à la compilation, par tools/prerender.mjs.
 * Produit le HTML de la page d'accueil, qui est ensuite écrit dans index.html.
 *
 * Le visiteur reçoit ainsi une page déjà complète : le titre et les photos
 * s'affichent sans attendre le téléchargement ni l'exécution du JavaScript.
 */
export function render(path = '/') {
  return renderToString(
    <StrictMode>
      <StaticRouter location={path}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
}

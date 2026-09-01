import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Nuance from './pages/Nuance.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

// Nuance est le site final : il reste dans le paquet principal.
// Les anciennes maquettes ne sont téléchargées que si on visite leur adresse,
// ce qui allège d'autant le chargement de la page d'accueil.
const Signature = lazy(() => import('./pages/Signature.jsx'))
const Eclat = lazy(() => import('./pages/Eclat.jsx'))
const Landing = lazy(() => import('./pages/Landing.jsx'))

/**
 * Arbre de l'application, partagé par les deux points d'entrée :
 * - src/main.jsx        : dans le navigateur (HashRouter)
 * - src/entry-server.jsx: à la compilation, pour le prérendu (StaticRouter)
 *
 * Le partage est indispensable : le HTML prérendu et le premier rendu du
 * navigateur doivent être identiques, sinon React rejette l'hydratation et
 * refait tout le travail — ce qui annulerait le bénéfice du prérendu.
 */
export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen bg-lin" />}>
        <Routes>
          {/* Nuance = site final = page d'accueil */}
          <Route path="/" element={<Nuance />} />
          <Route path="/nuance" element={<Nuance />} />
          <Route path="/signature" element={<Signature />} />
          <Route path="/eclat" element={<Eclat />} />
          <Route path="/maquettes" element={<Landing />} />
          <Route path="*" element={<Nuance />} />
        </Routes>
      </Suspense>
    </>
  )
}

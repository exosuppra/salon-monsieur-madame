import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Nuance from './pages/Nuance.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

// Nuance est le site final : il reste dans le paquet principal.
// Les anciennes maquettes ne sont téléchargées que si on visite leur adresse,
// ce qui allège d'autant le chargement de la page d'accueil.
const Signature = lazy(() => import('./pages/Signature.jsx'))
const Eclat = lazy(() => import('./pages/Eclat.jsx'))
const Landing = lazy(() => import('./pages/Landing.jsx'))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
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
    </HashRouter>
  </React.StrictMode>,
)

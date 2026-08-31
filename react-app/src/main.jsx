import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Landing from './pages/Landing.jsx'
import Signature from './pages/Signature.jsx'
import Eclat from './pages/Eclat.jsx'
import Nuance from './pages/Nuance.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <ScrollToTop />
      <Routes>
        {/* Nuance = site final = page d'accueil */}
        <Route path="/" element={<Nuance />} />
        <Route path="/nuance" element={<Nuance />} />
        <Route path="/signature" element={<Signature />} />
        <Route path="/eclat" element={<Eclat />} />
        <Route path="/maquettes" element={<Landing />} />
        <Route path="*" element={<Nuance />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
)

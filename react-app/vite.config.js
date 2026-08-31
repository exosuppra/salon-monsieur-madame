import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base configurable :
//  - GitHub Pages (aperçu)   : défaut « /salon-monsieur-madame/app/ »
//  - Cloudflare Pages (prod) : définir la variable d'env VITE_BASE=/  (racine du domaine)
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || '/salon-monsieur-madame/app/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})

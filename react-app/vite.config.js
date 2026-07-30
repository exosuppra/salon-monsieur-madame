import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Déployé sur GitHub Pages sous /salon-monsieur-madame/app/
export default defineConfig({
  plugins: [react()],
  base: '/salon-monsieur-madame/app/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})

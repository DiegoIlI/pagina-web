import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Ruta base de GitHub Pages: https://<usuario>.github.io/pagina-web/
// Si el repositorio cambia de nombre, cambia SOLO esta constante
// (o define la variable de entorno VITE_BASE al compilar).
const REPO_BASE = '/pagina-web./';

export default defineConfig({
  base: process.env.VITE_BASE || REPO_BASE,
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          gsap: ['gsap', 'gsap/ScrollTrigger'],
        },
      },
    },
  },
});

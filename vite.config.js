import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Use relative paths so the built `dist/index.html` can be opened
  // directly or deployed to GitHub Pages without broken asset links.
  base: './',
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    // allow access from network so mobile devices can load the dev server
    host: true
  }
})

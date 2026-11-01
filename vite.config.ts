import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// BASE_PATH lets the same code run at a site root (cPanel, Netlify: "/")
// or in a subfolder (GitHub Pages: "/negin-choob/")
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
})

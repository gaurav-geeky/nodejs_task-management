import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/', // 👈 make sure it's on its own line
  build: {
    outDir: 'dist', // ensure Render serves from dist
  },
})



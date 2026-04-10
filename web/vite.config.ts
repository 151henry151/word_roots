import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
// Local dev: default base `/` (open http://localhost:5173/). Production: `.env.production` sets `VITE_BASE=/word_roots/` for hromp.com.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const base = env.VITE_BASE || '/'
  return {
    base: base.endsWith('/') ? base : `${base}/`,
    plugins: [react(), tailwindcss()],
  }
})

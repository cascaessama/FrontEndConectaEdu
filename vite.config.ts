// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://conectaedu.onrender.com',
        changeOrigin: true,
        secure: true,
        // remove o /api antes de encaminhar
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})

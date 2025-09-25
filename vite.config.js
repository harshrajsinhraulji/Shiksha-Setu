import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use rolldown bundler via CLI flag when scaffolding; config kept minimal
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})

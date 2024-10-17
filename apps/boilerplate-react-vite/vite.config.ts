import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: "src/**/*.tsx",
    })
  ],
  server: {
    watch: {
      usePolling: true
    }
  }
})

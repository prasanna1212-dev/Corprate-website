import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

 
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  define: {
    global: 'globalThis', // Use globalThis as a polyfill for the `global` variable
  },
  optimizeDeps: {
    include: ['global'], // Ensure Vite includes the global polyfill
  },
  server: {
    host:"localhost",
    port:"3190",
    build: {
      sourcemap: true, // Enable source maps
    },
    proxy:{
      "/api":{
        target:"http://localhost:3190",
        changeOrigin: true
      }
    }
  }
})
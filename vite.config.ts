import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/portfolio/' : '/',
  server: {
    port: 3000,
    host: true, // Allow access from other devices on the network
    strictPort: true, // Ensure the server uses the specified port
    open: true, // Automatically open the browser when the server starts
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  }
}))

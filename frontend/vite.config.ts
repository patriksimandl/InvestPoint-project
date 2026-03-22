import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'


// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const backendUrl = env.VITE_BACKEND_URL || 'http://localhost:3000';
  const port = Number(env.VITE_PORT) || 5000

  return {
  plugins: [
    react(),
    tailwindcss()
  ],
  
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vite.setup.ts', 
    alias: [
      {
        // Make /public-style static imports work in Vitest (e.g. "/logo.png").
        find: /^\/(.*\.(png|jpe?g|svg|webp|gif|ico))$/,
        replacement: path.resolve(__dirname, 'public/$1'),
      },
    ],
  },
  server: {
    allowedHosts: true,
    proxy:{
      /*'/stocks':{
        target:'http://localhost:3000'
      },*/
      '/auth':{
        // target: 'http://localhost:3000'
        target: backendUrl
      }
    },
    port
  }
  }
})

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const backendUrl = env.VITE_BACKEND_URL || 'http://localhost:3000';

  return {
  plugins: [
    react(),
    tailwindcss()
  ],
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
    port: 5000
  }
  }
})

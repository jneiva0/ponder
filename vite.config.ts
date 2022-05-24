import react from '@vitejs/plugin-react'
import { readFileSync } from 'fs'
import { defineConfig, PluginOption } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig(({}) => {
  return {
    server: {
      https: {
        key: readFileSync('./.cert/localhost-key.pem'),
        cert: readFileSync('./.cert/localhost.pem'),
      },
    },
    plugins: [VitePWA({}), react()] as PluginOption[],
  }
})
import react from '@vitejs/plugin-react'
import { defineConfig, PluginOption } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const plugins = [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Ponder',
        short_name: 'Ponder',
        description: 'Organize seus pensamentos.',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
    react(),
  ] as PluginOption[]

  if (command === 'serve') {
    return {
      server: {
        // https: {
        //   key: readFileSync('./.cert/localhost-key.pem'),
        //   cert: readFileSync('./.cert/localhost.pem'),
        // },
      },
      plugins,
    }
  } else {
    return {
      plugins,
    }
  }
})

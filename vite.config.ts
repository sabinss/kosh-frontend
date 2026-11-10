import { defineConfig, loadEnv } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackRouter } from '@tanstack/router-plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Vite does not put .env values into process.env, so read them with loadEnv.
// Set API_SERVER_URL in client/.env (see .env.example).
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiServerUrl = env.API_SERVER_URL || 'http://localhost:5555'

  return {
    resolve: { tsconfigPaths: true },
    server: {
      proxy: {
        // Browser calls /api/auth/login and the server receives the same path,
        // because server/src/app.ts mounts every route under /api.
        '/api': {
          target: apiServerUrl,
          changeOrigin: true,
        },
      },
    },
    plugins: [
      devtools(),
      tailwindcss(),
      tanstackRouter({ target: 'react', autoCodeSplitting: true }),
      viteReact(),
    ],
    // Unit tests run in a fake browser (jsdom) so React components can render.
    test: {
      environment: 'jsdom',
      globals: true, // lets Testing Library clean up the DOM after each test
    },
  }
})

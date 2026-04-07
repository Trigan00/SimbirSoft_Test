import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const footballDataTarget = env.FOOTBALL_DATA_API_URL || 'https://api.football-data.org'
  const footballDataToken = env.FOOTBALL_DATA_TOKEN
  const proxy = {
    '/api/football-data': {
      target: footballDataTarget,
      changeOrigin: true,
      rewrite: (proxyPath: string) => proxyPath.replace(/^\/api\/football-data/, ''),
      headers: footballDataToken
        ? {
            'X-Auth-Token': footballDataToken,
          }
        : undefined,
    },
  }

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      proxy,
    },
    preview: {
      proxy,
    },
  }
})

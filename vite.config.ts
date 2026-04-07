import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const footballDataApiUrl =
    env.FOOTBALL_DATA_API_URL?.trim() || 'https://linguics.pro/api/football-data'

  return {
    define: {
      __APP_CONFIG__: JSON.stringify({
        apiBaseUrl: footballDataApiUrl,
      }),
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})

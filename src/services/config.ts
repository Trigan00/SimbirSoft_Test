const fallbackApiBaseUrl = '/api/football-data'

export const appConfig = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL?.trim() || fallbackApiBaseUrl,
  clientToken: import.meta.env.VITE_FOOTBALL_DATA_TOKEN?.trim() || '',
  cardsPageSize: 12,
  matchesPageSize: 10,
}

export function shouldAttachClientToken() {
  return appConfig.clientToken.length > 0 && /^https?:\/\//.test(appConfig.apiBaseUrl)
}

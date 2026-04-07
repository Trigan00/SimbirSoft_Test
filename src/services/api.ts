import { appConfig, shouldAttachClientToken } from '@/services/config'

interface ApiErrorPayload {
  error?: string
  message?: string
}

export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

function getRequestUrl(path: string, query?: Record<string, string | number | undefined>) {
  const normalizedBase = appConfig.apiBaseUrl.replace(/\/$/, '')
  const url = /^https?:\/\//.test(normalizedBase)
    ? new URL(`${normalizedBase}${path}`)
    : new URL(`${normalizedBase}${path}`, window.location.origin)

  if (!query) {
    return url
  }

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === '') {
      continue
    }

    url.searchParams.set(key, String(value))
  }

  return url
}

function normalizeApiMessage(status: number, payload?: ApiErrorPayload) {
  const sourceMessage = payload?.message || payload?.error || ''
  const loweredMessage = sourceMessage.toLowerCase()

  if (status === 429 || loweredMessage.includes('too many requests') || loweredMessage.includes('rate limit')) {
    return 'Превышен лимит запросов к API. Повторите попытку позже.'
  }

  if (status === 401 || status === 403 || loweredMessage.includes('token') || loweredMessage.includes('permission')) {
    return 'Доступ к API отклонён. Проверьте токен football-data.org и ограничения тарифа.'
  }

  if (status >= 500) {
    return 'Сервис статистики временно недоступен. Повторите попытку позже.'
  }

  return sourceMessage || 'Не удалось получить данные.'
}

export async function fetchJson<T>(
  path: string,
  query?: Record<string, string | number | undefined>,
): Promise<T> {
  const headers = new Headers({
    Accept: 'application/json',
  })

  if (shouldAttachClientToken()) {
    headers.set('X-Auth-Token', appConfig.clientToken)
  }

  const response = await fetch(getRequestUrl(path, query), { headers })
  const contentType = response.headers.get('content-type') || ''
  const payload = contentType.includes('application/json')
    ? ((await response.json()) as T | ApiErrorPayload)
    : undefined

  if (!response.ok) {
    throw new ApiError(
      response.status,
      normalizeApiMessage(response.status, payload as ApiErrorPayload | undefined),
    )
  }

  return payload as T
}

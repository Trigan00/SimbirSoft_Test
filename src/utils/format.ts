import { ApiError } from '@/services/api'
import type { MatchScore, MatchStatus } from '@/types/football'

const statusLabels: Record<string, string> = {
  SCHEDULED: 'Запланирован',
  TIMED: 'Запланирован',
  LIVE: 'В прямом эфире',
  IN_PLAY: 'В игре',
  PAUSED: 'Пауза',
  FINISHED: 'Завершен',
  POSTPONED: 'Отложен',
  SUSPENDED: 'Приостановлен',
  CANCELED: 'Отменен',
  AWARDED: 'Засчитан',
}

function formatScorePart(home: number | null, away: number | null) {
  if (home === null || away === null) {
    return null
  }

  return `${home}:${away}`
}

function getScoreValue(scorePart?: MatchScore['fullTime']) {
  return {
    awayTeam: scorePart?.away ?? scorePart?.awayTeam ?? null,
    homeTeam: scorePart?.home ?? scorePart?.homeTeam ?? null,
  }
}

export function getStatusLabel(status: MatchStatus) {
  return statusLabels[status] || status
}

export function formatScore(score?: MatchScore | null) {
  const fullTimeValue = getScoreValue(score?.fullTime)
  const extraTimeValue = getScoreValue(score?.extraTime)
  const penaltiesValue = getScoreValue(score?.penalties)
  const fullTime = formatScorePart(fullTimeValue.homeTeam, fullTimeValue.awayTeam)
  const extraTime = formatScorePart(extraTimeValue.homeTeam, extraTimeValue.awayTeam)
  const penalties = formatScorePart(penaltiesValue.homeTeam, penaltiesValue.awayTeam)
  const parts = [fullTime, extraTime ? `(${extraTime})` : null, penalties ? `(${penalties})` : null].filter(
    Boolean,
  )

  return parts.length > 0 ? parts.join(' ') : '—'
}

export function getInitials(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('')
}

export function getErrorMessage(error: unknown) {
  if (error instanceof ApiError) {
    return error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Не удалось получить данные.'
}

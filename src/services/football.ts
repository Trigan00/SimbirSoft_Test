import { fetchJson } from '@/services/api'
import type {
  CompetitionListResponse,
  CompetitionMatchesResponse,
  DateRangeParams,
  TeamDetails,
  TeamListResponse,
  TeamMatchesResponse,
} from '@/types/football'

export async function getCompetitions() {
  const response = await fetchJson<CompetitionListResponse>('/v4/competitions')

  return [...response.competitions].sort((left, right) =>
    left.name.localeCompare(right.name, 'ru'),
  )
}

export async function getTeams() {
  const response = await fetchJson<TeamListResponse>('/v4/teams', { limit: 500 })

  return [...response.teams].sort((left, right) => left.name.localeCompare(right.name, 'ru'))
}

export async function getCompetitionMatches(competitionId: string, filters: DateRangeParams) {
  return fetchJson<CompetitionMatchesResponse>(`/v4/competitions/${competitionId}/matches`, {
    limit: 500,
    dateFrom: filters.dateFrom,
    dateTo: filters.dateTo,
  })
}

export async function getTeamDetails(teamId: string) {
  return fetchJson<TeamDetails>(`/v4/teams/${teamId}`)
}

export async function getTeamMatches(teamId: string, filters: DateRangeParams) {
  return fetchJson<TeamMatchesResponse>(`/v4/teams/${teamId}/matches`, {
    limit: 500,
    dateFrom: filters.dateFrom,
    dateTo: filters.dateTo,
  })
}

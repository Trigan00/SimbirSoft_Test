import { useQuery } from '@tanstack/react-query'
import {
  getCompetitionMatches,
  getCompetitions,
  getTeamDetails,
  getTeamMatches,
  getTeams,
} from '@/services/football'
import type { DateRangeParams } from '@/types/football'

export function useCompetitionsQuery() {
  return useQuery({
    queryKey: ['competitions'],
    queryFn: getCompetitions,
  })
}

export function useTeamsQuery() {
  return useQuery({
    queryKey: ['teams'],
    queryFn: getTeams,
  })
}

export function useCompetitionMatchesQuery(
  competitionId: string | undefined,
  filters: DateRangeParams,
) {
  return useQuery({
    queryKey: ['competition-matches', competitionId, filters.dateFrom || '', filters.dateTo || ''],
    queryFn: () => getCompetitionMatches(competitionId!, filters),
    enabled: Boolean(competitionId),
  })
}

export function useTeamDetailsQuery(teamId: string | undefined) {
  return useQuery({
    queryKey: ['team-details', teamId],
    queryFn: () => getTeamDetails(teamId!),
    enabled: Boolean(teamId),
  })
}

export function useTeamMatchesQuery(teamId: string | undefined, filters: DateRangeParams) {
  return useQuery({
    queryKey: ['team-matches', teamId, filters.dateFrom || '', filters.dateTo || ''],
    queryFn: () => getTeamMatches(teamId!, filters),
    enabled: Boolean(teamId),
  })
}

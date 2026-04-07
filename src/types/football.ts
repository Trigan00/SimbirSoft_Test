export interface Area {
  name: string
}

export interface Competition {
  id: number
  name: string
  area: Area
  emblem?: string | null
  type?: string
}

export interface TeamSummary {
  id: number
  name: string
  shortName?: string | null
  crest?: string | null
}

export type TeamDetails = TeamSummary

export interface MatchScoreValue {
  home?: number | null
  away?: number | null
  homeTeam?: number | null
  awayTeam?: number | null
}

export interface MatchScore {
  fullTime?: MatchScoreValue | null
  extraTime?: MatchScoreValue | null
  penalties?: MatchScoreValue | null
}

export type MatchStatus =
  | 'SCHEDULED'
  | 'TIMED'
  | 'LIVE'
  | 'IN_PLAY'
  | 'PAUSED'
  | 'FINISHED'
  | 'POSTPONED'
  | 'SUSPENDED'
  | 'CANCELED'
  | 'AWARDED'
  | 'UNKNOWN'

export interface MatchItem {
  id: number
  utcDate: string
  status: MatchStatus
  homeTeam: TeamSummary
  awayTeam: TeamSummary
  score?: MatchScore | null
}

export interface CompetitionListResponse {
  count: number
  competitions: Competition[]
}

export interface TeamListResponse {
  count: number
  teams: TeamSummary[]
}

export interface CompetitionMatchesResponse {
  count?: number
  competition?: {
    id: number
    name: string
  }
  resultSet?: {
    count: number
  }
  matches: MatchItem[]
}

export interface TeamMatchesResponse {
  count?: number
  resultSet?: {
    count: number
  }
  matches: MatchItem[]
}

export interface DateRangeParams {
  dateFrom?: string
  dateTo?: string
}

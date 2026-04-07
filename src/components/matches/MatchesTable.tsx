import { Box, Paper, Typography } from '@mui/material'
import type { MatchItem } from '@/types/football'
import { formatMatchDate, formatMatchTime } from '@/utils/date'
import { formatScore, getStatusLabel } from '@/utils/format'

interface MatchesTableProps {
  matches: MatchItem[]
}

function getStatusColor(status: MatchItem['status']) {
  if (status === 'LIVE' || status === 'IN_PLAY' || status === 'PAUSED') {
    return 'primary.main'
  }

  if (status === 'POSTPONED' || status === 'SUSPENDED' || status === 'CANCELED') {
    return 'error.main'
  }

  return 'text.secondary'
}

export function MatchesTable({ matches }: MatchesTableProps) {
  return (
    <>
      <Paper
        elevation={0}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          display: { xs: 'none', md: 'block' },
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            color: 'text.primary',
            display: 'grid',
            gap: 2,
            gridTemplateColumns: '130px 80px 130px minmax(260px, 1fr) 120px',
            px: 3,
            py: 2,
          }}
        >
          {['ДД.MM.ГГГГ', 'ЧЧ.ММ', 'Статус', 'Команда А - Команда Б', 'Счёт'].map((label) => (
            <Typography key={label} sx={{ fontSize: 14, fontWeight: 400 }}>
              {label}
            </Typography>
          ))}
        </Box>

        {matches.map((match) => (
          <Box
            key={match.id}
            sx={{
              borderTop: '1px solid',
              borderColor: 'divider',
              display: 'grid',
              gap: 2,
              gridTemplateColumns: '130px 80px 130px minmax(260px, 1fr) 120px',
              px: 3,
              py: 2.5,
            }}
          >
            <Typography sx={{ color: 'text.primary', fontSize: 14 }}>
              {formatMatchDate(match.utcDate)}
            </Typography>
            <Typography sx={{ color: 'text.primary', fontSize: 14 }}>
              {formatMatchTime(match.utcDate)}
            </Typography>
            <Typography sx={{ color: getStatusColor(match.status), fontSize: 14 }}>
              {getStatusLabel(match.status)}
            </Typography>
            <Typography sx={{ color: 'text.primary', fontSize: 14 }}>
              {match.homeTeam.name} - {match.awayTeam.name}
            </Typography>
            <Typography sx={{ color: 'text.primary', fontSize: 14, textAlign: 'right' }}>
              {formatScore(match.score)}
            </Typography>
          </Box>
        ))}
      </Paper>

      <Box sx={{ display: { xs: 'grid', md: 'none' }, gap: 2 }}>
        {matches.map((match) => (
          <Paper
            elevation={0}
            key={match.id}
            sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 2.5 }}
          >
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1.5,
                justifyContent: 'space-between',
                mb: 1.5,
              }}
            >
              <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
                {formatMatchDate(match.utcDate)} • {formatMatchTime(match.utcDate)}
              </Typography>
              <Typography sx={{ color: getStatusColor(match.status), fontSize: 14 }}>
                {getStatusLabel(match.status)}
              </Typography>
            </Box>
            <Typography sx={{ color: 'text.primary', fontSize: 16, fontWeight: 400 }}>
              {match.homeTeam.name} - {match.awayTeam.name}
            </Typography>
            <Typography sx={{ color: 'text.primary', fontSize: 15, mt: 1 }}>
              {formatScore(match.score)}
            </Typography>
          </Paper>
        ))}
      </Box>
    </>
  )
}

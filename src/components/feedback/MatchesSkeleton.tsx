import { Box, Paper, Skeleton } from '@mui/material'

export function MatchesSkeleton() {
  return (
    <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
      <Box
        sx={{
          display: { xs: 'none', md: 'grid' },
          gap: 2,
          gridTemplateColumns: '120px 80px 120px 1fr 120px',
          px: 3,
          py: 2,
        }}
      >
        {Array.from({ length: 5 }, (_, index) => (
          <Skeleton key={index} sx={{ fontSize: '1rem' }} />
        ))}
      </Box>

      {Array.from({ length: 6 }, (_, rowIndex) => (
        <Box
          key={rowIndex}
          sx={{
            borderColor: 'divider',
            borderTop: '1px solid',
            display: 'grid',
            gap: 2,
            gridTemplateColumns: { xs: '1fr', md: '120px 80px 120px 1fr 120px' },
            px: 3,
            py: 2.5,
          }}
        >
          {Array.from({ length: 5 }, (_, cellIndex) => (
            <Skeleton key={cellIndex} sx={{ fontSize: '1rem' }} />
          ))}
        </Box>
      ))}
    </Paper>
  )
}

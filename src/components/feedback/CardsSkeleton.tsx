import { Box, Paper, Skeleton } from '@mui/material'

export function CardsSkeleton() {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: 3,
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, minmax(0, 1fr))',
          lg: 'repeat(4, minmax(0, 1fr))',
        },
      }}
    >
      {Array.from({ length: 8 }, (_, index) => (
        <Paper
          elevation={0}
          key={index}
          sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 2 }}
        >
          <Skeleton
            variant="rounded"
            sx={{ borderRadius: 2, height: { xs: 140, sm: 192 }, width: '100%' }}
          />
          <Skeleton sx={{ fontSize: '1.5rem', mt: 2, mx: 'auto', width: '70%' }} />
          <Skeleton sx={{ fontSize: '1rem', mx: 'auto', width: '40%' }} />
        </Paper>
      ))}
    </Box>
  )
}

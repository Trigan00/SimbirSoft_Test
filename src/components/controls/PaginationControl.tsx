import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import { buildPagination } from '@/utils/pagination'

interface PaginationControlProps {
  page: number
  pageCount: number
  onChange: (page: number) => void
}

export function PaginationControl({ page, pageCount, onChange }: PaginationControlProps) {
  if (pageCount <= 1) {
    return null
  }

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ alignItems: 'center', justifyContent: 'center', mt: 5, flexWrap: 'wrap' }}
    >
      <IconButton
        aria-label="Предыдущая страница"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        size="small"
        sx={{ color: 'text.secondary' }}
      >
        <ChevronLeftRoundedIcon fontSize="small" />
      </IconButton>

      {buildPagination(page, pageCount).map((token, index) => {
        if (typeof token !== 'number') {
          return (
            <Typography
              key={`${token}-${index}`}
              sx={{
                color: 'text.secondary',
                fontFamily: '"Work Sans", "Arial", sans-serif',
                fontSize: 16,
                fontWeight: 600,
                lineHeight: '24px',
                minWidth: 22,
                textAlign: 'center',
              }}
            >
              ...
            </Typography>
          )
        }

        const isActive = token === page

        return (
          <Box
            component="button"
            key={token}
            onClick={() => onChange(token)}
            sx={{
              alignItems: 'center',
              backgroundColor: isActive ? 'primary.main' : 'transparent',
              border: 'none',
              borderRadius: 1.75,
              color: isActive ? 'common.white' : '#9CA3AF',
              cursor: 'pointer',
              display: 'inline-flex',
              fontFamily: '"Ubuntu", "Arial", sans-serif',
              fontSize: 16,
              fontWeight: 700,
              height: 40,
              justifyContent: 'center',
              minWidth: 40,
              transition: 'all 120ms ease',
            }}
            type="button"
          >
            {token}
          </Box>
        )
      })}

      <IconButton
        aria-label="Следующая страница"
        disabled={page === pageCount}
        onClick={() => onChange(page + 1)}
        size="small"
        sx={{ color: 'text.secondary' }}
      >
        <ChevronRightRoundedIcon fontSize="small" />
      </IconButton>
    </Stack>
  )
}

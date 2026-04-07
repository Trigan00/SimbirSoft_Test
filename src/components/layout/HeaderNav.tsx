import SportsSoccerRoundedIcon from '@mui/icons-material/SportsSoccerRounded'
import { Box, Stack, Typography } from '@mui/material'
import { Link as RouterLink, useLocation } from 'react-router-dom'

const navigationItems = [
  { label: 'Лиги', to: '/leagues' },
  { label: 'Команды', to: '/teams' },
]

export function HeaderNav() {
  const location = useLocation()

  return (
    <Box
      component="header"
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
        px: { xs: 2, sm: 3, lg: 4 },
        py: 2.5,
      }}
    >
      <Stack
        direction="row"
        spacing={{ xs: 3, md: 5 }}
        sx={{ alignItems: 'flex-end', flexWrap: 'wrap', rowGap: 2 }}
      >
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', color: 'primary.main' }}>
          <SportsSoccerRoundedIcon sx={{ fontSize: 28 }} />
          <Typography
            sx={{
              color: 'primary.main',
              fontFamily: '"Ubuntu", "Arial", sans-serif',
              fontSize: { xs: 32, md: 38 },
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}
          >
            FIFA
          </Typography>
        </Stack>

        {navigationItems.map((item) => {
          const isActive = location.pathname.startsWith(item.to)

          return (
            <Box
              key={item.to}
              component={RouterLink}
              sx={{ display: 'inline-flex', flexDirection: 'column', gap: 1 }}
              to={item.to}
            >
              <Typography
                sx={{
                  color: 'text.primary',
                  fontFamily: '"Inter", "Arial", sans-serif',
                  fontSize: { xs: 20, md: 25 },
                  fontWeight: 300,
                  lineHeight: 1.2,
                }}
              >
                {item.label}
              </Typography>
              <Box
                sx={{
                  height: 3,
                  width: '100%',
                  borderRadius: 999,
                  backgroundColor: isActive ? 'primary.main' : 'transparent',
                  transition: 'background-color 120ms ease',
                }}
              />
            </Box>
          )
        })}
      </Stack>
    </Box>
  )
}

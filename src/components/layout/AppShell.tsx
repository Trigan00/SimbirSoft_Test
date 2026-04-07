import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { HeaderNav } from '@/components/layout/HeaderNav'

export function AppShell() {
  return (
    <Box sx={{ minHeight: '100vh', px: { xs: 0, lg: 3 }, py: { xs: 0, lg: 4 } }}>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          boxShadow: '0 24px 80px rgba(24, 34, 51, 0.08)',
          marginInline: 'auto',
          maxWidth: 1440,
          minHeight: '100vh',
          overflow: 'hidden',
        }}
      >
        <HeaderNav />
        <Box component="main" sx={{ px: { xs: 2, sm: 3, lg: 9 }, pb: 8, pt: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}

import { CircularProgress, Stack } from '@mui/material'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'

const LeaguesPage = lazy(() =>
  import('@/pages/LeaguesPage').then((module) => ({ default: module.LeaguesPage })),
)
const CompetitionCalendarPage = lazy(() =>
  import('@/pages/CompetitionCalendarPage').then((module) => ({
    default: module.CompetitionCalendarPage,
  })),
)
const TeamsPage = lazy(() =>
  import('@/pages/TeamsPage').then((module) => ({ default: module.TeamsPage })),
)
const TeamCalendarPage = lazy(() =>
  import('@/pages/TeamCalendarPage').then((module) => ({ default: module.TeamCalendarPage })),
)

function RouterFallback() {
  return (
    <Stack sx={{ alignItems: 'center', justifyContent: 'center', minHeight: '40vh' }}>
      <CircularProgress color="primary" />
    </Stack>
  )
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouterFallback />}>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<Navigate replace to="/leagues" />} />
            <Route path="/leagues" element={<LeaguesPage />} />
            <Route path="/leagues/:competitionId" element={<CompetitionCalendarPage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/teams/:teamId" element={<TeamCalendarPage />} />
            <Route path="*" element={<Navigate replace to="/leagues" />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

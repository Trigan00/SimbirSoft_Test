import { useEffect } from 'react'
import { Breadcrumbs, Box, Link, Typography } from '@mui/material'
import { Link as RouterLink, useLocation, useParams } from 'react-router-dom'
import { ContentMessage } from '@/components/feedback/ContentMessage'
import { MatchesSkeleton } from '@/components/feedback/MatchesSkeleton'
import { PaginationControl } from '@/components/controls/PaginationControl'
import { DateRangeFilter } from '@/components/matches/DateRangeFilter'
import { MatchesTable } from '@/components/matches/MatchesTable'
import { useCalendarFilters } from '@/hooks/useCalendarFilters'
import { useCompetitionMatchesQuery } from '@/hooks/useFootballQueries'
import { appConfig } from '@/services/config'
import { hasCompleteDateRange, isValidDateRange } from '@/utils/date'
import { getErrorMessage } from '@/utils/format'
import { getPageCount, paginateItems } from '@/utils/pagination'

type LocationState = {
  title?: string
}

export function CompetitionCalendarPage() {
  const { competitionId } = useParams()
  const location = useLocation()
  const state = location.state as LocationState | null
  const { dateFrom, dateTo, page, setDateFrom, setDateTo, setPage } = useCalendarFilters()
  const shouldApplyFilters = hasCompleteDateRange(dateFrom, dateTo) && isValidDateRange(dateFrom, dateTo)
  const matchesQuery = useCompetitionMatchesQuery(competitionId, {
    dateFrom: shouldApplyFilters ? dateFrom : undefined,
    dateTo: shouldApplyFilters ? dateTo : undefined,
  })

  const matches = matchesQuery.data?.matches || []
  const competitionTitle = matchesQuery.data?.competition?.name || state?.title || 'Лига'
  const pageCount = getPageCount(matches.length, appConfig.matchesPageSize)
  const currentPage = Math.min(page, pageCount)
  const pagedMatches = paginateItems(matches, currentPage, appConfig.matchesPageSize)

  useEffect(() => {
    if (page !== currentPage) {
      setPage(currentPage)
    }
  }, [currentPage, page, setPage])

  return (
    <Box>
      <Breadcrumbs aria-label="Хлебные крошки" sx={{ color: 'text.primary', mb: 4 }}>
        <Link component={RouterLink} sx={{ color: 'text.secondary' }} to="/leagues" underline="hover">
          Лиги
        </Link>
        <Typography sx={{ color: 'text.primary' }}>{competitionTitle}</Typography>
      </Breadcrumbs>

      <DateRangeFilter
        dateFrom={dateFrom}
        dateTo={dateTo}
        onDateFromChange={setDateFrom}
        onDateToChange={setDateTo}
      />

      {matchesQuery.isLoading ? <MatchesSkeleton /> : null}

      {matchesQuery.isError ? (
        <ContentMessage
          actionLabel="Повторить"
          description={getErrorMessage(matchesQuery.error)}
          onAction={() => {
            void matchesQuery.refetch()
          }}
          title="Не удалось загрузить календарь лиги"
        />
      ) : null}

      {!matchesQuery.isLoading && !matchesQuery.isError ? (
        <>
          {matches.length === 0 ? (
            <ContentMessage
              description="Попробуйте изменить диапазон дат или вернуться позже."
              title="Матчи не найдены"
            />
          ) : (
            <>
              <MatchesTable matches={pagedMatches} />
              <PaginationControl onChange={setPage} page={currentPage} pageCount={pageCount} />
            </>
          )}
        </>
      ) : null}
    </Box>
  )
}

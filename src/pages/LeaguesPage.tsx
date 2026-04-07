import { useDeferredValue, useEffect } from 'react'
import { Box } from '@mui/material'
import { EntityCard } from '@/components/cards/EntityCard'
import { CardsSkeleton } from '@/components/feedback/CardsSkeleton'
import { ContentMessage } from '@/components/feedback/ContentMessage'
import { PaginationControl } from '@/components/controls/PaginationControl'
import { SearchField } from '@/components/controls/SearchField'
import { useCollectionFilters } from '@/hooks/useCollectionFilters'
import { useCompetitionsQuery } from '@/hooks/useFootballQueries'
import { appConfig } from '@/services/config'
import { getErrorMessage, getInitials } from '@/utils/format'
import { getPageCount, paginateItems } from '@/utils/pagination'

export function LeaguesPage() {
  const { page, search, setPage, setSearch } = useCollectionFilters()
  const competitionsQuery = useCompetitionsQuery()
  const deferredSearch = useDeferredValue(search.trim().toLowerCase())

  const filteredCompetitions =
    competitionsQuery.data?.filter((competition) => {
      if (!deferredSearch) {
        return true
      }

      return [competition.name, competition.area.name]
        .join(' ')
        .toLowerCase()
        .includes(deferredSearch)
    }) || []

  const pageCount = getPageCount(filteredCompetitions.length, appConfig.cardsPageSize)
  const currentPage = Math.min(page, pageCount)
  const competitions = paginateItems(filteredCompetitions, currentPage, appConfig.cardsPageSize)

  useEffect(() => {
    if (page !== currentPage) {
      setPage(currentPage)
    }
  }, [currentPage, page, setPage])

  return (
    <Box>
      <SearchField placeholder="Поиск по лигам" value={search} onChange={setSearch} />

      <Box sx={{ mt: 5 }}>
        {competitionsQuery.isLoading ? <CardsSkeleton /> : null}

        {competitionsQuery.isError ? (
          <ContentMessage
            actionLabel="Повторить"
            description={getErrorMessage(competitionsQuery.error)}
            onAction={() => {
              void competitionsQuery.refetch()
            }}
            title="Не удалось загрузить список лиг"
          />
        ) : null}

        {!competitionsQuery.isLoading && !competitionsQuery.isError ? (
          <>
            {filteredCompetitions.length === 0 ? (
              <ContentMessage
                description="Попробуйте изменить запрос или очистить строку поиска."
                title="Лиги не найдены"
              />
            ) : (
              <>
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
                  {competitions.map((competition) => (
                    <EntityCard
                      fallbackLabel={getInitials(competition.name)}
                      imageAlt={competition.name}
                      imageUrl={competition.emblem}
                      key={competition.id}
                      state={{ title: competition.name }}
                      subtitle={competition.area.name}
                      title={competition.name}
                      to={`/leagues/${competition.id}`}
                    />
                  ))}
                </Box>
                <PaginationControl onChange={setPage} page={currentPage} pageCount={pageCount} />
              </>
            )}
          </>
        ) : null}
      </Box>
    </Box>
  )
}

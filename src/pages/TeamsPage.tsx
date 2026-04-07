import { useDeferredValue, useEffect } from 'react'
import { Box } from '@mui/material'
import { EntityCard } from '@/components/cards/EntityCard'
import { CardsSkeleton } from '@/components/feedback/CardsSkeleton'
import { ContentMessage } from '@/components/feedback/ContentMessage'
import { PaginationControl } from '@/components/controls/PaginationControl'
import { SearchField } from '@/components/controls/SearchField'
import { useCollectionFilters } from '@/hooks/useCollectionFilters'
import { useTeamsQuery } from '@/hooks/useFootballQueries'
import { appConfig } from '@/services/config'
import { getErrorMessage, getInitials } from '@/utils/format'
import { getPageCount, paginateItems } from '@/utils/pagination'

export function TeamsPage() {
  const { page, search, setPage, setSearch } = useCollectionFilters()
  const teamsQuery = useTeamsQuery()
  const deferredSearch = useDeferredValue(search.trim().toLowerCase())

  const filteredTeams =
    teamsQuery.data?.filter((team) => {
      if (!deferredSearch) {
        return true
      }

      return team.name.toLowerCase().includes(deferredSearch)
    }) || []

  const pageCount = getPageCount(filteredTeams.length, appConfig.cardsPageSize)
  const currentPage = Math.min(page, pageCount)
  const teams = paginateItems(filteredTeams, currentPage, appConfig.cardsPageSize)

  useEffect(() => {
    if (page !== currentPage) {
      setPage(currentPage)
    }
  }, [currentPage, page, setPage])

  return (
    <Box>
      <SearchField placeholder="Поиск по командам" value={search} onChange={setSearch} />

      <Box sx={{ mt: 5 }}>
        {teamsQuery.isLoading ? <CardsSkeleton /> : null}

        {teamsQuery.isError ? (
          <ContentMessage
            actionLabel="Повторить"
            description={getErrorMessage(teamsQuery.error)}
            onAction={() => {
              void teamsQuery.refetch()
            }}
            title="Не удалось загрузить список команд"
          />
        ) : null}

        {!teamsQuery.isLoading && !teamsQuery.isError ? (
          <>
            {filteredTeams.length === 0 ? (
              <ContentMessage
                description="Попробуйте изменить запрос или очистить строку поиска."
                title="Команды не найдены"
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
                  {teams.map((team) => (
                    <EntityCard
                      fallbackLabel={getInitials(team.name)}
                      imageAlt={team.name}
                      imageUrl={team.crest}
                      key={team.id}
                      state={{ title: team.name }}
                      title={team.name}
                      to={`/teams/${team.id}`}
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

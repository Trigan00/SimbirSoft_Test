import { startTransition } from 'react'
import { useSearchParams } from 'react-router-dom'

function toPositivePage(value: string | null) {
  const page = Number(value)

  return Number.isInteger(page) && page > 0 ? page : 1
}

export function useCollectionFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const updateParams = (updates: Record<string, string | undefined>) => {
    startTransition(() => {
      setSearchParams((currentParams) => {
        const nextParams = new URLSearchParams(currentParams)

        for (const [key, value] of Object.entries(updates)) {
          if (!value || (key === 'page' && value === '1')) {
            nextParams.delete(key)
            continue
          }

          nextParams.set(key, value)
        }

        return nextParams
      })
    })
  }

  return {
    page: toPositivePage(searchParams.get('page')),
    search: searchParams.get('q') || '',
    setPage: (page: number) => updateParams({ page: String(page) }),
    setSearch: (search: string) => updateParams({ q: search.trim(), page: '1' }),
  }
}

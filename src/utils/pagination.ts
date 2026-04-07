export type PaginationToken = number | 'ellipsis-left' | 'ellipsis-right'

export function getPageCount(totalItems: number, pageSize: number) {
  return Math.max(1, Math.ceil(totalItems / pageSize))
}

export function paginateItems<T>(items: T[], page: number, pageSize: number) {
  const start = (page - 1) * pageSize

  return items.slice(start, start + pageSize)
}

export function buildPagination(page: number, pageCount: number): PaginationToken[] {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, index) => index + 1)
  }

  if (page <= 4) {
    return [1, 2, 3, 4, 5, 'ellipsis-right', pageCount]
  }

  if (page >= pageCount - 3) {
    return [1, 'ellipsis-left', pageCount - 4, pageCount - 3, pageCount - 2, pageCount - 1, pageCount]
  }

  return [1, 'ellipsis-left', page - 1, page, page + 1, 'ellipsis-right', pageCount]
}

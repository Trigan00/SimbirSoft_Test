import dayjs from 'dayjs'

export function formatMatchDate(utcDate: string) {
  return dayjs.utc(utcDate).local().format('DD.MM.YYYY')
}

export function formatMatchTime(utcDate: string) {
  return dayjs.utc(utcDate).local().format('HH:mm')
}

export function hasCompleteDateRange(dateFrom?: string, dateTo?: string) {
  return Boolean(dateFrom && dateTo)
}

export function isValidDateRange(dateFrom?: string, dateTo?: string) {
  if (!dateFrom || !dateTo) {
    return true
  }

  return dayjs(dateFrom).isSame(dayjs(dateTo)) || dayjs(dateFrom).isBefore(dayjs(dateTo))
}

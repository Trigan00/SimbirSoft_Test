import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import { Alert, Box, Stack, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs, { type Dayjs } from 'dayjs'
import { hasCompleteDateRange, isValidDateRange } from '@/utils/date'

interface DateRangeFilterProps {
  dateFrom?: string
  dateTo?: string
  onDateFromChange: (value: string | undefined) => void
  onDateToChange: (value: string | undefined) => void
}

function toPickerValue(value?: string) {
  return value ? dayjs(value) : null
}

function getNextValue(value: Dayjs | null) {
  return value ? value.format('YYYY-MM-DD') : undefined
}

const pickerStyles = {
  '& .MuiOutlinedInput-root': {
    minHeight: 44,
  },
  '& .MuiOutlinedInput-input': {
    fontFamily: '"Inter", "Arial", sans-serif',
    fontSize: 14,
    fontWeight: 300,
  },
}

export function DateRangeFilter({
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange,
}: DateRangeFilterProps) {
  const hasPartialRange = Boolean(dateFrom || dateTo) && !hasCompleteDateRange(dateFrom, dateTo)
  const hasInvalidRange = Boolean(dateFrom && dateTo) && !isValidDateRange(dateFrom, dateTo)

  return (
    <Box sx={{ mb: 4 }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        sx={{ alignItems: { xs: 'stretch', md: 'center' } }}
      >
        <Typography sx={{ color: 'text.primary', fontSize: 20, fontWeight: 300, minWidth: 78 }}>
          Матчи с
        </Typography>
        <DatePicker
          enableAccessibleFieldDOMStructure={false}
          format="DD.MM.YYYY"
          label={null}
          onChange={(value) => onDateFromChange(getNextValue(value))}
          slots={{
            openPickerIcon: CalendarMonthRoundedIcon,
          }}
          slotProps={{
            textField: {
              placeholder: 'ДД.ММ.ГГГГ',
            },
          }}
          sx={pickerStyles}
          value={toPickerValue(dateFrom)}
        />
        <Typography sx={{ color: 'text.primary', fontSize: 20, fontWeight: 300, px: { md: 1 } }}>
          по
        </Typography>
        <DatePicker
          enableAccessibleFieldDOMStructure={false}
          format="DD.MM.YYYY"
          label={null}
          onChange={(value) => onDateToChange(getNextValue(value))}
          slots={{
            openPickerIcon: CalendarMonthRoundedIcon,
          }}
          slotProps={{
            textField: {
              placeholder: 'ДД.ММ.ГГГГ',
            },
          }}
          sx={pickerStyles}
          value={toPickerValue(dateTo)}
        />
      </Stack>

      {hasPartialRange ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          Для фильтрации по API нужно заполнить обе даты.
        </Alert>
      ) : null}

      {hasInvalidRange ? (
        <Alert severity="warning" sx={{ mt: 2 }}>
          Дата начала должна быть меньше или равна дате окончания.
        </Alert>
      ) : null}
    </Box>
  )
}

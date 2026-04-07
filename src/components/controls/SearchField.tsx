import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { InputAdornment, TextField } from '@mui/material'

interface SearchFieldProps {
  placeholder: string
  value: string
  onChange: (value: string) => void
}

export function SearchField({ placeholder, value, onChange }: SearchFieldProps) {
  return (
    <TextField
      fullWidth
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon sx={{ color: 'text.secondary' }} />
            </InputAdornment>
          ),
        },
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          minHeight: 40,
          px: 0.5,
        },
        '& .MuiOutlinedInput-input': {
          color: 'text.secondary',
          fontFamily: '"Montserrat", "Arial", sans-serif',
          fontSize: 18,
          fontWeight: 500,
          py: 1,
        },
      }}
    />
  )
}

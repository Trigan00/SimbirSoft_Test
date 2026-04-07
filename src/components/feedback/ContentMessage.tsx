import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded'
import { Box, Button, Paper, Typography } from '@mui/material'

interface ContentMessageProps {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

export function ContentMessage({
  title,
  description,
  actionLabel,
  onAction,
}: ContentMessageProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        p: { xs: 3, md: 4 },
        textAlign: 'center',
      }}
    >
      <Typography variant="h2" sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, mb: 1 }}>
        {title}
      </Typography>
      <Typography sx={{ color: 'text.secondary', mx: 'auto', maxWidth: 560 }}>
        {description}
      </Typography>

      {actionLabel && onAction ? (
        <Box sx={{ mt: 3 }}>
          <Button onClick={onAction} startIcon={<RefreshRoundedIcon />} variant="contained">
            {actionLabel}
          </Button>
        </Box>
      ) : null}
    </Paper>
  )
}

import { useState } from 'react'
import { Avatar, Box, ButtonBase, Paper, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

interface EntityCardProps {
  fallbackLabel: string
  imageAlt: string
  imageUrl?: string | null
  subtitle?: string
  title: string
  to: string
  state?: { title: string }
}

export function EntityCard({
  fallbackLabel,
  imageAlt,
  imageUrl,
  subtitle,
  title,
  to,
  state,
}: EntityCardProps) {
  const [hasImageError, setHasImageError] = useState(false)
  const showImage = Boolean(imageUrl && !hasImageError)

  return (
    <Paper
      elevation={0}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        overflow: 'hidden',
        transition: 'transform 160ms ease, box-shadow 160ms ease',
        '&:hover': {
          boxShadow: '0 18px 40px rgba(17, 106, 204, 0.12)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <ButtonBase
        component={RouterLink}
        focusRipple
        state={state}
        sx={{ display: 'flex', flexDirection: 'column', px: 2, py: 2.5, width: '100%' }}
        to={to}
      >
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            height: { xs: 140, sm: 192 },
            justifyContent: 'center',
            width: '100%',
          }}
        >
          {showImage ? (
            <Box
              component="img"
              alt={imageAlt}
              onError={() => setHasImageError(true)}
              src={imageUrl || undefined}
              sx={{
                height: '100%',
                maxHeight: 192,
                maxWidth: '100%',
                objectFit: 'contain',
                width: '100%',
              }}
            />
          ) : (
            <Avatar
              variant="rounded"
              sx={{
                backgroundColor: 'rgba(17, 106, 204, 0.1)',
                color: 'primary.main',
                fontFamily: '"Ubuntu", "Arial", sans-serif',
                fontSize: { xs: 28, sm: 40 },
                fontWeight: 700,
                height: { xs: 140, sm: 192 },
                width: '100%',
              }}
            >
              {fallbackLabel}
            </Avatar>
          )}
        </Box>

        <Typography
          sx={{
            color: 'text.primary',
            fontFamily: '"Inter", "Arial", sans-serif',
            fontSize: { xs: 20, md: 22 },
            fontWeight: 300,
            lineHeight: 1.2,
            mt: 2,
            textAlign: 'center',
          }}
        >
          {title}
        </Typography>

        {subtitle ? (
          <Typography
            sx={{
              color: 'text.primary',
              fontFamily: '"Inter", "Arial", sans-serif',
              fontSize: 14,
              fontWeight: 300,
              lineHeight: 1.4,
              mt: 1,
              textAlign: 'center',
            }}
          >
            {subtitle}
          </Typography>
        ) : null}
      </ButtonBase>
    </Paper>
  )
}

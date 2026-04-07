import { createTheme } from '@mui/material/styles'

export const appTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#116ACC',
      dark: '#0D58A8',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#182233',
    },
    background: {
      default: '#EEF4FB',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#182233',
      secondary: '#626B8B',
    },
    divider: '#D9DDE7',
    error: {
      main: '#CC3D2B',
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: '"Inter", "Arial", sans-serif',
    h1: {
      fontSize: '1.25rem',
      lineHeight: 1.3,
      fontWeight: 300,
    },
    h2: {
      fontSize: '1.5rem',
      lineHeight: 1.3,
      fontWeight: 300,
    },
    h3: {
      fontSize: '1.125rem',
      lineHeight: 1.4,
      fontWeight: 300,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.45,
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ':root': {
          colorScheme: 'light',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: '#FFFFFF',
        },
        notchedOutline: {
          borderColor: 'rgba(17, 106, 204, 0.3)',
        },
      },
    },
  },
})

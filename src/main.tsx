import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/montserrat/500.css'
import '@fontsource/ubuntu/700.css'
import '@fontsource/work-sans/600.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import './styles/tokens.css'
import './styles/global.css'
import App from './App.tsx'
import { AppUIProvider } from './context/AppUIContext.tsx'
import { persistOptions, queryClient } from './queryClient.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PersistQueryClientProvider client={queryClient} persistOptions={persistOptions}>
      <AppUIProvider>
        <App />
      </AppUIProvider>
    </PersistQueryClientProvider>
  </StrictMode>,
)

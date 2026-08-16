import { useContext } from 'react'
import { AppUIContext } from './appUIContextInstance'

export function useAppUI() {
  const context = useContext(AppUIContext)
  if (context === null) {
    throw new Error('useAppUI must be used within AppUIProvider')
  }
  return context
}

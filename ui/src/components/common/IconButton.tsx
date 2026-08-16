import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './IconButton.module.css'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  'aria-label': string
}

export function IconButton({ children, className, ...props }: IconButtonProps) {
  return (
    <button type="button" className={[styles.button, className].filter(Boolean).join(' ')} {...props}>
      {children}
    </button>
  )
}

import { ReactNode } from 'react'

export default function PageShell({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`max-w-6xl mx-auto px-4 sm:px-6 py-10 ${className}`}>
      {children}
    </div>
  )
}

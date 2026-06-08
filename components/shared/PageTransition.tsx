import { ReactNode } from 'react'

export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <div className="page-enter w-full min-h-screen">
      {children}
    </div>
  )
}

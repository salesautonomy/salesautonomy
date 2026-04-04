'use client'

import { usePathname } from 'next/navigation'

export function NavWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isRoom = pathname?.startsWith('/room/')

  if (isRoom) return null
  return <>{children}</>
}

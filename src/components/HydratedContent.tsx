"use client"

import { useEffect, useState } from 'react'

interface HydratedContentProps {
  children: React.ReactNode
}

export function HydratedContent({ children }: HydratedContentProps) {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  if (!isHydrated) return null

  return <>{children}</>
}

"use client"

import { useEffect, useState } from 'react'

interface ClientComponentsProps {
  children: React.ReactNode
}

export function ClientComponents({ children }: ClientComponentsProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return <>{children}</>
}

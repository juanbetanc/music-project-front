"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useState, useEffect } from "react"

interface SearchInputProps {
  onSearch: (query: string) => void
  className?: string
}

export function SearchInput({ onSearch, className }: SearchInputProps) {
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  return (
    <form onSubmit={handleSearch} className="relative">
      <div className="relative flex items-center w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className={`pl-10 ${className}`}
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </form>
  )
}

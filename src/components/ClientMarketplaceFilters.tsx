"use client"

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { ClientComponents } from './ClientComponents'

interface ClientMarketplaceFiltersProps {
  categories: string[]
  onFilterChange: (category: string, searchQuery: string) => void
}

export function ClientMarketplaceFilters({ categories, onFilterChange }: ClientMarketplaceFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    onFilterChange(value, searchQuery)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    onFilterChange(selectedCategory, query)
  }

  return (
    <ClientComponents>
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-4 flex-wrap items-center mb-8">
          <div className="flex-1">
            <Input
              placeholder="Buscar servicio..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full"
            />
          </div>
          <div className="flex-1">
            <Select
              value={selectedCategory}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    <span dangerouslySetInnerHTML={{
                      __html: category
                        .replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/"/g, '&quot;')
                        .replace(/'/g, '&#039;')
                    }} />
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button className="bg-white text-blue-600 hover:bg-gray-100">
            Filtrar
          </Button>
        </div>
      </div>
    </ClientComponents>
  )
}

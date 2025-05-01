'use client'

import { useState, useEffect } from 'react'
import { ClientArtistCard } from '@/components/ClientArtistCard'
import { ClientMarketplaceFilters } from '@/components/ClientMarketplaceFilters'

import { useGetArtistsQuery } from '@/features/artists/artistsApi'

const categories: string[] = [
  'Tecnología',
  'Diseño',
  'Marketing',
  'Traducción',
  'Consultoría',
  'Desarrollo',
  'SEO',
  'Redacción',
  'Fotografía',
  'Música',
  'Video'
]

// Validación de categorías
const validateCategory = (category: string): boolean => {
  return categories.includes(category as typeof categories[number])
}

const Marketplace = () => {
  const [mounted, setMounted] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const { data: artists, isLoading } = useGetArtistsQuery()

  console.log(artists)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Validar búsqueda
  const safeSearchQuery = searchQuery
    ? searchQuery
      .toLowerCase()
      .replace(/[.*+?^${}()|[\]\-]/g, '\\$&') // Escape caracteres especiales
    : ''

  // const filteredServices = services.filter(service =>
  //   (selectedCategory === 'all' || service.category === selectedCategory) &&
  //   (!searchQuery || service.title.toLowerCase().includes(safeSearchQuery))
  // )

  return (
    <div className="fixed left-0 top-16 min-h-screen w-full bg-white">
      {/* <ClientMarketplaceFilters
        categories={categories as string[]}
        onFilterChange={(category, query) => {
          setSelectedCategory(category)
          setSearchQuery(query)
        }}
      /> */}

      {/* Services Grid */}
      <div className="min-h-screen min-w-screen px-8 py-8  ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* {filteredServices.map((service) => ( */}
          {artists?.[0] && (
            <ClientArtistCard key={artists[0].idArtist} artist={artists[0]} />
          )}
          {/* ))} */}
        </div>
      </div>
    </div>
  )
}

export default Marketplace

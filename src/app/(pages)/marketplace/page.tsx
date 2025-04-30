'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

const categories = [
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
  'Video',
] as const

// Validación de categorías
const validateCategory = (category: string): boolean => {
  return categories.includes(category as typeof categories[number])
}

interface Service {
  id: number
  title: string
  description: string
  price: number
  category: typeof categories[number]
  rating: number
  reviews: number
  provider: string
  image: string
}

// Validación de servicios
const validateService = (service: any): service is Service => {
  if (!service || typeof service !== 'object') return false
  
  // Validación de campos requeridos
  const requiredFields = ['id', 'title', 'description', 'price', 'category', 'rating', 'reviews', 'provider', 'image']
  if (!requiredFields.every(field => service[field] !== undefined)) return false

  // Validación de tipos
  if (typeof service.id !== 'number' || service.id <= 0) return false
  if (typeof service.title !== 'string' || service.title.length > 100) return false
  if (typeof service.description !== 'string' || service.description.length > 500) return false
  if (typeof service.price !== 'number' || service.price <= 0) return false
  if (!validateCategory(service.category)) return false
  if (typeof service.rating !== 'number' || service.rating < 0 || service.rating > 5) return false
  if (typeof service.reviews !== 'number' || service.reviews < 0) return false
  if (typeof service.provider !== 'string' || service.provider.length > 50) return false
  if (typeof service.image !== 'string' || !service.image.startsWith('/services/')) return false

  return true
}

const services: Service[] = [
  {
    id: 1,
    title: 'Desarrollo web completo',
    description: 'Desarrollo de aplicaciones web modernas y responsivas',
    price: 500,
    category: 'Desarrollo',
    rating: 4.8,
    reviews: 25,
    provider: 'Juan Perez',
    image: '/services/web-development.jpg',
  },
  {
    id: 2,
    title: 'Diseño de logo profesional',
    description: 'Creación de identidad visual única para tu marca',
    price: 150,
    category: 'Diseño',
    rating: 4.9,
    reviews: 42,
    provider: 'Maria Rodriguez',
    image: '/services/logo-design.jpg',
  },
  {
    id: 3,
    title: 'SEO avanzado',
    description: 'Optimización completa de tu sitio web para motores de búsqueda',
    price: 300,
    category: 'SEO',
    rating: 4.7,
    reviews: 35,
    provider: 'Carlos Gomez',
    image: '/services/seo.jpg',
  },
].filter(validateService)

const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Validar búsqueda
  const safeSearchQuery = searchQuery
    ? searchQuery
        .toLowerCase()
        .replace(/[.*+?^${}()|[\]\-]/g, '\\$&') // Escape caracteres especiales
    : ''

  const filteredServices = services.filter(service =>
    (selectedCategory === 'all' || service.category === selectedCategory) &&
    (!searchQuery || service.title.toLowerCase().includes(safeSearchQuery))
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-blue-600 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">Marketplace de Servicios</h1>
          <p className="text-lg">Encuentra el servicio perfecto para tu proyecto</p>
        </div>
      </header>

      {/* Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-4 flex-wrap items-center mb-8">
          <div className="flex-1">
            <Input
              placeholder="Buscar servicio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex-1">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
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

      {/* Services Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card key={service.id} className="transition-all duration-200 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold mb-2">
                  {service.title}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{service.category}</Badge>
                  <div className="flex items-center">
                    <span className="text-yellow-400">⭐</span>
                    <span className="ml-1">{service.rating}</span>
                    <span className="text-gray-500">({service.reviews})</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold text-blue-600">
                    ${service.price}
                  </div>
                  <Button variant="outline" className="text-blue-600 hover:bg-blue-50">
                    Ver detalles
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-lg font-semibold">{service.provider[0]}</span>
                  </div>
                  <div>
                    <span className="font-medium">{service.provider}</span>
                    <p className="text-sm text-gray-500">Proveedor certificado</p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Marketplace

'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { setAuth } from '@/features/user/userSlice'
import { jwtDecode } from 'jwt-decode'
import { getToken } from '@/utils/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const searchSchema = z.object({
  query: z.string().min(1, 'Please enter a search term')
})

type SearchForm = z.infer<typeof searchSchema>

const Marketplace = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user.user)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchForm>({
    resolver: zodResolver(searchSchema)
  })

  useEffect(() => {
    const token = getToken()
    if (token) {
      const decoded = jwtDecode<{ id: string; email: string; role: string }>(token)
      dispatch(setAuth(decoded))
    }
  }, [dispatch])

  const onSubmit = (data: SearchForm) => {
    console.log('Searching for:', data.query)
    // Aquí podrías hacer una petición con RTK Query
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <h1 className="text-3xl font-bold mb-4">Marketplace</h1>

      {user && (
        <p className="mb-4">Bienvenido, <span className="font-semibold">{user.email}</span></p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 mb-8">
        <div className="flex-1">
          <Label htmlFor="query">Buscar productos</Label>
          <Input id="query" placeholder="Buscar..." {...register('query')} />
          {errors.query && <p className="text-sm text-red-500 mt-1">{errors.query.message}</p>}
        </div>
        <Button type="submit">Buscar</Button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, idx) => (
          <Card key={idx} className="rounded-xl shadow-md">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-2">Producto {idx + 1}</h2>
              <p className="text-sm text-muted-foreground">Descripción breve del producto {idx + 1}.</p>
              <Button className="mt-4 w-full">Ver más</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Marketplace

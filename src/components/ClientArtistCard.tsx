"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { ClientComponents } from './ClientComponents'
import { ArtistSchema } from '@/schemas/artists/artistsSchema'

export function ClientArtistCard({ artist }: { artist: ArtistSchema }) {
  return (
    <ClientComponents>
      <Card className="transition-all duration-200 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold mb-2">
            {artist.name}
          </CardTitle>
          <div className="flex items-center gap-2">
            {artist.genres && artist.genres[0] ? (
              <Badge variant="outline">{artist.genres[0].name}</Badge>
            ) : (
              <Badge variant="outline">Genre not specified</Badge>
            )}
            {/* <div className="flex items-center">
              <span className="text-yellow-400">⭐</span>
              <span className="ml-1">{artist.rating}</span>
              <span className="text-gray-500">({artist.reviews})</span>
            </div> */}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">{artist.description}</p>
          <div className="flex justify-between items-center">            
            <Button variant="outline" className="text-blue-600 hover:bg-blue-50">
              Ver detalles
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-lg font-semibold">{artist.user?.email[0]}</span>
            </div>
            <div>
              <span className="font-medium">{artist.user?.email}</span>
              <p className="text-sm text-gray-500">Proveedor certificado</p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </ClientComponents>
  )
}

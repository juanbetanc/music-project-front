"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from 'next/image'
import { cn } from '@/lib/utils'

import { ClientComponents } from './ClientComponents'
import { ArtistSchema } from '@/schemas/artists/artistsSchema'

export function ClientArtistCard({ artist }: { artist: ArtistSchema }) {
  return (
    <ClientComponents>
      <Card className="transition-all duration-200 hover:shadow-lg hover:scale-[1.02] p-0">
        <div className="relative w-full h-[200px] overflow-hidden">
          <Image
            src={artist.profilePicture}
            alt={artist.name}
            fill
            className="object- rounded-t-lg "
            priority
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <CardTitle className="text-2xl font-bold text-white mb-2">
              {artist.name}
            </CardTitle>
            <div className="flex flex-wrap gap-2">
              {artist.genres?.map((genre, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-sm"
                >
                  {genre.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <CardContent className="pb-4 mt-0">
          <div className="space-y-4 max-h-[200px] overflow-hidden">
            <div className="relative h-[80px]">
              <p className="text-gray-600 leading-relaxed mb-2 line-clamp-3">{artist.description}</p>
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
            </div>
            {artist.city?.name || artist.country?.name ? (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>📍</span>
                <span>
                  {artist.city?.name} {artist.country?.name ? `, ${artist.country.name}` : ''}
                </span>
              </div>
            ) : null}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-lg font-semibold">{artist.user?.email[0]}</span>
                </div>
                <div>
                  <div className="relative">
                    <span className="font-medium inline-block max-w-[150px] truncate">{artist.user?.email}</span>
                    <div className="absolute right-0 top-0 h-4 w-4 bg-gradient-to-l from-white to-transparent"></div>
                  </div>
                  <p className="text-xs text-gray-500">Proveedor certificado</p>
                </div>
              </div>
              <Button
                variant="outline"
                className="text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                Ver detalles
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </ClientComponents>
  )
}

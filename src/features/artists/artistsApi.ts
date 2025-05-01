import { ArtistSchema } from '@/schemas/artists/artistsSchema';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const artistsApi = createApi({
    reducerPath: 'artistsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['Artists'],
    endpoints: (builder) => ({
        getArtists: builder.query<ArtistSchema[], void>({
            query: () => '/artists',
            providesTags: (result) =>
                // is result available?
                result
                    ? // succesfull query
                    [...result.map(({ idArtist }) => ({ type: 'Artists' as const, idArtist } as const)),
                     { type: 'Artists' as const, id: 'LIST' }]
                    : // empty query
                    [{ type: 'Artists' as const, id: 'LIST' }],
        }),
    }),
})

export const { useGetArtistsQuery } = artistsApi
import { z } from 'zod';

export const artistSchema = z.object({
    idArtist: z.string().trim().uuid(),
    name: z.string().min(3),
    description: z.string().min(10),
    genres: z.array(z.object({
        name: z.string().min(3),
    })).optional(),
    city: z.object({
        name: z.string().min(3),
    }).optional(),
    country: z.object({
        name: z.string().min(3),
    }).optional(),
    user: z.object({
        email: z.string().min(3),
    }).optional(),
    //   image: z.string().url(),
});

export type ArtistSchema = z.infer<typeof artistSchema>;

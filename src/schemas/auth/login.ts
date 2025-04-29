import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4), // Ajusta el tamaño mínimo según lo que prefieras
});

export type LoginUserDto = z.infer<typeof loginSchema>;

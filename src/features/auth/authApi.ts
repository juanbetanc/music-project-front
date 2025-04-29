// src/store/services/authApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// Define el tipo de la respuesta del login
interface LoginResponse {
  access_token: string;
}

// La mutación recibe las credenciales y devuelve un objeto con el access_token
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, { email: string, password: string }>({
      query: (loginData) => ({
        url: '/auth/login', // Ruta del login en tu API
        method: 'POST',
        body: loginData,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;

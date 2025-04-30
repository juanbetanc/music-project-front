// features/user/userSlice.ts
import { getToken } from '@/utils/auth'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode'

interface tokenPayload {
  id: string
  email: string
  role: string
}

interface AuthState {
  user: {
    id: string
    email: string
    role: string
  } | null
}

const initialState: AuthState = {
  user: null,
}

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<AuthState['user']>) {
      state.user = action.payload
    },
    clearAuth(state) {
      state.user = null
    },
  },
})

export const { setAuth, clearAuth } = userSlice.actions
export const userReducer = userSlice.reducer

// Acción para recuperar el estado del usuario desde cookies
export const initializeAuthFromCookies = () => {
  if (typeof window === 'undefined') {
    return { user: null }
  }

  try {
    const token = getToken()
    if (!token) {
      return { user: null }
    }

    // Verificar que el token es una cadena válida
    if (typeof token !== 'string' || !token.trim()) {
      console.error('Invalid token: token must be a non-empty string')
      return { user: null }
    }

    // Verificar que el token tiene la estructura básica de JWT
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.error('Invalid token: token must have 3 parts')
      return { user: null }
    }

    const decoded = jwtDecode<tokenPayload>(token)
    return { user: decoded }
  } catch (error) {
    console.error('Error initializing auth from cookies:', error)
    return { user: null }
  }
}

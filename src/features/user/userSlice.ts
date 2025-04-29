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
  if (typeof window !== 'undefined') {
    const token = getToken()
    if (token) {
      const decoded = jwtDecode<tokenPayload>(token)
      return { user: decoded }
    }
    return { user: null }
  }
}

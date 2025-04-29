import { authApi } from '@/features/auth/authApi'
import { userReducer } from '@/features/user/userSlice'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import React from 'react'
import { connect } from 'react-redux'

export const store = configureStore({
    reducer: {
        user: userReducer,      
        [authApi.reducerPath]: authApi.reducer  
    },    
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(
            authApi.middleware
        )
}) 

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
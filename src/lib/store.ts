import { userReducer } from '@/features/user/userSlice'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import React from 'react'
import { connect } from 'react-redux'

import { authApi } from '@/features/auth/authApi'
import { artistsApi } from '@/features/artists/artistsApi'

export const store = configureStore({
    reducer: {
        user: userReducer,      
        [authApi.reducerPath]: authApi.reducer,
        [artistsApi.reducerPath]: artistsApi.reducer,
    },    
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(
            authApi.middleware,
            artistsApi.middleware
        )
}) 

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
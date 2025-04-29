'use client'

import { store } from "@/lib/store";
import { Provider } from "react-redux";

import { useDispatch } from "react-redux";
import { initializeAuthFromCookies, setAuth } from "@/features/user/userSlice";
import { useEffect } from "react";

function AuthInitializer() {
    const dispatch = useDispatch()

    useEffect(() => {
        const authData = initializeAuthFromCookies() ?? { user: null }
        dispatch(setAuth(authData.user))
    }, [dispatch])

    return null
}

export function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <AuthInitializer />
            {children}
        </Provider>
    )
}
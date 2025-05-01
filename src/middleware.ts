// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

// Lista de rutas públicas
const PUBLIC_PATHS = ['/login', '/marketplace']

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Permitir el acceso a rutas públicas
    if (PUBLIC_PATHS.some(path => pathname.startsWith(path))) {
        return NextResponse.next()
    }

    // ✅ Leer la cookie desde el request
    const token = request.cookies.get('authToken')?.value

    if (!token) {
        // Redirigir al login si no hay token
        const loginUrl = new URL('/login', request.url)
        return NextResponse.redirect(loginUrl)
    }

    // Dejar pasar si hay token
    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Aplica el middleware solo a estas rutas
         * Excluye estáticos automáticamente
         */
        '/((?!_next/static|_next/image|favicon.ico|assets|api).*)',
    ],
}


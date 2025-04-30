import Cookies from 'js-cookie'

// src/utils/auth.ts
export function saveToken(token: string) {
  if (typeof token !== 'string' || !token) {
    console.error('Invalid token: token must be a non-empty string')
    return
  }
  
  Cookies.set("authToken", token, { expires: 1 })  // Añadir una expiración de 1 día
}

export function getToken() {
  return Cookies.get("authToken")
}

export function removeToken() {
  Cookies.remove("authToken")
}

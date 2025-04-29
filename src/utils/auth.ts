import Cookies from 'js-cookie'

// src/utils/auth.ts
export function saveToken(token: string) {
  Cookies.set("authToken", token)
}

export function getToken() {
  return Cookies.get("authToken")
}

export function removeToken() {
  Cookies.remove("authToken")
}

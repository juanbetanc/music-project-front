export const SECURITY_CONFIG = {
  // Configuración de cookies
  COOKIE_CONFIG: {
    HTTP_ONLY: true,
    SECURE: process.env.NODE_ENV === 'production',
    SAME_SITE: 'strict',
    MAX_AGE: 7 * 24 * 60 * 60, // 7 días
    PATH: '/',
  },

  // Configuración de tokens
  TOKEN_CONFIG: {
    MIN_LENGTH: 32,
    MAX_AGE: 7 * 24 * 60 * 60 * 1000, // 7 días
  },

  // Configuración de rate limiting
  RATE_LIMIT: {
    WINDOW_MS: 15 * 60 * 1000, // 15 minutos
    MAX_REQUESTS: 100,
  },

  // Configuración de validación
  VALIDATION_CONFIG: {
    MAX_INPUT_LENGTH: 255,
    MIN_PASSWORD_LENGTH: 8,
  },
} as const

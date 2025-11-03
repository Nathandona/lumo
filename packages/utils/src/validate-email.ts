/**
 * Validate email address format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Normalize email address (lowercase, trim)
 */
export function normalizeEmail(email: string): string {
  return email.toLowerCase().trim()
}
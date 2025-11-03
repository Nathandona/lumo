/**
 * Validate phone number (basic validation)
 */
export function validatePhone(phone: string): boolean {
  // Remove all non-digit characters
  const cleanedPhone = phone.replace(/\D/g, '')

  // Check if it has a reasonable number of digits (10-15 for international numbers)
  return cleanedPhone.length >= 10 && cleanedPhone.length <= 15
}

/**
 * Format phone number for display (US format)
 */
export function formatPhoneUS(phone: string): string {
  const cleanedPhone = phone.replace(/\D/g, '')

  if (cleanedPhone.length === 10) {
    return `(${cleanedPhone.slice(0, 3)}) ${cleanedPhone.slice(3, 6)}-${cleanedPhone.slice(6)}`
  }

  return phone
}
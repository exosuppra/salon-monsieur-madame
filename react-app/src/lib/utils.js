import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const PLANITY_URL = 'https://www.planity.com/madame-monsieur-04800-greoux-les-bains'

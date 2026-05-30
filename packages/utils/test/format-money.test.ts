import { describe, it, expect } from 'vitest'
import {
  formatMoney,
  toMajorUnits,
  toMinorUnits,
  getCurrencyFractionDigits,
  zeroMoney,
  addMoney,
  multiplyMoney,
  discountPercent,
} from '../src/format-money'
import type { Money } from '../src/types'

const usd = (amount: number): Money => ({ amount, currency: 'USD' })

describe('getCurrencyFractionDigits', () => {
  it('returns 2 for USD', () => {
    expect(getCurrencyFractionDigits('USD')).toBe(2)
  })

  it('returns 0 for JPY', () => {
    expect(getCurrencyFractionDigits('JPY')).toBe(0)
  })

  it('falls back to 2 for an unknown currency', () => {
    expect(getCurrencyFractionDigits('ZZZ')).toBe(2)
  })
})

describe('toMajorUnits / toMinorUnits', () => {
  it('converts USD minor units to major units', () => {
    expect(toMajorUnits(usd(1999))).toBe(19.99)
  })

  it('treats JPY as having no minor units', () => {
    expect(toMajorUnits({ amount: 500, currency: 'JPY' })).toBe(500)
  })

  it('round-trips through minor units', () => {
    expect(toMinorUnits(19.99, 'USD')).toBe(1999)
    expect(toMinorUnits(500, 'JPY')).toBe(500)
  })
})

describe('formatMoney', () => {
  it('formats USD with the en-US locale', () => {
    expect(formatMoney(usd(1999), { locale: 'en-US' })).toBe('$19.99')
  })

  it('formats zero correctly', () => {
    expect(formatMoney(usd(0), { locale: 'en-US' })).toBe('$0.00')
  })
})

describe('addMoney', () => {
  it('sums amounts of the same currency', () => {
    expect(addMoney(usd(1000), usd(999))).toEqual(usd(1999))
  })

  it('throws when currencies differ', () => {
    expect(() => addMoney(usd(100), { amount: 100, currency: 'EUR' })).toThrow()
  })
})

describe('multiplyMoney', () => {
  it('multiplies by a quantity', () => {
    expect(multiplyMoney(usd(1999), 3)).toEqual(usd(5997))
  })
})

describe('discountPercent', () => {
  it('computes the percentage saved', () => {
    expect(discountPercent(usd(10000), usd(7500))).toBe(25)
  })

  it('returns 0 when current price is not lower', () => {
    expect(discountPercent(usd(5000), usd(5000))).toBe(0)
    expect(discountPercent(usd(5000), usd(6000))).toBe(0)
  })
})

describe('zeroMoney', () => {
  it('creates a zero value in the given currency', () => {
    expect(zeroMoney('EUR')).toEqual({ amount: 0, currency: 'EUR' })
  })
})

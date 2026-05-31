import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ProductOption, Variant } from '../src/index'
import { PriceDisplay } from '../src/components/lumo/price-display'
import { RatingStars } from '../src/components/lumo/rating-stars'
import { QuantityStepper } from '../src/components/lumo/quantity-stepper'
import { VariantSelector } from '../src/components/lumo/variant-selector'

describe('PriceDisplay', () => {
  it('formats the price', () => {
    render(<PriceDisplay price={{ amount: 1999, currency: 'USD' }} locale="en-US" />)
    expect(screen.getByText('$19.99')).toBeInTheDocument()
  })

  it('shows compare-at price and discount percent', () => {
    render(
      <PriceDisplay
        price={{ amount: 1999, currency: 'USD' }}
        compareAtPrice={{ amount: 2999, currency: 'USD' }}
        locale="en-US"
      />
    )
    expect(screen.getByText('$29.99')).toBeInTheDocument()
    expect(screen.getByText('-33%')).toBeInTheDocument()
  })

  it('hides discount when compare-at is not higher', () => {
    render(
      <PriceDisplay
        price={{ amount: 1999, currency: 'USD' }}
        compareAtPrice={{ amount: 1999, currency: 'USD' }}
        locale="en-US"
      />
    )
    expect(screen.queryByText(/%/)).not.toBeInTheDocument()
  })
})

describe('RatingStars', () => {
  it('exposes an accessible label and review count', () => {
    render(<RatingStars value={4.5} count={128} />)
    expect(screen.getByRole('img')).toHaveAttribute('aria-label', expect.stringContaining('4.5'))
    expect(screen.getByText('(128)')).toBeInTheDocument()
  })
})

describe('QuantityStepper', () => {
  it('increments and decrements via callback', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<QuantityStepper value={2} onValueChange={onChange} />)

    await user.click(screen.getByLabelText('Increase quantity'))
    expect(onChange).toHaveBeenCalledWith(3)

    await user.click(screen.getByLabelText('Decrease quantity'))
    expect(onChange).toHaveBeenCalledWith(1)
  })

  it('disables decrement at the minimum', () => {
    render(<QuantityStepper value={1} min={1} onValueChange={vi.fn()} />)
    expect(screen.getByLabelText('Decrease quantity')).toBeDisabled()
  })

  it('disables increment at the maximum', () => {
    render(<QuantityStepper value={5} max={5} onValueChange={vi.fn()} />)
    expect(screen.getByLabelText('Increase quantity')).toBeDisabled()
  })
})

describe('VariantSelector', () => {
  const options: ProductOption[] = [{ name: 'Size', values: ['S', 'M', 'L'] }]
  const variants: Variant[] = [
    { id: 's', price: { amount: 5000, currency: 'USD' }, selectedOptions: [{ name: 'Size', value: 'S' }], available: true },
    { id: 'm', price: { amount: 5000, currency: 'USD' }, selectedOptions: [{ name: 'Size', value: 'M' }], available: true },
    { id: 'l', price: { amount: 5000, currency: 'USD' }, selectedOptions: [{ name: 'Size', value: 'L' }], available: false },
  ]

  it('disables unavailable options', () => {
    render(<VariantSelector options={options} variants={variants} value={[{ name: 'Size', value: 'M' }]} onValueChange={vi.fn()} />)
    expect(screen.getByRole('button', { name: 'L' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'S' })).toBeEnabled()
  })

  it('emits the new selection on click', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<VariantSelector options={options} variants={variants} value={[{ name: 'Size', value: 'M' }]} onValueChange={onChange} />)

    await user.click(screen.getByRole('button', { name: 'S' }))
    expect(onChange).toHaveBeenCalledWith([{ name: 'Size', value: 'S' }])
  })
})

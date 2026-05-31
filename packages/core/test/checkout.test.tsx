import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { CartLine } from '../src/index'
import { AddressForm } from '../src/components/lumo/address-form'
import { OrderSummary } from '../src/components/lumo/order-summary'
import { OrderConfirmation } from '../src/components/lumo/order-confirmation'
import { CheckoutForm } from '../src/components/lumo/checkout-form'

const line: CartLine = {
  id: 'v1',
  variant: { id: 'v1', price: { amount: 1999, currency: 'USD' }, selectedOptions: [], available: true },
  product: { id: '1', handle: 'lamp', title: 'Test Lamp', images: [{ url: 'lamp.jpg' }] },
  quantity: 1,
  lineTotal: { amount: 1999, currency: 'USD' },
}

describe('AddressForm', () => {
  it('shows validation errors on empty submit', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<AddressForm onSubmit={onSubmit} />)
    await user.click(screen.getByRole('button', { name: /continue/i }))
    expect(await screen.findAllByText('Required')).not.toHaveLength(0)
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('submits a normalized address when valid', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<AddressForm onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText('First name'), 'Ada')
    await user.type(screen.getByLabelText('Last name'), 'Lovelace')
    await user.type(screen.getByLabelText('Address'), '12 Analytical Way')
    await user.type(screen.getByLabelText('City'), 'London')
    await user.type(screen.getByLabelText('Postal code'), 'EC1A')
    await user.type(screen.getByLabelText('Country'), 'GB')
    await user.click(screen.getByRole('button', { name: /continue/i }))

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1))
    expect(onSubmit.mock.calls[0][0]).toMatchObject({ firstName: 'Ada', city: 'London', country: 'GB' })
  })
})

describe('OrderSummary', () => {
  it('renders line items and totals', () => {
    render(
      <OrderSummary
        lines={[line]}
        subtotal={{ amount: 1999, currency: 'USD' }}
        total={{ amount: 2199, currency: 'USD' }}
        locale="en-US"
      />
    )
    expect(screen.getByText('Order summary')).toBeInTheDocument()
    expect(screen.getByText('Test Lamp')).toBeInTheDocument()
    expect(screen.getByText('$21.99')).toBeInTheDocument()
  })
})

describe('OrderConfirmation', () => {
  it('shows the order number and continues', async () => {
    const user = userEvent.setup()
    const onContinue = vi.fn()
    render(
      <OrderConfirmation orderNumber="LUMO-40271" total={{ amount: 2199, currency: 'USD' }} locale="en-US" onContinue={onContinue} />
    )
    expect(screen.getByText(/order confirmed/i)).toBeInTheDocument()
    expect(screen.getByText('LUMO-40271')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /continue shopping/i }))
    expect(onContinue).toHaveBeenCalledTimes(1)
  })
})

describe('CheckoutForm', () => {
  it('renders the order summary and place-order button', () => {
    render(<CheckoutForm lines={[line]} subtotal={{ amount: 1999, currency: 'USD' }} total={{ amount: 2199, currency: 'USD' }} />)
    expect(screen.getByText('Order summary')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /place order/i })).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('validates before submitting', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<CheckoutForm lines={[line]} subtotal={{ amount: 1999, currency: 'USD' }} onSubmit={onSubmit} />)
    await user.click(screen.getByRole('button', { name: /place order/i }))
    expect(await screen.findAllByText('Required')).not.toHaveLength(0)
    expect(onSubmit).not.toHaveBeenCalled()
  })
})

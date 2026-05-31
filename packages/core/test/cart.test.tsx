import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { CartLine, Product, Variant } from '../src/index'
import { ProductGrid } from '../src/components/lumo/product-grid'
import { CartLineItem } from '../src/components/lumo/cart-line-item'
import { CartSummary } from '../src/components/lumo/cart-summary'
import { CartDrawer } from '../src/components/lumo/cart-drawer'

const variant: Variant = {
  id: 'v1',
  price: { amount: 1999, currency: 'USD' },
  selectedOptions: [],
  available: true,
}

const product: Product = {
  id: '1',
  handle: 'lamp',
  title: 'Test Lamp',
  images: [{ url: 'lamp.jpg' }],
  options: [],
  variants: [variant],
}

const line: CartLine = {
  id: 'v1',
  variant,
  product: { id: '1', handle: 'lamp', title: 'Test Lamp', images: [{ url: 'lamp.jpg' }] },
  quantity: 1,
  lineTotal: { amount: 1999, currency: 'USD' },
}

describe('ProductGrid', () => {
  const products = [product, { ...product, id: '2', title: 'Test Watch' }]

  it('renders a card per product', () => {
    render(<ProductGrid products={products} />)
    expect(screen.getByText('Test Lamp')).toBeInTheDocument()
    expect(screen.getByText('Test Watch')).toBeInTheDocument()
  })

  it('shows skeletons while loading, not products', () => {
    render(<ProductGrid products={products} loading loadingCount={3} />)
    expect(screen.queryByText('Test Lamp')).not.toBeInTheDocument()
  })

  it('renders an empty state', () => {
    render(<ProductGrid products={[]} />)
    expect(screen.getByText(/no products found/i)).toBeInTheDocument()
  })
})

describe('CartLineItem', () => {
  it('renders title and line total', () => {
    render(<CartLineItem line={line} locale="en-US" />)
    expect(screen.getByText('Test Lamp')).toBeInTheDocument()
    expect(screen.getByText('$19.99')).toBeInTheDocument()
  })

  it('removes the line', async () => {
    const user = userEvent.setup()
    const onRemove = vi.fn()
    render(<CartLineItem line={line} onRemove={onRemove} />)
    await user.click(screen.getByLabelText(/remove test lamp/i))
    expect(onRemove).toHaveBeenCalledWith('v1')
  })

  it('changes quantity', async () => {
    const user = userEvent.setup()
    const onQty = vi.fn()
    render(<CartLineItem line={line} onQuantityChange={onQty} />)
    await user.click(screen.getByLabelText(/increase quantity of test lamp/i))
    expect(onQty).toHaveBeenCalledWith('v1', 2)
  })
})

describe('CartSummary', () => {
  it('shows subtotal and fires checkout', async () => {
    const user = userEvent.setup()
    const onCheckout = vi.fn()
    render(
      <CartSummary
        subtotal={{ amount: 1999, currency: 'USD' }}
        total={{ amount: 2199, currency: 'USD' }}
        locale="en-US"
        onCheckout={onCheckout}
      />
    )
    expect(screen.getByText('$19.99')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /checkout/i }))
    expect(onCheckout).toHaveBeenCalledTimes(1)
  })
})

describe('CartDrawer', () => {
  it('renders cart contents when open', () => {
    render(
      <CartDrawer open lines={[line]} subtotal={{ amount: 1999, currency: 'USD' }} locale="en-US" />
    )
    expect(screen.getByText('Your cart')).toBeInTheDocument()
    expect(screen.getByText('Test Lamp')).toBeInTheDocument()
    expect(screen.getByLabelText('Close cart')).toBeInTheDocument()
  })

  it('shows an empty state', () => {
    render(<CartDrawer open lines={[]} subtotal={{ amount: 0, currency: 'USD' }} />)
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument()
  })
})

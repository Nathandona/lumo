import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { Product, Variant } from '@lumo-ui/utils'
import { ProductCard } from '../src/components/lumo/product-card'

const mockVariant: Variant = {
  id: 'v1',
  sku: 'SKU-1',
  price: { amount: 9999, currency: 'USD' },
  compareAtPrice: { amount: 14999, currency: 'USD' },
  selectedOptions: [],
  available: true,
}

const mockProduct: Product = {
  id: '1',
  handle: 'test-product',
  title: 'Test Product',
  description: 'Test product description',
  images: [{ url: 'https://example.com/image.jpg' }],
  options: [],
  variants: [mockVariant],
  rating: { value: 4.5, count: 25 },
  badges: ['sale'],
}

describe('ProductCard', () => {
  const mockOnAddToCart = vi.fn()
  const mockOnQuickView = vi.fn()
  const mockOnToggleWishlist = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  function renderCard(props = {}) {
    return render(
      <ProductCard
        product={mockProduct}
        onAddToCart={mockOnAddToCart}
        onQuickView={mockOnQuickView}
        onToggleWishlist={mockOnToggleWishlist}
        {...props}
      />
    )
  }

  it('renders product information correctly', () => {
    renderCard()

    expect(screen.getByAltText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('$99.99')).toBeInTheDocument()
    expect(screen.getByText('$149.99')).toBeInTheDocument()
    expect(screen.getByText('sale')).toBeInTheDocument()
    expect(screen.getByText('(25)')).toBeInTheDocument()
  })

  it('displays discount percentage correctly', () => {
    renderCard()
    expect(screen.getByText('-33%')).toBeInTheDocument()
  })

  it('calls onAddToCart with the product and resolved variant', async () => {
    const user = userEvent.setup()
    renderCard()

    await user.click(screen.getByLabelText(/Add Test Product to cart/))

    expect(mockOnAddToCart).toHaveBeenCalledWith(mockProduct, mockVariant)
    expect(mockOnAddToCart).toHaveBeenCalledTimes(1)
  })

  it('shows quick actions', () => {
    renderCard({ showQuickActions: true })

    expect(screen.getByLabelText('Quick view Test Product')).toBeInTheDocument()
    expect(screen.getByLabelText('Add to wishlist')).toBeInTheDocument()
  })

  it('calls onToggleWishlist when the wishlist button is clicked', async () => {
    const user = userEvent.setup()
    renderCard()

    await user.click(screen.getByLabelText('Add to wishlist'))

    expect(mockOnToggleWishlist).toHaveBeenCalledWith(mockProduct)
    expect(mockOnToggleWishlist).toHaveBeenCalledTimes(1)
  })

  it('calls onQuickView when the quick view button is clicked', async () => {
    const user = userEvent.setup()
    renderCard()

    await user.click(screen.getByLabelText('Quick view Test Product'))

    expect(mockOnQuickView).toHaveBeenCalledWith(mockProduct)
    expect(mockOnQuickView).toHaveBeenCalledTimes(1)
  })

  it('displays the filled wishlist state when isInWishlist is true', () => {
    renderCard({ isInWishlist: true })
    expect(screen.getByLabelText('Remove from wishlist')).toBeInTheDocument()
  })

  it('hides quick actions when showQuickActions is false', () => {
    renderCard({ showQuickActions: false })

    expect(screen.queryByLabelText('Quick view Test Product')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Add to wishlist')).not.toBeInTheDocument()
  })

  it('renders custom badges', () => {
    const { rerender } = render(<ProductCard product={{ ...mockProduct, badges: ['new'] }} />)
    expect(screen.getByText('new')).toBeInTheDocument()

    rerender(<ProductCard product={{ ...mockProduct, badges: ['limited'] }} />)
    expect(screen.getByText('limited')).toBeInTheDocument()
  })

  it('does not display the compare-at price when not provided', () => {
    const variant: Variant = { ...mockVariant, compareAtPrice: undefined }
    render(<ProductCard product={{ ...mockProduct, variants: [variant] }} />)

    expect(screen.getByText('$99.99')).toBeInTheDocument()
    expect(screen.queryByText('$149.99')).not.toBeInTheDocument()
  })

  it('marks the product as sold out and disables add to cart', () => {
    const variant: Variant = { ...mockVariant, available: false }
    renderCard({ product: { ...mockProduct, variants: [variant] } })

    expect(screen.getByText('Sold out')).toBeInTheDocument()
    expect(screen.getByLabelText(/Add Test Product to cart/)).toBeDisabled()
  })

  it('has an accessible add to cart label', () => {
    renderCard()
    const addToCartButton = screen.getByRole('button', { name: /Add Test Product to cart/ })
    expect(addToCartButton).toHaveAttribute('aria-label', 'Add Test Product to cart')
  })
})

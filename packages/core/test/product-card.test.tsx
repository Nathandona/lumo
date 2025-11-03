import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProductCard, type Product } from '../src/components/product-card'

const mockProduct: Product = {
  id: '1',
  name: 'Test Product',
  price: 99.99,
  image: 'https://example.com/image.jpg',
  badge: 'sale',
  originalPrice: 149.99,
  rating: 4.5,
  reviewCount: 25,
  description: 'Test product description'
}

describe('ProductCard', () => {
  const mockOnAddToCart = vi.fn()
  const mockOnQuickView = vi.fn()
  const mockOnToggleWishlist = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders product information correctly', () => {
    render(
      <ProductCard
        product={mockProduct}
        onAddToCart={mockOnAddToCart}
        onQuickView={mockOnQuickView}
        onToggleWishlist={mockOnToggleWishlist}
      />
    )

    expect(screen.getByAltText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('$99.99')).toBeInTheDocument()
    expect(screen.getByText('$149.99')).toBeInTheDocument()
    expect(screen.getByText('Sale')).toBeInTheDocument()
    expect(screen.getByText('(25)')).toBeInTheDocument()
  })

  it('displays discount percentage correctly', () => {
    render(
      <ProductCard
        product={mockProduct}
        onAddToCart={mockOnAddToCart}
        onQuickView={mockOnQuickView}
        onToggleWishlist={mockOnToggleWishlist}
      />
    )

    expect(screen.getByText('-33%')).toBeInTheDocument()
  })

  it('calls onAddToCart when add to cart button is clicked', async () => {
    const user = userEvent.setup()

    render(
      <ProductCard
        product={mockProduct}
        onAddToCart={mockOnAddToCart}
        onQuickView={mockOnQuickView}
        onToggleWishlist={mockOnToggleWishlist}
      />
    )

    const addToCartButton = screen.getByLabelText(/Add Test Product to cart/)
    await user.click(addToCartButton)

    expect(mockOnAddToCart).toHaveBeenCalledWith(mockProduct)
    expect(mockOnAddToCart).toHaveBeenCalledTimes(1)
  })

  it('shows quick actions on hover', async () => {
    render(
      <ProductCard
        product={mockProduct}
        onAddToCart={mockOnAddToCart}
        onQuickView={mockOnQuickView}
        onToggleWishlist={mockOnToggleWishlist}
        showQuickActions={true}
      />
    )

    const quickViewButton = screen.getByLabelText('Quick view')
    const wishlistButton = screen.getByLabelText('Add to wishlist')

    expect(quickViewButton).toBeInTheDocument()
    expect(wishlistButton).toBeInTheDocument()
  })

  it('calls onToggleWishlist when wishlist button is clicked', async () => {
    const user = userEvent.setup()

    render(
      <ProductCard
        product={mockProduct}
        onAddToCart={mockOnAddToCart}
        onQuickView={mockOnQuickView}
        onToggleWishlist={mockOnToggleWishlist}
      />
    )

    const wishlistButton = screen.getByLabelText('Add to wishlist')
    await user.click(wishlistButton)

    expect(mockOnToggleWishlist).toHaveBeenCalledWith(mockProduct)
    expect(mockOnToggleWishlist).toHaveBeenCalledTimes(1)
  })

  it('calls onQuickView when quick view button is clicked', async () => {
    const user = userEvent.setup()

    render(
      <ProductCard
        product={mockProduct}
        onAddToCart={mockOnAddToCart}
        onQuickView={mockOnQuickView}
        onToggleWishlist={mockOnToggleWishlist}
      />
    )

    const quickViewButton = screen.getByLabelText('Quick view')
    await user.click(quickViewButton)

    expect(mockOnQuickView).toHaveBeenCalledWith(mockProduct)
    expect(mockOnQuickView).toHaveBeenCalledTimes(1)
  })

  it('displays wishlist filled state when isInWishlist is true', () => {
    render(
      <ProductCard
        product={mockProduct}
        onAddToCart={mockOnAddToCart}
        onQuickView={mockOnQuickView}
        onToggleWishlist={mockOnToggleWishlist}
        isInWishlist={true}
      />
    )

    const wishlistButton = screen.getByLabelText('Remove from wishlist')
    expect(wishlistButton).toBeInTheDocument()
  })

  it('does not show quick actions when showQuickActions is false', () => {
    render(
      <ProductCard
        product={mockProduct}
        onAddToCart={mockOnAddToCart}
        onQuickView={mockOnQuickView}
        onToggleWishlist={mockOnToggleWishlist}
        showQuickActions={false}
      />
    )

    expect(screen.queryByLabelText('Quick view')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Add to wishlist')).not.toBeInTheDocument()
  })

  it('renders different badge types correctly', () => {
    const newProduct = { ...mockProduct, badge: 'new' as const }
    const limitedProduct = { ...mockProduct, badge: 'limited' as const }

    const { rerender } = render(
      <ProductCard
        product={newProduct}
        onAddToCart={mockOnAddToCart}
        onQuickView={mockOnQuickView}
        onToggleWishlist={mockOnToggleWishlist}
      />
    )

    expect(screen.getByText('New')).toBeInTheDocument()

    rerender(
      <ProductCard
        product={limitedProduct}
        onAddToCart={mockOnAddToCart}
        onQuickView={mockOnQuickView}
        onToggleWishlist={mockOnToggleWishlist}
      />
    )

    expect(screen.getByText('Limited')).toBeInTheDocument()
  })

  it('does not display original price when not provided', () => {
    const productWithoutOriginalPrice = {
      ...mockProduct,
      originalPrice: undefined
    }

    render(
      <ProductCard
        product={productWithoutOriginalPrice}
        onAddToCart={mockOnAddToCart}
        onQuickView={mockOnQuickView}
        onToggleWishlist={mockOnToggleWishlist}
      />
    )

    // Regular price should still be displayed
    expect(screen.getByText('$99.99')).toBeInTheDocument()
    // Original price should not be displayed
    expect(screen.queryByText('$149.99')).not.toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(
      <ProductCard
        product={mockProduct}
        onAddToCart={mockOnAddToCart}
        onQuickView={mockOnQuickView}
        onToggleWishlist={mockOnToggleWishlist}
      />
    )

    const addToCartButton = screen.getByRole('button', { name: /Add Test Product to cart/ })
    expect(addToCartButton).toHaveAttribute('aria-label', 'Add Test Product to cart')

    const quickViewButton = screen.getByRole('button', { name: /Quick view/ })
    expect(quickViewButton).toHaveAttribute('aria-label', 'Quick view')

    const wishlistButton = screen.getByRole('button', { name: /Add to wishlist/ })
    expect(wishlistButton).toHaveAttribute('aria-label', 'Add to wishlist')
  })
})
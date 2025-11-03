import type { Meta, StoryObj } from '@storybook/react'
import { ProductCard, type Product } from '@lumo-ui/core'

const meta: Meta<typeof ProductCard> = {
  title: 'Components/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'compact', 'featured'],
    },
    product: {
      control: 'object',
    },
    currency: {
      control: 'text',
    },
    showQuickActions: {
      control: 'boolean',
    },
    isInWishlist: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const sampleProduct: Product = {
  id: '1',
  name: 'Premium Wireless Headphones',
  price: 299.99,
  originalPrice: 399.99,
  image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
  badge: 'sale',
  rating: 4.5,
  reviewCount: 128,
  description: 'Experience premium sound quality with active noise cancellation and 30-hour battery life.',
}

export const Default: Story = {
  args: {
    product: sampleProduct,
    currency: '$',
    showQuickActions: true,
    isInWishlist: false,
    onAddToCart: (product) => console.log('Added to cart:', product.name),
    onQuickView: (product) => console.log('Quick view:', product.name),
    onToggleWishlist: (product) => console.log('Toggle wishlist:', product.name),
  },
}

export const Compact: Story = {
  args: {
    ...Default.args,
    variant: 'compact',
  },
}

export const Featured: Story = {
  args: {
    ...Default.args,
    variant: 'featured',
  },
}

export const NewProduct: Story = {
  args: {
    ...Default.args,
    product: {
      ...sampleProduct,
      badge: 'new',
      originalPrice: undefined,
    },
  },
}

export const LimitedEdition: Story = {
  args: {
    ...Default.args,
    product: {
      ...sampleProduct,
      badge: 'limited',
      name: 'Limited Edition Wireless Headphones',
      description: 'Exclusive limited edition with premium materials and custom engraving.',
    },
  },
}

export const WithoutDiscount: Story = {
  args: {
    ...Default.args,
    product: {
      ...sampleProduct,
      originalPrice: undefined,
      badge: undefined,
    },
  },
}

export const WithCustomCurrency: Story = {
  args: {
    ...Default.args,
    currency: '€',
    product: {
      ...sampleProduct,
      price: 299.99,
      originalPrice: 399.99,
    },
  },
}

export const InWishlist: Story = {
  args: {
    ...Default.args,
    isInWishlist: true,
  },
}

export const WithoutQuickActions: Story = {
  args: {
    ...Default.args,
    showQuickActions: false,
  },
}

export const WithoutActions: Story = {
  args: {
    product: sampleProduct,
    currency: '$',
    showQuickActions: true,
    isInWishlist: false,
    // No onAddToCart callback
  },
}
import type { Meta, StoryObj } from '@storybook/react'
import { ProductCard, type Product } from '@lumo-ui/core'

const meta: Meta<typeof ProductCard> = {
  title: 'Product/ProductCard',
  component: ProductCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: 'select',
      options: ['default', 'compact', 'featured'],
    },
    showQuickActions: { control: 'boolean' },
    isInWishlist: { control: 'boolean' },
    locale: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const sampleProduct: Product = {
  id: '1',
  handle: 'premium-wireless-headphones',
  title: 'Premium Wireless Headphones',
  images: [
    {
      url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      alt: 'Premium wireless headphones',
    },
  ],
  options: [],
  rating: { value: 4.5, count: 128 },
  variants: [
    {
      id: 'v1',
      price: { amount: 29999, currency: 'USD' },
      compareAtPrice: { amount: 39999, currency: 'USD' },
      selectedOptions: [],
      available: true,
    },
  ],
}

export const Default: Story = {
  args: {
    product: sampleProduct,
    showQuickActions: true,
    isInWishlist: false,
    locale: 'en-US',
  },
}

export const Compact: Story = {
  args: { ...Default.args, layout: 'compact' },
}

export const Featured: Story = {
  args: { ...Default.args, layout: 'featured' },
}

export const OnSale: Story = {
  args: {
    ...Default.args,
    product: { ...sampleProduct, badges: ['sale'] },
  },
}

export const NewArrival: Story = {
  args: {
    ...Default.args,
    product: {
      ...sampleProduct,
      badges: ['new'],
      variants: [
        {
          id: 'v1',
          price: { amount: 29999, currency: 'USD' },
          selectedOptions: [],
          available: true,
        },
      ],
    },
  },
}

export const InWishlist: Story = {
  args: { ...Default.args, isInWishlist: true },
}

export const WithoutQuickActions: Story = {
  args: { ...Default.args, showQuickActions: false },
}

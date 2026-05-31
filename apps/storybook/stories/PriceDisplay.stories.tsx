import type { Meta, StoryObj } from '@storybook/react'
import { PriceDisplay } from '@lumo-ui/core'

const meta: Meta<typeof PriceDisplay> = {
  title: 'Primitives/PriceDisplay',
  component: PriceDisplay,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    showDiscount: { control: 'boolean' },
    locale: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    price: { amount: 12900, currency: 'USD' },
    locale: 'en-US',
    size: 'md',
  },
}

export const WithDiscount: Story = {
  args: {
    price: { amount: 12900, currency: 'USD' },
    compareAtPrice: { amount: 17900, currency: 'USD' },
    locale: 'en-US',
    size: 'lg',
  },
}

export const Euro: Story = {
  args: {
    price: { amount: 4950, currency: 'EUR' },
    locale: 'de-DE',
    size: 'md',
  },
}

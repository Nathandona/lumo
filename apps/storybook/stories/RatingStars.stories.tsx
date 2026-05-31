import type { Meta, StoryObj } from '@storybook/react'
import { RatingStars } from '@lumo-ui/core'

const meta: Meta<typeof RatingStars> = {
  title: 'Primitives/RatingStars',
  component: RatingStars,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 5, step: 0.1 } },
    max: { control: 'number' },
    count: { control: 'number' },
    size: { control: 'select', options: ['sm', 'md'] },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { value: 4.5, count: 128, size: 'md' },
}

export const NoReviews: Story = {
  args: { value: 0, size: 'md' },
}

export const Small: Story = {
  args: { value: 3.5, count: 42, size: 'sm' },
}

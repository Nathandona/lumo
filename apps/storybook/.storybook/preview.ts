import type { Preview } from '@storybook/react'
import './theme.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Lumo is light-only (Latin "lux" = light). No dark backgrounds.
    backgrounds: {
      default: 'cream',
      values: [
        { name: 'cream', value: '#FFFDF5' },
        { name: 'white', value: '#FFFFFF' },
      ],
    },
  },
}

export default preview

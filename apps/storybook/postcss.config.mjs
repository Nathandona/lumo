// Vite (Storybook's builder) auto-loads the PostCSS config from the project
// root, not from .storybook/. Tailwind v4 uses its dedicated PostCSS plugin.
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

export default config

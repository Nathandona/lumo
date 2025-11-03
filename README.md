# Lumo UI

<div align="center">
  <h1>🌟 Lumo UI</h1>
  <p>Beautiful e-commerce components for modern React apps</p>
  <p>Built on shadcn/ui foundations with accessibility first</p>

  [![npm version](https://badge.fury.io/js/%40lumo-ui%2Fcore.svg)](https://badge.fury.io/js/%40lumo-ui%2Fcore)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
</div>

## ✨ Features

- 🎨 **Beautiful Design** - Built on shadcn/ui with consistent theming
- ♿ **Accessible First** - WCAG 2.1 AA compliant components
- 🔧 **TypeScript Native** - Full type safety with comprehensive interfaces
- ⚡ **Performance** - Optimized components with minimal bundle size
- 🎯 **E-commerce Focused** - Specialized components for online stores
- 🌙 **Dark Mode** - Built-in dark mode support
- 📱 **Responsive** - Mobile-first responsive design
- 🎭 **Customizable** - Easy theming and variant system

## 🚀 Quick Start

### Installation

```bash
# Install the core package
pnpm add @lumo-ui/core

# Install required peer dependencies
pnpm add react react-dom tailwindcss
```

### Setup

1. **Configure Tailwind CSS**

Make sure you have Tailwind CSS configured in your project:

```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@lumo-ui/core/**/*.{js,ts,jsx,tsx}',
  ],
  // ... rest of your config
}
```

2. **Import CSS**

Add the component styles to your global CSS:

```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Lumo UI styles (optional, for additional theming) */
@import '@lumo-ui/core/styles';
```

### Usage

```tsx
import { ProductCard } from '@lumo-ui/core'

function App() {
  const product = {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 199.99,
    originalPrice: 299.99,
    image: '/headphones.jpg',
    badge: 'sale',
    rating: 4.5,
    reviewCount: 128
  }

  return (
    <ProductCard
      product={product}
      onAddToCart={(product) => console.log('Added to cart:', product)}
      onToggleWishlist={(product) => console.log('Wishlist toggle:', product)}
      onQuickView={(product) => console.log('Quick view:', product)}
    />
  )
}
```

## 📦 Components

### 🛍️ Product Card

A responsive product card with variants, badges, and quick actions.

```tsx
<ProductCard
  product={{
    id: "1",
    name: "Product Name",
    price: 99.99,
    image: "/product.jpg",
    badge: "sale", // optional: 'sale' | 'new' | 'limited'
    originalPrice: 149.99, // optional
    rating: 4.5, // optional
    reviewCount: 25 // optional
  }}
  variant="default" // optional: 'default' | 'compact' | 'featured'
  onAddToCart={(product) => handleAddToCart(product)}
  onToggleWishlist={(product) => handleWishlist(product)}
  onQuickView={(product) => handleQuickView(product)}
  isInWishlist={false} // optional
  showQuickActions={true} // optional
  currency="$" // optional
/>
```

### Props

#### Product Interface

```tsx
interface Product {
  id: string
  name: string
  price: number
  image: string
  badge?: 'sale' | 'new' | 'limited'
  originalPrice?: number
  rating?: number
  reviewCount?: number
  description?: string
}
```

#### ProductCard Props

```tsx
interface ProductCardProps {
  product: Product
  variant?: 'default' | 'compact' | 'featured'
  onAddToCart?: (product: Product) => void
  onQuickView?: (product: Product) => void
  onToggleWishlist?: (product: Product) => void
  isInWishlist?: boolean
  showQuickActions?: boolean
  currency?: string
  className?: string
}
```

## 🎨 Theming

Lumo UI uses CSS variables for theming, compatible with shadcn/ui:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 84% 4.9%;
  --muted: 210 40% 96%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96%;
  --accent-foreground: 222.2 84% 4.9%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 221.2 83.2% 53.3%;
  --radius: 0.5rem;
}
```

## ♿ Accessibility

All Lumo UI components are built with accessibility in mind:

- ✅ WCAG 2.1 AA compliant
- ✅ Proper ARIA labels and roles
- ✅ Keyboard navigation support
- ✅ Screen reader compatibility
- ✅ Focus management
- ✅ Semantic HTML structure

## 🛠️ Development

### Local Development

```bash
# Clone the repository
git clone https://github.com/your-username/lumo-ui.git
cd lumo-ui

# Install dependencies
pnpm install

# Start development servers
pnpm dev

# Build all packages
pnpm build

# Run tests
pnpm test

# Lint code
pnpm lint
```

### Project Structure

```
lumo-ui/
├── packages/
│   ├── core/              # Core components
│   ├── hooks/             # Shared React hooks
│   └── utils/             # Utility functions
├── apps/
│   ├── www/               # Marketing website
│   ├── docs/              # Documentation site
│   └── storybook/         # Component playground
├── examples/
│   └── nextjs-storefront/ # Full implementation example
└── README.md
```

### Adding New Components

1. Create component in `packages/core/src/components/`
2. Export from `packages/core/src/index.ts`
3. Add comprehensive TypeScript types
4. Include accessibility features
5. Add Storybook stories
6. Write tests
7. Update documentation

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Guidelines

- Follow strict TypeScript rules (no `any` types)
- Ensure WCAG 2.1 AA compliance
- Write comprehensive tests
- Use semantic HTML
- Follow the established code style
- Add proper documentation

## 📄 License

MIT © [Lumo UI Team](LICENSE)

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Radix UI](https://www.radix-ui.com/) - Low-level UI primitives
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide React](https://lucide.dev/) - Beautiful icons

## 📞 Support

- 📖 [Documentation](https://lumo-ui.com/docs)
- 🐛 [Issues](https://github.com/your-username/lumo-ui/issues)
- 💬 [Discussions](https://github.com/your-username/lumo-ui/discussions)
- 📧 [Email](mailto:support@lumo-ui.com)

---

<div align="center">
  <p>Built with ❤️ by the Lumo UI team</p>
  <p>Star us on <a href="https://github.com/your-username/lumo-ui">GitHub</a>!</p>
</div>
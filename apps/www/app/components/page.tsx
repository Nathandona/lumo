import { Header } from "@/components/header"
import { ComponentCard } from "@/components/component-card"
import { SearchBar } from "@/components/search-bar"
import { CategoryFilter } from "@/components/category-filter"
import { Badge } from "@/components/ui/badge"

const components = [
  {
    id: "product-card",
    name: "Product Card",
    description: "Responsive product cards with variants, badges, and quick actions.",
    category: "E-commerce",
    tags: ["responsive", "badge", "interactive"],
    preview: "/previews/product-card.png",
  },
  {
    id: "rating",
    name: "Rating",
    description: "Interactive star rating component with hover effects.",
    category: "Feedback",
    tags: ["interactive", "hover", "accessible"],
    preview: "/previews/rating.png",
  },
  {
    id: "price-display",
    name: "Price Display",
    description: "Formatted price display with discount and currency support.",
    category: "E-commerce",
    tags: ["formatting", "currency", "discount"],
    preview: "/previews/price-display.png",
  },
  {
    id: "image-gallery",
    name: "Image Gallery",
    description: "Product image gallery with thumbnails and zoom functionality.",
    category: "Media",
    tags: ["gallery", "zoom", "thumbnails"],
    preview: "/previews/image-gallery.png",
  },
  {
    id: "quantity-selector",
    name: "Quantity Selector",
    description: "Accessible quantity input with increment/decrement controls.",
    category: "Forms",
    tags: ["input", "controls", "accessible"],
    preview: "/previews/quantity-selector.png",
  },
  {
    id: "wishlist-button",
    name: "Wishlist Button",
    description: "Animated wishlist toggle with heart icon and state management.",
    category: "E-commerce",
    tags: ["animated", "state", "interactive"],
    preview: "/previews/wishlist-button.png",
  },
]

const categories = ["All", "E-commerce", "Forms", "Feedback", "Media", "Navigation"]

export default function ComponentsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-gradient">Components</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Browse our collection of beautiful, accessible e-commerce components. Built with shadcn/ui and designed for production use.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-6 mb-12">
          <SearchBar placeholder="Search components..." />
          <CategoryFilter categories={categories} />
        </div>

        {/* Components Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {components.map((component) => (
            <ComponentCard key={component.id} component={component} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Badge variant="secondary" className="text-sm px-4 py-2">
            6 components • More coming soon
          </Badge>
        </div>
      </main>
    </div>
  )
}
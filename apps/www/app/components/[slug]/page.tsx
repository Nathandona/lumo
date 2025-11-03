import { Header } from "@/components/header"
import { ComponentPreview } from "@/components/component-preview"
import { ComponentCode } from "@/components/component-code"
import { ComponentProps } from "@/components/component-props"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Copy, Github } from "lucide-react"
import Link from "next/link"

const componentData = {
  "product-card": {
    name: "Product Card",
    description: "A responsive product card component with variants, badges, and quick actions. Perfect for e-commerce applications.",
    importCode: `import { ProductCard } from "@lumo-ui/core"`,
    usageCode: `<ProductCard
  product={{
    id: "1",
    name: "Premium Wireless Headphones",
    price: 299.99,
    image: "/image.jpg",
    rating: 4.5,
    badge: "sale"
  }}
  onAddToCart={(product) => console.log(product)}
/>`,
    props: [
      { name: "product", type: "Product", required: true, description: "Product data object" },
      { name: "variant", type: "'default' | 'compact' | 'featured'", default: "default", description: "Card variant style" },
      { name: "showQuickActions", type: "boolean", default: "true", description: "Show quick action buttons" },
      { name: "onAddToCart", type: "(product: Product) => void", required: true, description: "Add to cart callback" },
    ]
  }
}

interface ComponentPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { slug } = await params
  const component = componentData[slug as keyof typeof componentData]

  if (!component) {
    return <div>Component not found</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/components" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Components
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {component.name}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {component.description}
          </p>
        </div>

        {/* Preview */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Preview</h2>
          <div className="glass rounded-xl p-8 border">
            <ComponentPreview />
          </div>
        </div>

        {/* Installation */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Installation</h2>
          <div className="space-y-4">
            <div className="glass rounded-lg p-6 border">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-muted-foreground">Import</span>
                <Button variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                <code>{component.importCode}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Usage */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Usage</h2>
          <div className="glass rounded-lg p-6 border">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">Basic Usage</span>
              <Button variant="outline" size="sm">
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
            <ComponentCode code={component.usageCode} />
          </div>
        </div>

        {/* Props */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Props</h2>
          <ComponentProps props={component.props} />
        </div>

        {/* CTA */}
        <div className="text-center glass rounded-xl p-8 border">
          <h3 className="text-xl font-semibold mb-4">Start using this component</h3>
          <p className="text-muted-foreground mb-6">
            Install Lumo UI and start building beautiful e-commerce experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="hover-lift">
              Get Started
              <Github className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/docs">
                View Documentation
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
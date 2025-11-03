import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductShowcase } from "@/components/product-showcase"
import { ArrowRight, CheckCircle, Zap, Shield, Palette, Code } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center bg-gradient-to-br from-background to-muted/20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Lumo UI
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Beautiful e-commerce components for modern React apps. Built on shadcn/ui foundations with accessibility first.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8">
              Browse Components
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8">
              View on GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Lumo UI?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to build beautiful, accessible e-commerce experiences in record time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                <CardTitle>Accessible First</CardTitle>
                <CardDescription>
                  WCAG 2.1 AA compliant components with proper ARIA labels and keyboard navigation.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="h-12 w-12 text-yellow-500 mb-4" />
                <CardTitle>Production Ready</CardTitle>
                <CardDescription>
                  Copy-paste, fully customizable components that work out of the box.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Palette className="h-12 w-12 text-purple-500 mb-4" />
                <CardTitle>Beautiful Design</CardTitle>
                <CardDescription>
                  Built on shadcn/ui with consistent theming and dark mode support.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Code className="h-12 w-12 text-blue-500 mb-4" />
                <CardTitle>TypeScript Native</CardTitle>
                <CardDescription>
                  Full type safety with comprehensive interfaces and IntelliSense support.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-red-500 mb-4" />
                <CardTitle>Modern React</CardTitle>
                <CardDescription>
                  Built with React 18+ hooks, patterns, and best practices.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="h-12 w-12 text-cyan-500 mb-4" />
                <CardTitle>Performance</CardTitle>
                <CardDescription>
                  Optimized components with minimal bundle size and fast rendering.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Component Preview Section */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              See Components in Action
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Interactive previews of our core e-commerce components.
            </p>
          </div>

          <div className="bg-card rounded-lg p-8 border shadow-sm">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold mb-2">Product Card Component</h3>
              <p className="text-muted-foreground">
                Responsive product cards with variants, badges, and quick actions.
              </p>
            </div>

            <ProductShowcase />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Install Lumo UI in minutes and start building beautiful e-commerce experiences.
          </p>
          <div className="bg-muted rounded-lg p-6 mb-8 font-mono text-sm">
            <code>pnpm add @lumo-ui/core</code>
          </div>
          <Button size="lg" className="text-lg px-8">
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  )
}
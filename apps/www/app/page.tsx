import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { ProductShowcase } from "@/components/product-showcase"
import { ArrowRight, CheckCircle, Zap, Shield, Palette, Code, Sparkles, Github, Star } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-4 py-24 text-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background/50" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="mb-8 flex justify-center">
            <div className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Beautiful, accessible e-commerce components
            </div>
          </div>

          <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="text-gradient">Lumo UI</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Professional e-commerce components for modern React apps. Built with shadcn/ui, TypeScript-first, and designed for accessibility.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8 hover-lift">
              Browse Components
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 hover-lift" asChild>
              <a href="https://github.com/lumo-ui/lumo" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="font-semibold text-foreground">2.5k+</span>
              <span>Stars</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-blue-500 rounded-full" />
              <span className="font-semibold text-foreground">25+</span>
              <span>Components</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-green-500 rounded-full" />
              <span className="font-semibold text-foreground">100%</span>
              <span>TypeScript</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Why Choose <span className="text-gradient">Lumo UI</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Everything you need to build beautiful, accessible e-commerce experiences in record time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="glass hover-lift">
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                <CardTitle>Accessible First</CardTitle>
                <CardDescription className="text-base">
                  WCAG 2.1 AA compliant components with proper ARIA labels and keyboard navigation.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass hover-lift">
              <CardHeader>
                <Zap className="h-12 w-12 text-yellow-500 mb-4" />
                <CardTitle>Production Ready</CardTitle>
                <CardDescription className="text-base">
                  Copy-paste, fully customizable components that work out of the box.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass hover-lift">
              <CardHeader>
                <Palette className="h-12 w-12 text-purple-500 mb-4" />
                <CardTitle>Beautiful Design</CardTitle>
                <CardDescription className="text-base">
                  Built on shadcn/ui with consistent theming and dark mode by default.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass hover-lift">
              <CardHeader>
                <Code className="h-12 w-12 text-blue-500 mb-4" />
                <CardTitle>TypeScript Native</CardTitle>
                <CardDescription className="text-base">
                  Full type safety with comprehensive interfaces and IntelliSense support.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass hover-lift">
              <CardHeader>
                <Shield className="h-12 w-12 text-red-500 mb-4" />
                <CardTitle>Modern React</CardTitle>
                <CardDescription className="text-base">
                  Built with React 18+ hooks, patterns, and best practices.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass hover-lift">
              <CardHeader>
                <Zap className="h-12 w-12 text-cyan-500 mb-4" />
                <CardTitle>Performance</CardTitle>
                <CardDescription className="text-base">
                  Optimized components with minimal bundle size and fast rendering.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Component Preview Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              See Components in <span className="text-gradient">Action</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Interactive previews of our core e-commerce components with live demos.
            </p>
          </div>

          <div className="glass rounded-xl p-8 border">
            <ProductShowcase />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-muted/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Get <span className="text-gradient">Started</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Install Lumo UI in minutes and start building beautiful e-commerce experiences.
          </p>

          <div className="glass rounded-lg p-6 mb-12 font-mono text-sm border">
            <code>pnpm add @lumo-ui/core</code>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 hover-lift">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 hover-lift" asChild>
              <a href="/components">
                Browse Components
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-gradient mb-4">Lumo UI</h3>
              <p className="text-sm text-muted-foreground">
                Beautiful, accessible e-commerce components for modern React apps.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/components" className="hover:text-foreground transition-colors">Components</a></li>
                <li><a href="/docs" className="hover:text-foreground transition-colors">Documentation</a></li>
                <li><a href="/examples" className="hover:text-foreground transition-colors">Examples</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/docs/installation" className="hover:text-foreground transition-colors">Installation</a></li>
                <li><a href="/docs/theming" className="hover:text-foreground transition-colors">Theming</a></li>
                <li><a href="/docs/accessibility" className="hover:text-foreground transition-colors">Accessibility</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="https://github.com/lumo-ui/lumo" className="hover:text-foreground transition-colors">GitHub</a></li>
                <li><a href="https://discord.gg" className="hover:text-foreground transition-colors">Discord</a></li>
                <li><a href="https://twitter.com" className="hover:text-foreground transition-colors">Twitter</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Lumo UI. Built with ❤️ using shadcn/ui.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
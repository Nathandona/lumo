import Link from "next/link"
import { Header } from "@/components/header"
import { ComponentCode } from "@/components/component-code"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Terminal, Zap } from "lucide-react"
import { GithubIcon } from "@/components/icons"

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-gradient">Documentation</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Everything you need to get started with Lumo UI. From installation to advanced usage.
          </p>
        </div>

        {/* Installation */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Installation</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card className="glass border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="h-5 w-5" />
                  Package Manager
                </CardTitle>
                <CardDescription>
                  Install Lumo UI using your preferred package manager
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">pnpm</span>
                    <Badge variant="secondary">Recommended</Badge>
                  </div>
                  <div className="glass rounded-lg p-4 border">
                    <ComponentCode code="pnpm add @lumo-ui/core" />
                  </div>
                </div>

                <div>
                  <span className="text-sm font-medium">npm</span>
                  <div className="glass rounded-lg p-4 border">
                    <ComponentCode code="npm install @lumo-ui/core" />
                  </div>
                </div>

                <div>
                  <span className="text-sm font-medium">yarn</span>
                  <div className="glass rounded-lg p-4 border">
                    <ComponentCode code="yarn add @lumo-ui/core" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Quick Start
                </CardTitle>
                <CardDescription>
                  Get up and running in minutes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold mt-0.5">1</div>
                    <div>
                      <div className="font-medium mb-1">Install the package</div>
                      <div className="text-muted-foreground">
                        Run the installation command for your package manager
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold mt-0.5">2</div>
                    <div>
                      <div className="font-medium mb-1">Configure your project</div>
                      <div className="text-muted-foreground">
                        Set up the required CSS variables and providers
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold mt-0.5">3</div>
                    <div>
                      <div className="font-medium mb-1">Start building</div>
                      <div className="text-muted-foreground">
                        Import and use components in your React app
                      </div>
                    </div>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Configuration */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Configuration</h2>

          <div className="space-y-8">
            <Card className="glass border">
              <CardHeader>
                <CardTitle>Tailwind CSS Setup</CardTitle>
                <CardDescription>
                  Configure Tailwind CSS to include Lumo UI styles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="glass rounded-lg p-4 border">
                  <ComponentCode code={`// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@lumo-ui/core/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@lumo-ui/core')],
}`} />
                </div>
              </CardContent>
            </Card>

            <Card className="glass border">
              <CardHeader>
                <CardTitle>CSS Variables</CardTitle>
                <CardDescription>
                  Add the required CSS variables to your global stylesheet
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="glass rounded-lg p-4 border">
                  <ComponentCode code={`/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    /* ... other variables */
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... other variables */
  }
}`} />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Usage */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Basic Usage</h2>

          <Card className="glass border">
            <CardHeader>
              <CardTitle>Import and Use Components</CardTitle>
              <CardDescription>
                Start using Lumo UI components in your React application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="glass rounded-lg p-4 border">
                <ComponentCode code={`import { ProductCard, Button, Rating } from '@lumo-ui/core'

function App() {
  const product = {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    image: '/headphones.jpg',
    rating: 4.5
  }

  return (
    <div>
      <ProductCard
        product={product}
        onAddToCart={(product) => console.log('Added:', product)}
      />
      <Button>Add to Cart</Button>
      <Rating value={4} readonly />
    </div>
  )
}`} />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="glass border">
              <CardHeader>
                <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
                <CardTitle>TypeScript First</CardTitle>
                <CardDescription>
                  Full type safety with comprehensive interfaces and IntelliSense support.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass border">
              <CardHeader>
                <CheckCircle className="h-8 w-8 text-blue-500 mb-2" />
                <CardTitle>Accessible by Default</CardTitle>
                <CardDescription>
                  WCAG 2.1 AA compliant components with proper ARIA labels and keyboard navigation.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass border">
              <CardHeader>
                <CheckCircle className="h-8 w-8 text-purple-500 mb-2" />
                <CardTitle>Dark Mode Ready</CardTitle>
                <CardDescription>
                  Built-in dark mode support with smooth theme switching.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass border">
              <CardHeader>
                <CheckCircle className="h-8 w-8 text-yellow-500 mb-2" />
                <CardTitle>Customizable</CardTitle>
                <CardDescription>
                  Easy to customize with CSS variables and theme configuration.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass border">
              <CardHeader>
                <CheckCircle className="h-8 w-8 text-red-500 mb-2" />
                <CardTitle>Tree Shakeable</CardTitle>
                <CardDescription>
                  Only include the components you use for optimal bundle size.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass border">
              <CardHeader>
                <CheckCircle className="h-8 w-8 text-cyan-500 mb-2" />
                <CardTitle>Modern React</CardTitle>
                <CardDescription>
                  Built with React 18+ hooks, patterns, and best practices.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Next Steps */}
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Building?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Dive into our component library and start building beautiful e-commerce experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="hover-lift" asChild>
              <Link href="/components">
                Browse Components
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="hover-lift" asChild>
              <a href="https://github.com/lumo-ui/lumo" target="_blank" rel="noopener noreferrer">
                <GithubIcon className="mr-2 h-4 w-4" />
                View on GitHub
              </a>
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}
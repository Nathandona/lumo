import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Lumo UI - Professional E-commerce Components",
  description: "Beautiful, accessible e-commerce components for modern React apps. Built with shadcn/ui, TypeScript-first, and dark mode by default.",
  keywords: ["React", "Components", "E-commerce", "UI", "shadcn/ui", "TypeScript", "Dark Mode", "Professional"],
  authors: [{ name: "Lumo UI Team" }],
  openGraph: {
    title: "Lumo UI - Professional E-commerce Components",
    description: "Beautiful, accessible e-commerce components for modern React apps",
    type: "website",
    url: "https://lumo-ui.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lumo UI Component Library",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumo UI - Professional E-commerce Components",
    description: "Beautiful, accessible e-commerce components for modern React apps",
    images: ["/og-image.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
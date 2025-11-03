import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Lumo UI - Beautiful E-commerce Components",
  description: "Beautiful e-commerce components for modern React apps. Built on shadcn/ui foundations with accessibility first.",
  keywords: ["React", "Components", "E-commerce", "UI", "shadcn/ui", "TypeScript"],
  authors: [{ name: "Lumo UI Team" }],
  openGraph: {
    title: "Lumo UI - Beautiful E-commerce Components",
    description: "Beautiful e-commerce components for modern React apps",
    type: "website",
    url: "https://lumo-ui.com",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
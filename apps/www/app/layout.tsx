import type { Metadata } from "next"
import { Bricolage_Grotesque, Hanken_Grotesk, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollReveal } from "@/components/scroll-reveal"

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
})

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
})

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://lumo-www.vercel.app"),
  icons: { icon: "/icon.svg" },
  title: "Lumo UI - Luminous e-commerce components",
  description:
    "A warm, accessible, headless registry of e-commerce components for React. Copy them into your project with the shadcn CLI and own every line.",
  keywords: ["React", "Components", "E-commerce", "shadcn", "Tailwind", "TypeScript", "Headless", "Accessible"],
  authors: [{ name: "Lumo UI" }],
  openGraph: {
    title: "Lumo UI - Luminous e-commerce components",
    description: "A warm, accessible, headless registry of e-commerce components for React.",
    type: "website",
    url: "https://lumo-www.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumo UI - Luminous e-commerce components",
    description: "A warm, accessible, headless registry of e-commerce components for React.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: "try{document.documentElement.classList.add('js-reveal')}catch(e){}",
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
        <ScrollReveal />
        <Analytics />
      </body>
    </html>
  )
}

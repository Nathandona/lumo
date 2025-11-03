"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"

interface ComponentProps {
  component: {
    id: string
    name: string
    description: string
    category: string
    tags: string[]
    preview: string
  }
}

export function ComponentCard({ component }: ComponentProps) {
  return (
    <Card className="group hover-lift glass border">
      <CardHeader className="pb-3">
        <div className="aspect-video bg-muted rounded-md mb-4 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
            <div className="text-4xl opacity-20">🎨</div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg group-hover:text-gradient transition-colors">
              {component.name}
            </h3>
            <Badge variant="secondary" className="text-xs">
              {component.category}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {component.description}
          </p>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-1 mb-4">
          {component.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <Link
          href={`/components/${component.id}`}
          className="inline-flex items-center text-sm font-medium text-primary hover:gap-1 transition-all"
        >
          View Component
          <ArrowRight className="h-3 w-3 ml-1" />
        </Link>
      </CardContent>
    </Card>
  )
}
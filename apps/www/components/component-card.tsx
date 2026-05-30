"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

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
    <Card className="group hover-lift glass rounded-2xl">
      <CardHeader className="pb-3">
        <div className="mb-4 aspect-video overflow-hidden rounded-xl border">
          <div className="mesh-card flex h-full w-full items-center justify-center">
            <span className="font-display text-lg font-bold text-[hsl(var(--primary-foreground))]/70">
              {component.name}
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-display text-lg font-semibold tracking-tight transition-colors group-hover:text-honey">
              {component.name}
            </h3>
            <Badge variant="secondary" className="shrink-0 text-xs">
              {component.category}
            </Badge>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {component.description}
          </p>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="mb-4 flex flex-wrap gap-1.5">
          {component.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <Link
          href={`/components/${component.id}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-honey transition-all hover:gap-2"
        >
          View component
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </CardContent>
    </Card>
  )
}

import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ComponentPropsProps {
  props: Array<{
    name: string
    type: string
    required?: boolean
    default?: string
    description: string
  }>
}

export function ComponentProps({ props }: ComponentPropsProps) {
  return (
    <div className="glass rounded-lg border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Prop</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Default</TableHead>
            <TableHead className="text-right">Required</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.map((prop, index) => (
            <TableRow key={index}>
              <TableCell className="font-mono text-sm">{prop.name}</TableCell>
              <TableCell className="font-mono text-sm text-muted-foreground">
                {prop.type}
              </TableCell>
              <TableCell className="font-mono text-sm text-muted-foreground">
                {prop.default || "-"}
              </TableCell>
              <TableCell className="text-right">
                {prop.required && (
                  <Badge variant="destructive" className="text-xs">
                    Required
                  </Badge>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="border-t bg-muted/50 p-4">
        <p className="text-sm text-muted-foreground">
          All props accept standard HTML attributes unless otherwise specified.
        </p>
      </div>
    </div>
  )
}
import { cn } from "@/lib/utils"

interface ProseProps {
  as?: React.ElementType
  className?: string
  children?: React.ReactNode
}

export function Prose({
  as: Component = "div",
  className,
  ...props
}: ProseProps) {
  return (
    <Component
      className={cn("prose dark:prose-invert", className)}
      {...props}
    />
  )
}

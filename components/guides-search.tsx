import { cn } from "@/lib/utils"

import { Input, InputProps } from "./ui/input"

interface GuidesSearch extends InputProps {}

export function GuidesSearch({ className, ...props }: GuidesSearch) {
  return (
    <div>
      <Input
        placeholder="Search for guides"
        className={cn(className)}
        {...props}
      />
    </div>
  )
}

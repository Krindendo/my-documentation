import { cn } from "@/lib/utils"

interface CalloutProps {
  icon?: React.ReactNode
  children?: React.ReactNode
  className?: string
  type?: "default" | "warning" | "danger"
}

export function Callout({
  children,
  icon,
  type = "default",
  className,
  ...props
}: CalloutProps) {
  return (
    <div
      className={cn("my-6 flex items-start rounded-md border border-l-4 p-4", {
        "border-red-600 bg-red-50 dark:bg-transparent": type === "danger",
        "border-yellow-500 bg-yellow-50 dark:bg-transparent":
          type === "warning",
      })}
      {...props}
    >
      {icon && <span className="mr-4 text-2xl">{icon}</span>}
      <div className={cn("w-full", className)}>{children}</div>
    </div>
  )
}

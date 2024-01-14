import * as React from "react"
import Link, { LinkProps } from "next/link"
import { cva, VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-0.5 overflow-hidden rounded-full text-sm font-medium ring-offset-background transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-sky-400/10 dark:text-teal-400 dark:ring-1 dark:ring-inset dark:ring-teal-400/20 dark:hover:bg-sky-400/10 dark:hover:text-teal-300 dark:hover:ring-teal-300",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800/40 dark:text-zinc-400 dark:ring-1 dark:ring-inset dark:ring-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-300",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        filled:
          " bg-zinc-900 text-zinc-700 ring-1 ring-inset ring-zinc-900/10 hover:bg-zinc-900/5 hover:text-zinc-900 dark:text-zinc-400 dark:ring-white/10 dark:hover:bg-white/5 dark:hover:text-white",
        link: "text-teal-500 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-500 underline-offset-4 hover:underline",
      },
      size: {
        default: "py-1 px-3",
        sm: "py-0.5 px-2",
        lg: "py-2.5 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface BaseType extends VariantProps<typeof buttonVariants> {
  asLink?: boolean
}

interface ButtonType
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    BaseType {}

interface LinkType extends LinkProps, BaseType {
  className: string
  asLink?: true
}

type ButtonProps = ButtonType | LinkType

const Button = ({ ...props }: ButtonProps) => {
  if (props.asLink) {
    const { className, variant, size, asLink, ...rest } = props as LinkType
    return (
      <Link
        className={cn(buttonVariants({ variant, size, className }))}
        {...rest}
      />
    )
  }
  const { className, variant, size, asLink, ...rest } = props as ButtonType

  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...rest}
    />
  )
}

// const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
//   ({ className, variant, size, ...props }, ref) => {

//     return (
//       <button
//         className={cn(buttonVariants({ variant, size, className }))}
//         ref={ref}
//         {...props}
//       />
//     )
//   }
// )
// Button.displayName = "Button"

//export { Button }

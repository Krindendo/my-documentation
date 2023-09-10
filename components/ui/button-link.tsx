import * as React from "react"
import Link, { LinkProps } from "next/link"
import { cva, VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

import { buttonVariants } from "./button"

export interface ButtonLinkProps
  extends LinkProps,
    VariantProps<typeof buttonVariants> {
  className?: string
}

const ButtonLink = ({
  className,
  variant,
  size,
  ...props
}: ButtonLinkProps) => {
  return (
    <Link
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { ButtonLink, buttonVariants }

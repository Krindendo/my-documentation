import * as React from "react"
import Link, { LinkProps } from "next/link"
import { VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export interface ButtonLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>,
    LinkProps,
    VariantProps<typeof buttonVariants> {}

const ButtonLink = ({
  className,
  variant,
  size,
  target,
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

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

import { Icons } from "./icons"
import { ModeToggle } from "./mode-toggle"

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Link href="/">
            <Icons.logo />
          </Link>
        </div>
        <ModeToggle />
      </div>
    </footer>
  )
}

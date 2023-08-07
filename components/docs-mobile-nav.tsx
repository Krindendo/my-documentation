import * as React from "react"
import Link from "next/link"
import { DocsNavItem } from "@/types"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { useLockBody } from "@/hooks/use-lock-body"

import { Icons } from "./icons"

interface DocsMobileNavProps {
  items: DocsNavItem[]
  children?: React.ReactNode
}

export function DocsMobileNav({ items, children }: DocsMobileNavProps) {
  useLockBody()

  return (
    <div
      className={cn(
        "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden"
      )}
    >
      <Link href="/" className="flex items-center space-x-2">
        <Icons.logo />
        <span className="font-bold">{siteConfig.name}</span>
      </Link>
      <nav>
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.disabled ? "#" : item.href}
            className={cn(
              "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
              item.disabled && "cursor-not-allowed opacity-60"
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
      {children}
    </div>
  )
}

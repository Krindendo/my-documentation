"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { SidebarNavItem } from "@/types"

import { cn } from "@/lib/utils"

export interface DocsSidebarNavProps {
  items: SidebarNavItem[]
}

export function DocsSidebarNav({ items }: DocsSidebarNavProps) {
  const pathname = usePathname()

  if (!items.length) return null

  return (
    <div className="w-full">
      {items.map((item, index) => (
        <div key={index} className="pb-8">
          <h4>{item.title}</h4>
          {item.items ? (
            <DocsSidebarNavItem items={item.items} pathname={pathname} />
          ) : null}
        </div>
      ))}
    </div>
  )
}

interface DocsSidebarNavItemsProps {
  items: SidebarNavItem[]
  pathname: string | null
}

export function DocsSidebarNavItem({
  items,
  pathname,
}: DocsSidebarNavItemsProps) {
  if (!items?.length) return null

  return (
    <div className="grid grid-flow-row auto-rows-max text-sm">
      {items.map((item, index) =>
        !item.disabled && item.href ? (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "flex w-full items-center rounded-md p-2 hover:underline",
              {
                "bg-muted": pathname === item.href,
              }
            )}
          >
            {item.title}
          </Link>
        ) : (
          <span className="flex w-full items-center rounded-md p-2 opacity-60">
            {item.title}
          </span>
        )
      )}
    </div>
  )
}

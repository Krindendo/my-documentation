"use client"

import * as React from "react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

import { docsConfig } from "@/config/docs"
import { cn } from "@/lib/utils"

import { Logo } from "./logo"

export function NavMain() {
  const segment = useSelectedLayoutSegment()

  return (
    <div className="mr-4 hidden md:flex">
      <Logo className="mr-6 flex items-center space-x-2" />

      <nav className="flex items-center space-x-6 text-sm font-medium">
        {docsConfig.mainNav?.map((item, index) => (
          <Link
            key={index}
            href={item.disabled ? "#" : item.href}
            className={cn(
              "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
              item.href.startsWith(`/${segment}`)
                ? "text-foreground"
                : "text-foreground/60",
              item.disabled && "cursor-not-allowed opacity-80"
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  )
}

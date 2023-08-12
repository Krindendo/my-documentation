"use client"

import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

import { Input } from "./ui/input"

interface DocsSearchProps extends React.HTMLAttributes<HTMLFormElement> {}

export function DocsSearch({ className, ...props }: DocsSearchProps) {
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const focusOnInput = (event: KeyboardEvent) => {
      if (event.altKey && event.key === "k") {
        searchRef.current?.focus()
      }
    }
    document.addEventListener("keydown", focusOnInput)
    return () => {
      document.removeEventListener("keydown", focusOnInput)
    }
  }, [])

  function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()

    console.log("searched:" + searchRef.current?.value)
  }
  return (
    <form
      onSubmit={onSubmit}
      className={cn("relative w-full", className)}
      {...props}
    >
      <Input
        ref={searchRef}
        type="search"
        placeholder="Search documentation..."
        className="h-8 w-full sm:w-64 sm:pr-20"
      />
      <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex">
        <span className="text-xs">Alt + K</span>
      </kbd>
    </form>
  )
}

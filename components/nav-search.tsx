"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { CircleIcon, FileIcon } from "lucide-react"

import { docsConfig } from "@/config/docs"

import { Icons } from "./icons"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command"

export function NavSearch() {
  let [modifierKey, setModifierKey] = React.useState<string>("Ctrl")
  let { buttonProps, dialogProps } = useSearchProps()

  React.useEffect(() => {
    let platform =
      (navigator as any)?.userAgentData?.platform ||
      navigator?.platform ||
      "unknown"
    setModifierKey(/(Mac|iPhone|iPod|iPad)/i.test(platform) ? "⌘" : "Ctrl")
  }, [])

  return (
    <div className="hidden lg:block lg:max-w-sm lg:flex-auto">
      <button
        type="button"
        className="hidden h-8 w-full items-center gap-2 rounded-full bg-white pl-2 pr-3 text-sm text-zinc-500 ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 dark:bg-white/5 dark:text-zinc-400 dark:ring-inset dark:ring-white/10 dark:hover:ring-white/20 lg:flex focus:[&:not(:focus-visible)]:outline-none"
        {...buttonProps}
      >
        <Icons.search className="h-4 w-4 stroke-current" />
        Search documentation...
        <kbd className="ml-auto text-xs text-zinc-400 dark:text-zinc-500">
          <kbd className="pr-1 font-sans">{modifierKey}</kbd>
          <kbd className="font-sans">K</kbd>
        </kbd>
      </button>
      <SearchDialog {...dialogProps} />
    </div>
  )
}

export function NavSearchMobile() {
  let { buttonProps, dialogProps } = useSearchProps()

  return (
    <div className="contents lg:hidden">
      <button
        type="button"
        className="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5 lg:hidden focus:[&:not(:focus-visible)]:outline-none"
        aria-label="Find something..."
        {...buttonProps}
      >
        <Icons.search className="h-5 w-5 stroke-zinc-900 dark:stroke-white" />
      </button>
      <SearchDialog {...dialogProps} />
    </div>
  )
}

function useSearchProps() {
  let buttonRef = React.useRef<HTMLButtonElement>(null)
  let [open, setOpen] = React.useState(false)

  return {
    buttonProps: {
      ref: buttonRef,
      onClick() {
        setOpen(true)
      },
    },
    dialogProps: {
      open,
      setOpen(open: boolean) {
        if (!buttonRef.current) {
          return
        }
        let { width, height } = buttonRef.current.getBoundingClientRect()
        if (!open || (width !== 0 && height !== 0)) {
          setOpen(open)
        }
      },
    },
  }
}

interface SearchDialogProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function SearchDialog({ open, setOpen }: SearchDialogProps) {
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [setOpen])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList className="scrollbar">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Links">
          {docsConfig.mainNav
            .filter((navitem) => !navitem.disabled)
            .map((navItem) => (
              <CommandItem
                key={navItem.href}
                value={navItem.title}
                onSelect={() => {
                  runCommand(() => router.push(navItem.href as string))
                }}
              >
                <FileIcon className="mr-2 h-4 w-4" />
                {navItem.title}
              </CommandItem>
            ))}
        </CommandGroup>
        {docsConfig.sidebarNav.map((group) => (
          <CommandGroup key={group.title} heading={group.title}>
            {group.items?.map((navItem) => (
              <CommandItem
                key={navItem.href}
                value={navItem.href}
                onSelect={() => {
                  runCommand(() => router.push(navItem.href as string))
                }}
              >
                <div className="mr-2 flex h-4 w-4 items-center justify-center">
                  <CircleIcon className="h-3 w-3" />
                </div>
                {navItem.title}
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
        <CommandSeparator />
      </CommandList>
    </CommandDialog>
  )
}

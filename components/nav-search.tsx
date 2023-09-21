"use client"

//TODO: change navigator.platform
import * as React from "react"

import { Icons } from "./icons"

export function NavSearch() {
  let [modifierKey, setModifierKey] = React.useState<string>("")
  let { buttonProps, dialogProps } = useSearchProps()

  React.useEffect(() => {
    setModifierKey(
      /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) ? "⌘" : "Ctrl "
    )
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
          <kbd className="font-sans">{modifierKey}</kbd>
          <kbd className="font-sans">K</kbd>
        </kbd>
      </button>
      <SearchDialog className="hidden lg:block" {...dialogProps} />
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
      <SearchDialog className="lg:hidden" {...dialogProps} />
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
  setOpen: (open: boolean) => void
  className: string
}

function SearchDialog({ open, setOpen, className }: SearchDialogProps) {
  return <></>
}

import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import { Icons } from "./icons"
import { NavMain } from "./nav-main"
import { NavMobile } from "./nav-mobile"
import { NavSearch } from "./nav-search"
import { buttonVariants } from "./ui/button"

export function SiteHeader() {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <NavMain />
        <NavMobile />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <NavSearch />
          </div>
          <nav className="flex items-center">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "w-9 px-0"
                )}
              >
                <Icons.gitHub className="h-6 w-6" />
              </div>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

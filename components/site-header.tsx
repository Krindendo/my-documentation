"use client"

import * as React from "react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import { SidebarNavItem } from "@/types"
import { motion, useScroll, useTransform } from "framer-motion"

import { docsConfig } from "@/config/docs"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { ButtonLink } from "@/components/ui/button-link"
import { Icons } from "@/components/icons"
import { Logo } from "@/components/logo"
import { ModeToggle } from "@/components/mode-toggle"
import {
  SiteSidebarMobile,
  useIsInsideMobileNavigation,
  useMobileNavigationStore,
} from "@/components/site-sidebar-mobile"

interface SiteHeaderProps extends React.HtmlHTMLAttributes<HTMLDivElement> {}

export const SiteHeader = React.forwardRef<HTMLDivElement, SiteHeaderProps>(
  ({ className, ...props }, ref) => {
    const segment = useSelectedLayoutSegment()
    let { isOpen: mobileNavIsOpen } = useMobileNavigationStore()
    let isInsideMobileNavigation = useIsInsideMobileNavigation()

    let { scrollY } = useScroll()
    let bgOpacityLight = useTransform(scrollY, [0, 72], [0.5, 0.9])
    let bgOpacityDark = useTransform(scrollY, [0, 72], [0.2, 0.8])

    return (
      <motion.div
        ref={ref}
        className={cn(
          className,
          "fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-12 px-4 transition sm:px-6 lg:left-72 lg:z-30 lg:px-8 xl:left-80",
          !isInsideMobileNavigation &&
            "backdrop-blur-sm dark:backdrop-blur lg:left-72 xl:left-80",
          isInsideMobileNavigation
            ? "bg-white dark:bg-zinc-900"
            : "bg-white/[var(--bg-opacity-light)] dark:bg-zinc-900/[var(--bg-opacity-dark)]"
        )}
        style={{
          "--bg-opacity-light": bgOpacityLight,
          "--bg-opacity-dark": bgOpacityDark,
        }}
      >
        <div
          className={cn(
            "absolute inset-x-0 top-full h-px transition",
            (isInsideMobileNavigation || !mobileNavIsOpen) &&
              "bg-zinc-900/7.5 dark:bg-white/7.5"
          )}
        />
        <div className="flex items-center gap-5 lg:hidden">
          <SiteSidebarMobile />
          <Logo />
        </div>
        {/* <Search /> */}
        <div className="ml-auto flex items-center gap-5">
          <nav className="hidden md:block">
            <ul role="list" className="flex items-center gap-8">
              {docsConfig.mainNav?.map((item, index) => (
                <li key={index}>
                  <Link
                    key={index}
                    href={item.disabled ? "#" : item.href}
                    className={cn(
                      "text-sm leading-5 transition hover:text-foreground/80",
                      item.href.startsWith(`/${segment}`)
                        ? "text-foreground"
                        : "text-foreground/60",
                      item.disabled && "cursor-not-allowed opacity-80"
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:dark:bg-white/15 hidden md:block md:h-5 md:w-px md:bg-zinc-900/10" />
          <div className="flex gap-4">
            {/* <SearchMobile /> */}
            <ModeToggle />
          </div>
          <div className="hidden min-[416px]:contents">
            <ButtonLink
              variant="ghost"
              size="sm"
              className="w-9"
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <Icons.gitHub className="h-6 w-6" />
            </ButtonLink>
          </div>
        </div>
      </motion.div>
    )
  }
)
SiteHeader.displayName = "SiteHeader"

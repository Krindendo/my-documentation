"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useSelectedLayoutSegment } from "next/navigation"
import { SidebarNavItem } from "@/types"
import { AnimatePresence, motion, useIsPresent } from "framer-motion"
import { useStore } from "zustand"

import { docsConfig } from "@/config/docs"
import { siteConfig } from "@/config/site"
import { remToPx } from "@/lib/remToPx"
import { cn } from "@/lib/utils"
import { ButtonLink } from "@/components/ui/button-link"
import { useSectionStore } from "@/components/site-provider"
import { useIsInsideMobileNavigation } from "@/components/site-sidebar-mobile"

import { Icons } from "./icons"

function useInitialValue(value: any, condition = true) {
  let initialValue = React.useRef(value).current
  return condition ? initialValue : value
}

interface NavLinkProps {
  href: string
  active?: boolean
  isAnchorLink?: boolean
  children: React.ReactNode
}

function NavLink({
  href,
  active,
  isAnchorLink = false,
  children,
}: NavLinkProps) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex justify-between gap-2 py-1 pr-3 text-sm transition",
        isAnchorLink ? "pl-7" : "pl-4",
        active
          ? "text-zinc-900 dark:text-white"
          : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
      )}
    >
      <span className="truncate">{children}</span>
    </Link>
  )
}

function VisibleSectionHighlight({
  group,
  pathname,
}: {
  group: SidebarNavItem
  pathname: string
}) {
  const store = useSectionStore()
  const sectionIds = useStore(store, (s) => s.sectionIds)
  const visibleSections = useStore(store, (s) => s.visibleSections)

  // let [sectionIds, visibleSections] = useInitialValue(
  //   [
  //     useSectionStore().getState().sectionIds,
  //     useSectionStore().getState().visibleSections,
  //   ],
  //   useIsInsideMobileNavigation()
  // )

  const isPresent = useIsPresent()
  //const itemHeight = React.useMemo(() => remToPx(2), []) //treba da bude 30px
  const itemHeight = 28

  const firstVisibleSectionIndex = React.useMemo(
    () =>
      Math.max(
        0,
        sectionIds.findIndex((section) => section === visibleSections[0])
      ),
    [sectionIds, visibleSections]
  )

  const height = React.useMemo(
    () =>
      isPresent ? Math.max(1, visibleSections.length) * itemHeight : itemHeight,

    [isPresent, visibleSections, itemHeight]
  )

  const top = React.useMemo(() => {
    const firstItemIndex =
      group.items?.findIndex((item) => item.href === pathname) ?? 0
    return firstItemIndex * itemHeight + firstVisibleSectionIndex * itemHeight
  }, [group, itemHeight, firstVisibleSectionIndex, pathname])

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      className="absolute inset-x-0 top-0 bg-zinc-800/5 will-change-transform dark:bg-white/5"
      style={{ borderRadius: 8, height, top }}
    />
  )
}

function ActivePageMarker({
  group,
  pathname,
}: {
  group: SidebarNavItem
  pathname: string
}) {
  let itemHeight = remToPx(2)
  let offset = remToPx(0.25)
  let activePageIndex =
    group.items?.findIndex((item) => item.href === pathname) ?? 0
  let top = offset + activePageIndex * itemHeight

  return (
    <motion.div
      layout
      className="absolute left-2 h-6 w-px bg-teal-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      style={{ top }}
    />
  )
}

interface NavigationGroupProps {
  group: SidebarNavItem
  className?: string
}

function NavigationGroup({ group, className }: NavigationGroupProps) {
  // If this is the mobile navigation then we always render the initial
  // state, so that the state does not change during the close animation.
  // The state will still update when we re-open (re-render) the navigation.
  let isInsideMobileNavigation = useIsInsideMobileNavigation()

  const store = useSectionStore()
  const sections = useStore(store, (s) => s.sections)
  const sectionIds1 = useStore(store, (s) => s.sectionIds)

  let [pathname, sectionIds] = useInitialValue(
    [usePathname(), sectionIds1],
    isInsideMobileNavigation
  )

  let isActiveGroup =
    group.items?.findIndex((link) => link.href === pathname) !== -1

  return (
    <li className={cn("relative mt-6", className)}>
      <motion.h2
        layout="position"
        className="text-xs font-semibold text-zinc-900 dark:text-white"
      >
        {group.title}
      </motion.h2>
      <div className="relative mt-3 pl-2">
        <AnimatePresence initial={!isInsideMobileNavigation}>
          {isActiveGroup && (
            <VisibleSectionHighlight group={group} pathname={pathname} />
          )}
        </AnimatePresence>
        <motion.div
          layout
          className="absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:bg-white/5"
        />
        <AnimatePresence initial={false}>
          {isActiveGroup && (
            <ActivePageMarker group={group} pathname={pathname} />
          )}
        </AnimatePresence>
        <ul role="list" className="border-l border-transparent">
          {group.items?.map((item) => (
            <motion.li key={item.href} layout="position" className="relative">
              <NavLink href={item.href} active={item.href === pathname}>
                {item.title}
              </NavLink>
              <AnimatePresence mode="popLayout" initial={false}>
                {item.href === pathname &&
                  sections.items?.length !== undefined &&
                  sections.items?.length > 0 && (
                    <motion.ul
                      role="list"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: { delay: 0.1 },
                      }}
                      exit={{
                        opacity: 0,
                        transition: { duration: 0.15 },
                      }}
                    >
                      {sections.items?.map((section) => (
                        <li key={section.url}>
                          <NavLink href={section.url} isAnchorLink>
                            {section.title}
                          </NavLink>
                        </li>
                      ))}
                    </motion.ul>
                  )}
              </AnimatePresence>
            </motion.li>
          ))}
        </ul>
      </div>
    </li>
  )
}

interface SiteSidebarProps {
  className?: string
}

export function SiteSidebar({ ...props }: SiteSidebarProps) {
  const segment = useSelectedLayoutSegment()
  return (
    <nav {...props}>
      <ul role="list">
        {docsConfig.mainNav?.map((item, index) => (
          <li key={index} className="md:hidden">
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

        {docsConfig.sidebarNav.map((group, groupIndex) => (
          <NavigationGroup
            key={group.title}
            group={group}
            className={groupIndex === 0 ? "md:mt-0" : undefined}
          />
        ))}
        <li className="sticky bottom-0 z-10 mt-6 min-[416px]:hidden">
          <ButtonLink
            variant="filled"
            size="sm"
            className="w-full"
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
          >
            <Icons.gitHub className="h-6 w-6" />
          </ButtonLink>
        </li>
      </ul>
    </nav>
  )
}

"use client"

import { useRef } from "react"
import Link from "next/link"
import { useRouter, useSelectedLayoutSegment } from "next/navigation"
import { SidebarNavItem } from "@/types"
import { AnimatePresence, motion, useIsPresent } from "framer-motion"

import { docsConfig } from "@/config/docs"
import { siteConfig } from "@/config/site"
import { remToPx } from "@/lib/remToPx"
import { cn } from "@/lib/utils"
import { ButtonLink } from "@/components/ui/button-link"
import { Tag } from "@/components/ui/tag"
import { useSectionStore } from "@/components/site-provider"
import { useIsInsideMobileNavigation } from "@/components/site-sidebar-mobile"

import { Icons } from "./icons"

function useInitialValue(value, condition = true) {
  let initialValue = useRef(value).current
  return condition ? initialValue : value
}

interface NavLinkProps {
  href: string
  tag?: string
  active?: boolean
  isAnchorLink?: boolean
  children: React.ReactNode
}

function NavLink({
  href,
  tag,
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
      {tag && <Tag variant="zinc">{tag}</Tag>}
    </Link>
  )
}

function VisibleSectionHighlight({ group, pathname }) {
  let [sections, visibleSections] = useInitialValue(
    [
      useSectionStore((s) => s.sections),
      useSectionStore((s) => s.visibleSections),
    ],
    useIsInsideMobileNavigation()
  )

  console.log("sections", sections)

  let isPresent = useIsPresent()
  let firstVisibleSectionIndex = Math.max(
    0,
    [{ id: "_top" }, ...sections].findIndex(
      (section) => section.id === visibleSections[0]
    )
  )
  let itemHeight = remToPx(2)
  let height = isPresent
    ? Math.max(1, visibleSections.length) * itemHeight
    : itemHeight
  let top =
    group.links.findIndex((link) => link.href === pathname) * itemHeight +
    firstVisibleSectionIndex * itemHeight

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      className="bg-zinc-800/2.5 dark:bg-white/2.5 absolute inset-x-0 top-0 will-change-transform"
      style={{ borderRadius: 8, height, top }}
    />
  )
}

function ActivePageMarker({ group, pathname }) {
  let itemHeight = remToPx(2)
  let offset = remToPx(0.25)
  let activePageIndex = group.links.findIndex((link) => link.href === pathname)
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

  let [router, sections] = useInitialValue(
    [useRouter(), useSectionStore((s) => s.sections)],
    isInsideMobileNavigation
  )

  //console.log("router", router.pathname)

  let isActiveGroup =
    group.items?.findIndex((link) => link.href === router.pathname) !== -1

  console.log("sections", sections)

  return (
    <li className={cn("relative mt-6", className)}>
      <motion.h2
        layout="position"
        className="text-xs font-semibold text-zinc-900 dark:text-white"
      >
        {group.title}
      </motion.h2>
      <div className="relative mt-3 pl-2">
        {/* <AnimatePresence initial={!isInsideMobileNavigation}>
          {isActiveGroup && (
            <VisibleSectionHighlight group={group} pathname={router.pathname} />
          )}
        </AnimatePresence> */}
        <motion.div
          layout
          className="absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:bg-white/5"
        />
        {/* <AnimatePresence initial={false}>
          {isActiveGroup && (
            <ActivePageMarker group={group} pathname={router.pathname} />
          )}
        </AnimatePresence> */}
        <ul role="list" className="border-l border-transparent">
          {group.items?.map((link) => (
            <motion.li key={link.href} layout="position" className="relative">
              <NavLink href={link.href} active={link.href === router.pathname}>
                {link.title}
              </NavLink>
              {/* <AnimatePresence mode="popLayout" initial={false}>
                {link.href === router.pathname && sections.length > 0 && (
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
                    {sections.map((section) => (
                      <li key={section.id}>
                        <NavLink
                          href={`${link.href}#${section.id}`}
                          tag={section.tag}
                          isAnchorLink
                        >
                          {section.title}
                        </NavLink>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence> */}
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

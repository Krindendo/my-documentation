"use client"

import { motion } from "framer-motion"

import { Logo } from "@/components/logo"
import { SiteHeader } from "@/components/site-header"
import { SiteSidebar } from "@/components/site-sidebar"

export function SiteNavigation() {
  return (
    <motion.header
      layoutScroll
      className="contents lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex"
    >
      <div className="scrollbar contents lg:pointer-events-auto lg:block lg:w-72 lg:overflow-y-auto lg:border-r lg:border-zinc-900/10 lg:px-6 lg:pb-8 lg:pt-4 lg:dark:border-white/10 xl:w-80">
        <div className="hidden lg:flex">
          <Logo />
        </div>
        <SiteHeader />
        <SiteSidebar className="hidden lg:mt-10 lg:block" />
      </div>
    </motion.header>
  )
}

"use client";

import { Icons } from "@/components/icons";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { PanelLeft } from "lucide-react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export function SiteHeader() {
  const navItems = [
    { link: "/docs", label: "Documentation" },
    { link: "/guides", label: "Guides" },
    { link: "/algorithms", label: "Algorithms" },
  ];
  const segment = useSelectedLayoutSegment();

  const { toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 left-0 right-0 z-50 flex h-14 items-center justify-between gap-12 bg-white/50 px-4 backdrop-blur-sm transition dark:bg-zinc-900/20 dark:backdrop-blur">
      <div className="absolute inset-x-0 top-full h-px transition bg-zinc-900/10 dark:bg-white/10" />
      <div className="w-full relative mx-auto flex min-h-20 flex-row items-center gap-4">
        <Button
          onClick={() => toggleSidebar()}
          variant="ghost"
          className="h-8 w-8 px-0 sm:hidden"
        >
          <PanelLeft />
        </Button>
        <div className="ml-auto flex items-center gap-5">
          <ul role="list" className="flex items-center gap-8">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  key={index}
                  href={item.link}
                  prefetch={true}
                  className={cn(
                    "text-sm leading-5 transition hover:text-foreground/80",
                    item.link.startsWith(`/${segment}`)
                      ? "text-foreground"
                      : "text-foreground/60"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden h-5 w-px bg-zinc-900/10 dark:bg-white/10 md:block" />
          <div className="flex items-center gap-4">
            <ModeToggle />

            <Button variant="ghost" className="w-9 px-0" asChild>
              <a
                href="https://github.com/Krindendo"
                target="_blank"
                rel="noreferrer"
              >
                <Icons.gitHub className="h-8 w-8" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

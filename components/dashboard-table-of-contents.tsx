"use client"

import * as React from "react"

import { TableOfContents } from "@/lib/toc"
import { cn } from "@/lib/utils"
import { useMounted } from "@/hooks/use-mounted"

interface DashboardTableOfContentsProps {
  toc: TableOfContents
}

export function DashboardTableOfContents({
  toc,
}: DashboardTableOfContentsProps) {
  const itemsIds = React.useMemo(() => {
    if (toc.items === undefined) return []

    return toc.items
      .flatMap((content) => [
        content.url,
        content.items?.map((item) => item.url),
      ])
      .flat()
      .filter(Boolean)
      .map((id) => id?.split("#")[1])
  }, [toc])

  const activeHeading = useActiveItem(itemsIds)
  const mounted = useMounted()

  if (toc.items === undefined || mounted === undefined) {
    return null
  }

  return (
    <div className="space-y-2">
      <p className="font-medium">On This Page</p>
      <Tree tree={toc} activeItem={activeHeading} />
    </div>
  )
}

interface TreeProps {
  tree: TableOfContents
  level?: number
  activeItem?: string | null
}

function Tree({ tree, level = 1, activeItem }: TreeProps) {
  if (tree.items?.length === undefined && level > 3) {
    return null
  }

  return (
    <ul className={cn("m-0 list-none", { "pl-4": level !== 1 })}>
      {tree.items?.map((item, index) => (
        <li key={index} className="mt-0 pt-2">
          <a
            href={item.url}
            className={cn(
              "inline-block no-underline",
              item.url === `#${activeItem}`
                ? "font-medium text-primary"
                : "text-sm text-muted-foreground"
            )}
          >
            {item.title}
          </a>
          {item.items?.length ? (
            <Tree tree={item} level={level + 1} activeItem={activeItem} />
          ) : null}
        </li>
      ))}
    </ul>
  )
}

function useActiveItem(itemIds: (string | undefined)[]) {
  const [activeId, setActiveId] = React.useState<string>("")

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: `0% 0% -80% 0%` }
    )

    itemIds?.forEach((id) => {
      if (id === undefined) {
        return null
      }
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      itemIds.forEach((id) => {
        if (id === undefined) {
          return null
        }
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [itemIds])

  return activeId
}

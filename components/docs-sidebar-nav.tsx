import { usePathname } from "next/navigation"
import { SidebarNavItem } from "@/types"

export interface DocsSidebarNavProps {
  items: SidebarNavItem[]
}

export function DocsSidebarNav({ items }: DocsSidebarNavProps) {
  const pathname = usePathname()

  if (!items.length) return null

  return (
    <div className="w-full">
      {items.map((item, index) => (
        <div key={index} className="pb-8">
          <h4>{item.title}</h4>
          {item.items ? (
            <DocsSidebarNavItem items={item.items} pathname={pathname} />
          ) : null}
        </div>
      ))}
    </div>
  )
}

interface DocsSidebarNavItemsProps {
  items: SidebarNavItem[]
  pathname: string | null
}

export function DocsSidebarNavItem({
  items,
  pathname,
}: DocsSidebarNavItemsProps) {
  if (!items?.length) return null

  return <></>
}

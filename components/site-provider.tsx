"use client"

import * as React from "react"
import { createStore, StoreApi, useStore } from "zustand"

import { TableOfContents } from "@/lib/toc"

interface SidebarState {
  sections: TableOfContents
  setSections: (newSections: TableOfContents) => void
  sectionIds: string[]
  setSectionIds: (newSections: TableOfContents) => void
  visibleSections: string[]
  setVisibleSections: (visibleSections: string[]) => void
}

type SectionStore = ReturnType<typeof createSectionStore>

const createSectionStore = () => {
  return createStore<SidebarState>()((set) => ({
    sections: [],
    setSections: (sections) => set(() => ({ sections })),
    sectionIds: [],
    setSectionIds: (newSections) =>
      set(() => {
        if (newSections.items === undefined) return {}

        const sectionIds = newSections.items
          .flatMap((content) => [
            content.url,
            content.items?.map((item) => item.url),
          ])
          .flat()
          .filter(Boolean)
          .map((id) => id?.split("#")[1])

        return { sectionIds: sectionIds as string[] }
      }),
    visibleSections: [],
    setVisibleSections: (visibleSections) => set(() => ({ visibleSections })),
  }))
}

export const SectionStoreContext = React.createContext<SectionStore | null>(
  null
)

interface SectionProviderProps {
  children: React.ReactNode
}

export function SectionProvider({ children }: SectionProviderProps) {
  const store = React.useRef(createSectionStore()).current

  useVisibleSections(store)

  return (
    <SectionStoreContext.Provider value={store}>
      {children}
    </SectionStoreContext.Provider>
  )
}

export function useSectionStore() {
  const store = React.useContext(SectionStoreContext)
  if (!store) {
    throw new Error("Missing SectionContext.Provider in the tree")
  }
  return store
}

function useVisibleSections(sectionStore: StoreApi<SidebarState>) {
  const sectionIds = useStore(sectionStore, (s) => s.sectionIds)
  const setVisibleSections = useStore(sectionStore, (s) => s.setVisibleSections)

  const [activeIds, setActiveIds] = React.useState<string[]>([])

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("add: ", entry.target.id)
            setActiveIds((ids) => [...ids, entry.target.id])
          } else {
            console.log("delete: ", entry.target.id)
            setActiveIds((ids) => ids.filter((id) => id !== entry.target.id))
          }
        })
      },
      { root: null, rootMargin: "0px 0px -30px 0px", threshold: 0.2 }
    )

    sectionIds?.forEach((id) => {
      if (id === undefined) {
        return null
      }
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      sectionIds.forEach((id) => {
        if (id === undefined) {
          return null
        }
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [sectionIds])

  React.useEffect(() => {
    setVisibleSections(activeIds)
  }, [activeIds, setVisibleSections])
}

export function InjectTOC({ toc }: { toc: TableOfContents }) {
  const store = useSectionStore()
  const setSections = useStore(store, (s) => s.setSections)
  const setSectionIds = useStore(store, (s) => s.setSectionIds)

  React.useEffect(() => {
    setSections(toc)
    setSectionIds(toc)
  }, [toc, setSections, setSectionIds])

  return null
}

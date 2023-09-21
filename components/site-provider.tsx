"use client"

import * as React from "react"
import { createStore, StoreApi, useStore } from "zustand"

import { TableOfContents } from "@/lib/toc"

interface SidebarState {
  sections: TableOfContents
  visibleSections: string[]
  sectionIds: string[]
}

type SidebarAction = {
  setSections: (sections: SidebarState["sections"]) => void
  setVisibleSections: (visibleSections: SidebarState["visibleSections"]) => void
  updateVisibleSection: (id: string) => void
  removeVisibleSection: (id: string) => void
  setSectionIds: (newSections: TableOfContents) => void
}

type SectionStore = ReturnType<typeof createSectionStore>

const createSectionStore = () => {
  return createStore<SidebarState & SidebarAction>()((set) => ({
    sections: [],
    setSections: (sections) => set(() => ({ sections })),
    visibleSections: [],
    setVisibleSections: (visibleSections) => set(() => ({ visibleSections })),
    updateVisibleSection: (id: string) =>
      set((state) => {
        const sectionIndex = state.visibleSections.findIndex(
          (section) => section === id
        )

        if (sectionIndex !== -1) {
          return { visibleSections: state.visibleSections }
        }

        const index = state.sectionIds.findIndex((item) => item === id)

        const firstIndex = state.sectionIds.findIndex(
          (item) => item === state.visibleSections[0]
        )

        if (index === -1) {
          return { visibleSections: state.visibleSections }
        }

        if (index < firstIndex) {
          return {
            visibleSections: [id, ...state.visibleSections],
          }
        }

        return {
          visibleSections: [...state.visibleSections, id],
        }
      }),
    removeVisibleSection: (id: string) =>
      set((state) => ({
        visibleSections: state.visibleSections.filter((s) => s !== id),
      })),
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

        return { sectionIds: ["_top", ...sectionIds] as string[] }
      }),
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

function useVisibleSections(
  sectionStore: StoreApi<SidebarState & SidebarAction>
) {
  const sectionIds = useStore(sectionStore, (s) => s.sectionIds)
  const updateVisibleSection = useStore(
    sectionStore,
    (s) => s.updateVisibleSection
  )
  const removeVisibleSection = useStore(
    sectionStore,
    (s) => s.removeVisibleSection
  )

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          let { innerHeight, scrollY } = window
          const currentEntryIndex = sectionIds.findIndex(
            (id) => id === entry.target.id
          )

          const prevEntryId = sectionIds[currentEntryIndex - 1]
          const nextEntryId = sectionIds[currentEntryIndex + 1]

          const prevEntryTop =
            (document.getElementById(prevEntryId)?.getBoundingClientRect()
              .top ?? Infinity) + scrollY
          const currentEntry = entry.boundingClientRect.top + scrollY
          const nextEntryBottom =
            (document.getElementById(nextEntryId)?.getBoundingClientRect()
              .top ?? Infinity) + scrollY

          // console.log("entryId: ", entry.target.id)
          // console.log("prevEntryBox: ", prevEntryTop, currentEntry)
          // console.log("currentEntryBox: ", currentEntry, nextEntryBottom)

          const navbarHeight = 56
          const screenTop = scrollY + navbarHeight
          const screenBottom = scrollY + innerHeight

          // console.log("visible top", screenTop)
          // console.log("visible bottom", visibleBottom)

          if (
            (prevEntryTop > screenTop && prevEntryTop < screenBottom) ||
            (currentEntry > screenTop && currentEntry < screenBottom) ||
            (prevEntryTop <= screenTop && currentEntry >= screenBottom)
          ) {
            //console.log("add prevEntry: ", prevEntryId)
            updateVisibleSection(prevEntryId)
          } else {
            //console.log("remove prevEntry: ", prevEntryId)
            removeVisibleSection(prevEntryId)
          }

          if (
            (currentEntry > screenTop && currentEntry < screenBottom) ||
            (nextEntryBottom > screenTop && nextEntryBottom < screenBottom) ||
            (currentEntry <= screenTop && nextEntryBottom >= screenBottom)
          ) {
            //console.log("add entry: ", entry.target.id)
            updateVisibleSection(entry.target.id)
          } else {
            //console.log("remove entry: ", entry.target.id)
            removeVisibleSection(entry.target.id)
          }
        })
      },
      {
        root: null,
        rootMargin: "-55px 0px 1px 0px",
        threshold: [0, 1],
      }
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
}

export function InjectTOC({ toc }: { toc: TableOfContents }) {
  const store = useSectionStore()
  const setSections = useStore(store, (s) => s.setSections)
  const setSectionIds = useStore(store, (s) => s.setSectionIds)
  const setVisibleSections = useStore(store, (s) => s.setVisibleSections)

  React.useEffect(() => {
    setSections(toc)
    setSectionIds(toc)
    setVisibleSections([])
  }, [toc, setSections, setSectionIds, setVisibleSections])

  return null
}

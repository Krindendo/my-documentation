"use client"

import * as React from "react"
import { createStore, StoreApi, useStore } from "zustand"

import { remToPx } from "@/lib/remToPx"
import { TableOfContents } from "@/lib/toc"

interface SectionHeader {
  headingRef: React.MutableRefObject<React.JSX.Element>
  id: string
  offsetRem: number
  title: string
}

interface SidebarState {
  sections: TableOfContents
  setSections: (sections: TableOfContents) => void
  visibleSections: string[]
  setVisibleSections: (visibleSections: string[]) => void
  sectionIds: string[]
  setSectionIds: (newSections: TableOfContents) => void
}

type SectionStore = ReturnType<typeof createSectionStore>

const createSectionStore = () => {
  return createStore<SidebarState>()((set) => ({
    sections: [],
    setSections: (sections) => set(() => ({ sections })),
    visibleSections: [],
    setVisibleSections: (visibleSections) => set(() => ({ visibleSections })),
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

const addSelector = (id: string, sectionIds: string[]) => ({
  type: "ADD_SELECTOR" as const,
  payload: { id, sectionIds },
})

const deleteSelector = (id: string) => ({
  type: "DELETE_SELECTOR" as const,
  payload: { id },
})

type Action = ReturnType<typeof addSelector> | ReturnType<typeof deleteSelector>
type State = {
  visibleSections: string[]
}

const initialState: State = {
  visibleSections: [],
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "ADD_SELECTOR": {
      const sectionIndex = state.visibleSections.findIndex(
        (section) => section === action.payload.id
      )

      if (sectionIndex !== -1) {
        return { visibleSections: state.visibleSections }
      }

      const index = action.payload.sectionIds.findIndex(
        (item) => item === action.payload.id
      )

      const firstIndex = action.payload.sectionIds.findIndex(
        (item) => item === state.visibleSections[0]
      )

      if (index === -1) {
        return { visibleSections: state.visibleSections }
      }

      if (index < firstIndex) {
        return {
          visibleSections: [action.payload.id, ...state.visibleSections],
        }
      }

      return {
        visibleSections: [...state.visibleSections, action.payload.id],
      }
    }
    case "DELETE_SELECTOR": {
      return {
        visibleSections: state.visibleSections.filter(
          (s) => s !== action.payload.id
        ),
      }
    }
    default: {
      throw Error("Unknown action: " + action["type"])
    }
  }
}

function useVisibleSections(sectionStore: StoreApi<SidebarState>) {
  const sectionIds = useStore(sectionStore, (s) => s.sectionIds)
  const setVisibleSections = useStore(sectionStore, (s) => s.setVisibleSections)

  const [activeIds, dispatchActiveIds] = React.useReducer<
    React.Reducer<State, Action>
  >(reducer, initialState)

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
            console.log("add prevEntry: ", prevEntryId)
            dispatchActiveIds({
              type: "ADD_SELECTOR",
              payload: { id: prevEntryId, sectionIds },
            })
          } else {
            console.log("remove prevEntry: ", prevEntryId)
            dispatchActiveIds({
              type: "DELETE_SELECTOR",
              payload: { id: prevEntryId },
            })
          }

          if (
            (currentEntry > screenTop && currentEntry < screenBottom) ||
            (nextEntryBottom > screenTop && nextEntryBottom < screenBottom) ||
            (currentEntry <= screenTop && nextEntryBottom >= screenBottom)
          ) {
            console.log("add entry: ", entry.target.id)
            dispatchActiveIds({
              type: "ADD_SELECTOR",
              payload: { id: entry.target.id, sectionIds },
            })
          } else {
            console.log("remove entry: ", entry.target.id)
            dispatchActiveIds({
              type: "DELETE_SELECTOR",
              payload: { id: entry.target.id },
            })
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

  React.useEffect(() => {
    setVisibleSections(activeIds.visibleSections)
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

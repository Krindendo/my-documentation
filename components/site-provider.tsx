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

        const sectionWithTop = ["_top", ...sectionIds]

        return { sectionIds: sectionWithTop as string[] }
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
  selectors: string[]
}

const initialState: State = {
  selectors: [],
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "ADD_SELECTOR": {
      const index = action.payload.sectionIds.findIndex(
        (item) => item === action.payload.id
      )
      const firstIndex = action.payload.sectionIds.findIndex(
        (item) => item === state.selectors[0]
      )

      if (index === -1) {
        return { selectors: state.selectors }
      }

      if (index < firstIndex) {
        return {
          selectors: [action.payload.id, ...state.selectors],
        }
      }

      return {
        selectors: [...state.selectors, action.payload.id],
      }
    }
    case "DELETE_SELECTOR": {
      return {
        selectors: state.selectors.filter((s) => s !== action.payload.id),
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

  //console.log("sectionIds", sectionIds)

  const [activeIds, dispatchActiveIds] = React.useReducer<
    React.Reducer<State, Action>
  >(reducer, initialState)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // console.log("add: ", entry.target.id)
            dispatchActiveIds({
              type: "ADD_SELECTOR",
              payload: { id: entry.target.id, sectionIds },
            })
          } else {
            // console.log("delete: ", entry.target.id)
            dispatchActiveIds({
              type: "DELETE_SELECTOR",
              payload: { id: entry.target.id },
            })
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
    setVisibleSections(activeIds.selectors)
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

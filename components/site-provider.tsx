import * as React from "react"
import { createStore, StoreApi, useStore } from "zustand"

import { remToPx } from "@/lib/remToPx"

interface SidebarState {
  sections: any[]
  visibleSections: string[]
  setVisibleSections: (visibleSections: any) => void
  registerHeading: ({
    id,
    ref,
    offsetRem,
  }: {
    id: any
    ref: any
    offsetRem: any
  }) => void
}

function createSectionStore(sections) {
  return createStore<SidebarState>((set) => ({
    sections,
    visibleSections: [],
    setVisibleSections: (visibleSections) =>
      set((state) =>
        state.visibleSections.join() === visibleSections.join()
          ? {}
          : { visibleSections }
      ),
    registerHeading: ({ id, ref, offsetRem }) =>
      set((state) => {
        return {
          sections: state.sections.map((section) => {
            if (section.id === id) {
              return {
                ...section,
                headingRef: ref,
                offsetRem,
              }
            }
            return section
          }),
        }
      }),
  }))
}

function useVisibleSections(sectionStore: StoreApi<SidebarState>) {
  let setVisibleSections = useStore(sectionStore, (s) => s.setVisibleSections)
  let sections = useStore(sectionStore, (s) => s.sections)

  React.useEffect(() => {
    function checkVisibleSections() {
      let { innerHeight, scrollY } = window
      let newVisibleSections: string[] = []

      for (
        let sectionIndex = 0;
        sectionIndex < sections.length;
        sectionIndex++
      ) {
        let { id, headingRef, offsetRem } = sections[sectionIndex]
        let offset = remToPx(offsetRem)
        let top = headingRef.current.getBoundingClientRect().top + scrollY

        if (sectionIndex === 0 && top - offset > scrollY) {
          newVisibleSections.push("_top")
        }

        let nextSection = sections[sectionIndex + 1]
        let bottom =
          (nextSection?.headingRef.current.getBoundingClientRect().top ??
            Infinity) +
          scrollY -
          remToPx(nextSection?.offsetRem ?? 0)

        if (
          (top > scrollY && top < scrollY + innerHeight) ||
          (bottom > scrollY && bottom < scrollY + innerHeight) ||
          (top <= scrollY && bottom >= scrollY + innerHeight)
        ) {
          newVisibleSections.push(id)
        }
      }

      setVisibleSections(newVisibleSections)
    }

    let raf = window.requestAnimationFrame(() => checkVisibleSections())
    window.addEventListener("scroll", checkVisibleSections, { passive: true })
    window.addEventListener("resize", checkVisibleSections)

    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener("scroll", checkVisibleSections)
      window.removeEventListener("resize", checkVisibleSections)
    }
  }, [setVisibleSections, sections])
}

const SectionStoreContext = React.createContext<StoreApi<SidebarState>>(
  createSectionStore([])
)

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? React.useEffect : React.useLayoutEffect

export function SectionProvider({ sections, children }) {
  let [sectionStore] = React.useState(() => createSectionStore(sections))

  useVisibleSections(sectionStore)

  useIsomorphicLayoutEffect(() => {
    sectionStore.setState({ sections })
  }, [sectionStore, sections])

  return (
    <SectionStoreContext.Provider value={sectionStore}>
      {children}
    </SectionStoreContext.Provider>
  )
}

export function useSectionStore(selector) {
  let store = React.useContext(SectionStoreContext)
  return useStore(store, selector)
}

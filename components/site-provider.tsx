"use client"

import * as React from "react"
import { create, StoreApi, useStore } from "zustand"

import { remToPx } from "@/lib/remToPx"
import { TableOfContents } from "@/lib/toc"

interface SectionItem {
  id: string
  label: string
  tag: string
  title: string
  headingRef: React.MutableRefObject<React.ReactElement>
  ref: React.MutableRefObject<React.ReactElement>
  offsetRem: number
}

interface SidebarState {
  sections: SectionItem[]
  visibleSections: string[]
  setVisibleSections: (visibleSections: string[]) => void
  registerHeading: ({ id, ref, offsetRem }: SectionItem) => void
}

function createSectionStore(sections: SectionItem[]) {
  return create<SidebarState>()((set) => ({
    sections,
    visibleSections: [],
    setVisibleSections: (visibleSections) =>
      set((state) =>
        state.visibleSections.join() === visibleSections.join()
          ? {}
          : { visibleSections }
      ),
    registerHeading: ({ id, ref, offsetRem }) =>
      set((state) => ({
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
      })),
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

interface SectionProviderProps {
  children: React.ReactNode
}

export function SectionProvider({ children }: SectionProviderProps) {
  const [sectionStore] = React.useState(() => createSectionStore([]))
  const [toc, setToc] = React.useState<TableOfContents>()

  useVisibleSections(sectionStore)

  useIsomorphicLayoutEffect(() => {
    sectionStore.setState({ sections: toc })
  }, [sectionStore, toc])

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

/*
  description: 'On this page, we’ll dive into the different message endpoints you can use to manage messages programmatically.',
  sections: [
    { title: 'The message model', id: 'the-message-model' },
    {
      title: 'List all messages',
      id: 'list-all-messages',
      tag: 'GET',
      label: '/v1/messages'
    },
    {
      title: 'Send a message',
      id: 'send-a-message',
      tag: 'POST',
      label: '/v1/messages'
    },
    {
      title: 'Retrieve a message',
      id: 'retrieve-a-message',
      tag: 'GET',
      label: '/v1/messages/:id'
    },
    {
      title: 'Update a message',
      id: 'update-a-message',
      tag: 'PUT',
      label: '/v1/messages/:id'
    },
    {
      title: 'Delete a message',
      id: 'delete-a-message',
      tag: 'DELETE',
      label: '/v1/messages/:id'
    }
  ],
  title: 'Messages'
}


*/

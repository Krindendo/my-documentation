"use client"

import * as React from "react"
import { createStore, StoreApi } from "zustand"

import { TableOfContents } from "@/lib/toc"

interface SidebarState {
  sections: (string | undefined)[]
  setSections: (newSections: TableOfContents) => void
  visibleSections: string[]
}

type SectionStore = ReturnType<typeof createSectionStore>

const createSectionStore = () => {
  return createStore<SidebarState>()((set) => ({
    sections: [],
    setSections: (newSections) =>
      set(() => {
        if (newSections.items === undefined) return {}

        const sections = newSections.items
          .flatMap((content) => [
            content.url,
            content.items?.map((item) => item.url),
          ])
          .flat()
          .filter(Boolean)
          .map((id) => id?.split("#")[1])

        return { sections }
      }),
    visibleSections: [],
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
  let sections = sectionStore.getState().sections

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

    sections?.forEach((id) => {
      if (id === undefined) {
        return null
      }
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      sections.forEach((id) => {
        if (id === undefined) {
          return null
        }
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [sections])

  React.useEffect(() => {
    sectionStore.setState({ visibleSections: activeIds })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIds])
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

/*
interface SectionItem {
  id: string
  label: string
  tag: string
  title: string
  headingRef: React.MutableRefObject<React.ReactElement>
  ref: React.MutableRefObject<React.ReactElement>
  offsetRem: number
}

*/

/*

// function useVisibleSections(sectionStore: StoreApi<SidebarState>) {
//   let setVisibleSections = useStore(sectionStore, (s) => s.setVisibleSections)
//   let sections = useStore(sectionStore, (s) => s.sections)

//   React.useEffect(() => {
//     function checkVisibleSections() {
//       let { innerHeight, scrollY } = window
//       let newVisibleSections: string[] = []

//       for (
//         let sectionIndex = 0;
//         sectionIndex < sections.length;
//         sectionIndex++
//       ) {
//         let { id, headingRef, offsetRem } = sections[sectionIndex]
//         let offset = remToPx(offsetRem)
//         let top = headingRef.current.getBoundingClientRect().top + scrollY

//         if (sectionIndex === 0 && top - offset > scrollY) {
//           newVisibleSections.push("_top")
//         }

//         let nextSection = sections[sectionIndex + 1]
//         let bottom =
//           (nextSection?.headingRef.current.getBoundingClientRect().top ??
//             Infinity) +
//           scrollY -
//           remToPx(nextSection?.offsetRem ?? 0)

//         if (
//           (top > scrollY && top < scrollY + innerHeight) ||
//           (bottom > scrollY && bottom < scrollY + innerHeight) ||
//           (top <= scrollY && bottom >= scrollY + innerHeight)
//         ) {
//           newVisibleSections.push(id)
//         }
//       }

//       setVisibleSections(newVisibleSections)
//     }

//     let raf = window.requestAnimationFrame(() => checkVisibleSections())
//     window.addEventListener("scroll", checkVisibleSections, { passive: true })
//     window.addEventListener("resize", checkVisibleSections)

//     return () => {
//       window.cancelAnimationFrame(raf)
//       window.removeEventListener("scroll", checkVisibleSections)
//       window.removeEventListener("resize", checkVisibleSections)
//     }
//   }, [setVisibleSections, sections])
// }
*/

'use client';

import type { FC } from 'react';
import { createContext, useContext, useRef } from 'react';
import { createStore } from 'zustand';

import { useVisibleSections } from '@/hooks/react-client';
import { TableOfContents } from '@/util/toc';

export interface SidebarState {
  sections: TableOfContents;
  visibleSections: string[];
  sectionIds: string[];
}

export type SidebarAction = {
  setSections: (sections: SidebarState['sections']) => void;
  setVisibleSections: (
    visibleSections: SidebarState['visibleSections']
  ) => void;
  updateVisibleSection: (id: string) => void;
  removeVisibleSection: (id: string) => void;
  setSectionIds: (newSections: TableOfContents) => void;
};

type SectionStore = ReturnType<typeof createSectionStore>;

const createSectionStore = () => {
  return createStore<SidebarState & SidebarAction>()(set => ({
    sections: [],
    setSections: sections => set(() => ({ sections })),
    visibleSections: [],
    setVisibleSections: visibleSections => set(() => ({ visibleSections })),
    updateVisibleSection: (id: string) =>
      set(state => {
        const sectionIndex = state.visibleSections.findIndex(
          section => section === id
        );

        if (sectionIndex !== -1) {
          return { visibleSections: state.visibleSections };
        }

        const index = state.sectionIds.findIndex(item => item === id);

        const firstIndex = state.sectionIds.findIndex(
          item => item === state.visibleSections[0]
        );

        if (index === -1) {
          return { visibleSections: state.visibleSections };
        }

        if (index < firstIndex) {
          return {
            visibleSections: [id, ...state.visibleSections],
          };
        }

        return {
          visibleSections: [...state.visibleSections, id],
        };
      }),
    removeVisibleSection: (id: string) =>
      set(state => ({
        visibleSections: state.visibleSections.filter(s => s !== id),
      })),
    sectionIds: [],
    setSectionIds: newSections =>
      set(() => {
        if (newSections.items === undefined) return {};
        const sectionIds = newSections.items
          .flatMap(content => [
            content.url,
            content.items?.map(item => item.url),
          ])
          .flat()
          .filter(Boolean)
          .map(id => id?.split('#')[1]);

        return { sectionIds: ['_top', ...sectionIds] as string[] };
      }),
  }));
};

export const SectionStoreContext = createContext<SectionStore | null>(null);

interface SectionProviderProps {
  children: React.ReactNode;
}

const SectionProvider: FC<SectionProviderProps> = ({ children }) => {
  const store = useRef(createSectionStore()).current;

  useVisibleSections(store);

  return (
    <SectionStoreContext.Provider value={store}>
      {children}
    </SectionStoreContext.Provider>
  );
};

const useSectionStore = () => {
  const store = useContext(SectionStoreContext);
  if (!store) {
    throw new Error('Missing SectionContext.Provider in the tree');
  }
  return store;
};

export { SectionProvider, useSectionStore };

'use client';

import { useEffect } from 'react';
import type { StoreApi } from 'zustand';
import { useStore } from 'zustand';

import type { SidebarAction, SidebarState } from '@/providers/sidebarProvider';

function useVisibleSections(
  sectionStore: StoreApi<SidebarState & SidebarAction>
) {
  const sectionIds = useStore(sectionStore, s => s.sectionIds);
  const updateVisibleSection = useStore(
    sectionStore,
    s => s.updateVisibleSection
  );
  const removeVisibleSection = useStore(
    sectionStore,
    s => s.removeVisibleSection
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const { innerHeight, scrollY } = window;
          const currentEntryIndex = sectionIds.findIndex(
            id => id === entry.target.id
          );

          const prevEntryId = sectionIds[currentEntryIndex - 1];
          const nextEntryId = sectionIds[currentEntryIndex + 1];

          const prevEntryTop =
            (document.getElementById(prevEntryId)?.getBoundingClientRect()
              .top ?? Infinity) + scrollY;
          const currentEntry = entry.boundingClientRect.top + scrollY;
          const nextEntryBottom =
            (document.getElementById(nextEntryId)?.getBoundingClientRect()
              .top ?? Infinity) + scrollY;

          // console.log("entryId: ", entry.target.id)
          // console.log("prevEntryBox: ", prevEntryTop, currentEntry)
          // console.log("currentEntryBox: ", currentEntry, nextEntryBottom)

          const navbarHeight = 56;
          const screenTop = scrollY + navbarHeight;
          const screenBottom = scrollY + innerHeight;

          // console.log("visible top", screenTop)
          // console.log("visible bottom", visibleBottom)

          if (
            (prevEntryTop > screenTop && prevEntryTop < screenBottom) ||
            (currentEntry > screenTop && currentEntry < screenBottom) ||
            (prevEntryTop <= screenTop && currentEntry >= screenBottom)
          ) {
            //console.log("add prevEntry: ", prevEntryId)
            updateVisibleSection(prevEntryId);
          } else {
            //console.log("remove prevEntry: ", prevEntryId)
            removeVisibleSection(prevEntryId);
          }

          if (
            (currentEntry > screenTop && currentEntry < screenBottom) ||
            (nextEntryBottom > screenTop && nextEntryBottom < screenBottom) ||
            (currentEntry <= screenTop && nextEntryBottom >= screenBottom)
          ) {
            //console.log("add entry: ", entry.target.id)
            updateVisibleSection(entry.target.id);
          } else {
            //console.log("remove entry: ", entry.target.id)
            removeVisibleSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-55px 0px 1px 0px',
        threshold: [0, 1],
      }
    );

    sectionIds?.forEach(id => {
      if (id === undefined) {
        return null;
      }
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sectionIds.forEach(id => {
        if (id === undefined) {
          return null;
        }
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [sectionIds]);
}

export default useVisibleSections;

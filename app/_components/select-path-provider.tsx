"use client";

import { createContext, useContext, useState } from "react";

export type NavigationKeys = "docs" | "guides" | "algorithms";

type SelectPathContextType = {
  selectedNavigation: NavigationKeys;
  setSelectedNavigation: (navIndex: NavigationKeys) => void;
};

const SelectPathContext = createContext<SelectPathContextType | null>(null);

export function SelectPathProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedNavigation, setSelectedNavigation] =
    useState<NavigationKeys>("docs");

  return (
    <SelectPathContext.Provider
      value={{ selectedNavigation, setSelectedNavigation }}
    >
      {children}
    </SelectPathContext.Provider>
  );
}

export function useSelectPath() {
  const context = useContext(SelectPathContext);
  if (!context) {
    throw new Error("useSelectPath must be used within a SidebarProvider");
  }
  return context;
}

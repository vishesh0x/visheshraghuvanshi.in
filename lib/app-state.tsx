"use client";

/**
 * AppStateContext — thin global context for cross-component state.
 * Currently tracks whether any modal/drawer is open so the NavBar
 * can animate out and become non-interactive while a modal is on screen.
 */

import { createContext, useContext, useState, type ReactNode } from "react";

interface AppState {
  modalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const AppStateContext = createContext<AppState>({
  modalOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export function useAppState() {
  return useContext(AppStateContext);
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <AppStateContext.Provider
      value={{
        modalOpen,
        openModal: () => setModalOpen(true),
        closeModal: () => setModalOpen(false),
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

import React, { createContext, useContext, ReactNode } from 'react';
import { useStore } from './use-store';

const StoreContext = createContext<ReturnType<typeof useStore> | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const store = useStore();
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

export function useAppStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useAppStore must be used within a StoreProvider');
  }
  return context;
}

// src/CharmContext.tsx
import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { MasteryProgress } from './services/masteryService';

// Extend your existing CharmState interface
export interface CharmState {
  // Your existing properties
  nightwave?: {
    xp?: number;
    completed: Record<string, boolean>;
  };
  ownedMats?: Record<string, number>;
  
  // Add mastery support
  mastery?: MasteryProgress;
  
  // Add any other existing properties you have
  [key: string]: any;
}

interface CharmContextType {
  state: CharmState;
  save: (newState: Partial<CharmState>) => void;
}

const CharmContext = createContext<CharmContextType | undefined>(undefined);

interface CharmProviderProps {
  children: ReactNode;
}

export function CharmProvider({ children }: CharmProviderProps) {
  // Your existing implementation
  // Just make sure your state interface supports the mastery property
  
  const value = {
    state: {
      // Your existing state
    } as CharmState,
    save: (_newState: Partial<CharmState>) => {
      // Your existing save logic - implement as needed
      console.log('Save functionality needs to be implemented');
    }
  };

  return (
    <CharmContext.Provider value={value}>
      {children}
    </CharmContext.Provider>
  );
}

export function useCharm() {
  const context = useContext(CharmContext);
  if (context === undefined) {
    throw new Error('useCharm must be used within a CharmProvider');
  }
  return context;
}
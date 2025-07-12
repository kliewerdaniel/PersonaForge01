import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import type { AIPersona } from '../types/persona';

// Helper to create an empty persona with default trait values
const createEmptyPersona = (): AIPersona => {
  const now = new Date().toISOString();
  return {
    id: uuidv4(),
    name: 'New Persona',
    description: '',
    traits: {
      communicationStyle: {
        formality: 0.5,
        verbosity: 0.5,
        directness: 0.5,
        tone: 0.5,
      },
      cognitiveBiases: {
        confirmationBias: 0.5,
        anchoringBias: 0.5,
        recencyBias: 0.5,
      },
      emotionalRange: {
        empathy: 0.5,
        optimism: 0.5,
        patience: 0.5,
      },
      creativity: {
        originality: 0.5,
        flexibility: 0.5,
      },
      riskTolerance: {
        adventurousness: 0.5,
        caution: 0.5,
      },
      learningStyle: {
        adaptability: 0.5,
        curiosity: 0.5,
      },
    },
    metadata: {
      createdAt: now,
      lastModified: now,
      version: 1,
    },
  };
};

interface PersonaState {
  currentPersona: AIPersona;
  isDirty: boolean;
  lastSavedTimestamp: number | null;
  
  // Actions
  setTraitValue: (category: keyof AIPersona['traits'], trait: string, value: number) => void;
  loadPersona: (persona: AIPersona) => void;
  resetPersona: () => void;
  markAsSaved: () => void;
  setPersonaName: (name: string) => void;
  setPersonaDescription: (description: string) => void;
}

export const usePersonaStore = create<PersonaState>((set) => ({
  currentPersona: createEmptyPersona(),
  isDirty: false,
  lastSavedTimestamp: null,

  setTraitValue: (category, trait, value) =>
    set((state) => {
      const updatedPersona = {
        ...state.currentPersona,
        traits: {
          ...state.currentPersona.traits,
          [category]: {
            ...state.currentPersona.traits[category],
            [trait]: value,
          },
        },
        metadata: {
          ...state.currentPersona.metadata!,
          lastModified: new Date().toISOString(),
        },
      };
      return { currentPersona: updatedPersona, isDirty: true };
    }),

  loadPersona: (persona) =>
    set(() => {
      const now = new Date().toISOString();
      return {
        currentPersona: {
          ...persona,
          metadata: {
            createdAt: persona.metadata?.createdAt || now,
            lastModified: now,
            version: (persona.metadata?.version || 0) + 1, // Increment version on load/edit
          },
        },
        isDirty: false,
        lastSavedTimestamp: new Date().getTime(),
      };
    }),

  resetPersona: () =>
    set(() => ({
      currentPersona: createEmptyPersona(),
      isDirty: false,
      lastSavedTimestamp: null,
    })),

  markAsSaved: () =>
    set((state) => ({
      isDirty: false,
      lastSavedTimestamp: new Date().getTime(),
      currentPersona: {
        ...state.currentPersona,
        metadata: {
          ...state.currentPersona.metadata!,
          lastModified: new Date().toISOString(),
        },
      },
    })),

  setPersonaName: (name: string) =>
    set((state) => ({
      currentPersona: {
        ...state.currentPersona,
        name,
        metadata: {
          ...state.currentPersona.metadata!,
          lastModified: new Date().toISOString(),
        },
      },
      isDirty: true,
    })),

  setPersonaDescription: (description: string) =>
    set((state) => ({
      currentPersona: {
        ...state.currentPersona,
        description,
        metadata: {
          ...state.currentPersona.metadata!,
          lastModified: new Date().toISOString(),
        },
      },
      isDirty: true,
    })),
}));

// Optional: Add a simple autosave to local storage
// This is a basic implementation and can be enhanced with debouncing,
// and more robust error handling.
usePersonaStore.subscribe(
  (state: PersonaState) => state.currentPersona, // Selector function
  (currentPersona: AIPersona) => { // Listener function
    if (currentPersona) {
      localStorage.setItem('personaForge_draft_persona', JSON.stringify(currentPersona));
    }
  },
  {
    equalityFn: (a: AIPersona, b: AIPersona) => JSON.stringify(a) === JSON.stringify(b), // Deep compare for changes
    fireImmediately: false,
  }
);

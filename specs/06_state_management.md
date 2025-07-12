“Describe the application’s state management architecture. Define how trait values, in-progress personas, saved states, and preset templates are stored. Use React + Zustand (or Redux) if appropriate. Highlight how we track user progress for the Zeigarnik Effect, and how we store draft states locally or via backend.”

---

## State Management Architecture for PersonaForge

This document outlines the state management architecture for the PersonaForge application, focusing on how trait values, in-progress personas, saved states, and preset templates are stored and managed. We will leverage **React's Context API** for global state and **Zustand** for more complex, reactive state slices, highlighting how user progress is tracked for the **Zeigarnik Effect** and how draft states are handled.

### 1. Overall Architecture: React Context + Zustand

For PersonaForge, a hybrid approach combining React's Context API with Zustand is ideal:

*   **React Context API:** Best for global, less frequently updated state that many components need access to (e.g., authentication status, theme settings, global UI flags like `isAdvancedSettingsVisible`). It avoids prop drilling for widely used data.
*   **Zustand:** A lightweight, fast, and scalable state management solution. It's excellent for managing complex, frequently updated state slices like the active persona data, user progress, and lists of saved personas. Its hook-based API is intuitive and minimizes boilerplate.

### 2. Key State Slices and Their Management

#### 2.1. Current In-Progress Persona State (Zustand Store)

This is the most dynamic part of the application, representing the persona currently being edited by the user.

*   **Store Name:** `usePersonaStore`
*   **Data Structure:**
    ```javascript
    interface PersonaState {
      currentPersona: AIPersona | null; // Conforms to 02_persona_schema.md
      isDirty: boolean; // Tracks if currentPersona has unsaved changes
      lastSavedTimestamp: number | null;
      // ... other temporary UI-related state for the current persona
    }
    ```
*   **Actions:**
    *   `setTraitValue(category, trait, value)`: Updates a specific trait in `currentPersona`. Sets `isDirty` to `true`.
    *   `loadPersona(persona: AIPersona)`: Replaces `currentPersona` with a loaded persona. Sets `isDirty` to `false`.
    *   `resetPersona()`: Clears `currentPersona` and sets `isDirty` to `false`.
    *   `markAsSaved()`: Sets `isDirty` to `false` and updates `lastSavedTimestamp`.
*   **Storage:** Primarily in-memory (Zustand store). For persistence across sessions, it will be integrated with local storage (for drafts) or backend API (for saved personas).

#### 2.2. User Progress State (Zustand Store)

Crucial for leveraging the **Zeigarnik Effect**, this state tracks which sections of the persona creation process have been completed or visited.

*   **Store Name:** `useProgressStore`
*   **Data Structure:**
    ```javascript
    interface ProgressState {
      completedSections: Set<string>; // e.g., new Set(['communicationStyle', 'cognitiveBiases'])
      currentSection: string; // e.g., 'communicationStyle'
      visitedSections: Set<string>; // All sections the user has navigated to
    }
    ```
*   **Actions:**
    *   `markSectionComplete(sectionName: string)`: Adds `sectionName` to `completedSections`.
    *   `setCurrentSection(sectionName: string)`: Updates `currentSection` and adds `sectionName` to `visitedSections`.
*   **UI Integration:** `ProgressStepper` component subscribes to `useProgressStore` to update its visual representation.

#### 2.3. Saved Personas List (Zustand Store + Backend/Local Storage)

Manages the collection of personas saved by the user.

*   **Store Name:** `useSavedPersonasStore`
*   **Data Structure:**
    ```javascript
    interface SavedPersonasState {
      personas: AIPersona[]; // Array of saved persona objects
      isLoading: boolean;
      error: string | null;
    }
    ```
*   **Actions:**
    *   `fetchPersonas()`: Asynchronously fetches personas from backend/local storage. Sets `isLoading` to `true`, then `false` on completion.
    *   `addPersona(persona: AIPersona)`: Adds a new persona to the list (and persists).
    *   `updatePersona(persona: AIPersona)`: Updates an existing persona (and persists).
    *   `deletePersona(id: string)`: Removes a persona (and persists).
*   **Persistence:**
    *   **Backend API:** For authenticated users, personas are stored in a database via API calls (e.g., `/api/personas`).
    *   **Local Storage:** For unauthenticated users or as a fallback, a subset of saved personas can be stored in `localStorage`.

#### 2.4. Preset Templates (Static Data / Zustand Store)

Predefined persona configurations.

*   **Storage:** Can be static JSON files bundled with the application or fetched once from a backend API on app load. If dynamic updates are needed, a Zustand store (`usePresetStore`) could manage them.
*   **Access:** Components access these presets to populate the `currentPersona` state when a user selects one.

### 3. Tracking User Progress for Zeigarnik Effect

The `useProgressStore` is specifically designed to implement the **Zeigarnik Effect**:

*   **Visual Cues:** The `ProgressStepper` component (from `03_frontend_components.md`) will visually highlight `completedSections` and `currentSection`. Incomplete sections will remain visually distinct (e.g., greyed out, no checkmark).
*   **Unfinished Tasks:** When a user navigates away from an incomplete section, the visual cue on the `ProgressStepper` acts as a reminder of the unfinished task, creating a psychological urge to return and complete it.
*   **Autosave Integration:** The autosave mechanism (detailed below) ensures that even if a user leaves an incomplete persona, their progress is saved, reducing the friction of returning to an unfinished task.

### 4. Storing Draft States (Local Storage)

To prevent data loss and support the Zeigarnik Effect, in-progress personas will be automatically saved as drafts.

*   **Mechanism:**
    *   A debounced effect (e.g., using `useEffect` in React with a `currentPersona` dependency and a debounce timer) will periodically save the `currentPersona` to `localStorage`.
    *   The `isDirty` flag in `usePersonaStore` will trigger this autosave.
    *   **Key:** `localStorage.setItem('personaForge_draft_persona', JSON.stringify(currentPersona))`
*   **Loading Drafts:** On application load, check `localStorage` for a `personaForge_draft_persona`. If found, prompt the user: "Continue editing your last draft?" This provides a seamless return to unfinished work.
*   **Backend Drafts (Future Extension):** For multi-device access, draft states could also be synced with a backend API, requiring user authentication.

### 5. Data Flow and Interactions

*   **UI Components:** Dispatch actions to Zustand stores (e.g., `usePersonaStore.setTraitValue()`).
*   **Zustand Stores:** Update their internal state and notify subscribing React components.
*   **Side Effects (Persistence):** Zustand actions can trigger side effects (e.g., API calls to save/load personas, `localStorage` updates). Middleware or direct calls within actions can handle this.
*   **Selectors:** Components use Zustand selectors to efficiently read only the parts of the state they need, optimizing re-renders.

This state management architecture provides a robust, performant, and user-friendly foundation for PersonaForge, ensuring a smooth and motivating experience for persona creation.

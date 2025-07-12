“List the major user flows with flowchart-style descriptions: ‘Create New Persona’, ‘Edit Existing Persona’, ‘Apply Persona to Agent’, ‘Preview Prompt Output’, ‘Export/Import Persona’. Include entry/exit points, modal usage, validation states, and progress visualization steps (e.g. breadcrumbs or steppers).”

---

## Major User Flows for PersonaForge

This document outlines the major user flows within the PersonaForge application, providing flowchart-style descriptions. Each flow details entry/exit points, modal usage, validation states, and progress visualization steps, ensuring a clear and guided user journey.

### 1. Create New Persona Flow

**Goal:** Allow users to build a new AI persona from scratch or a preset.

```mermaid
graph TD
    A[Entry: Dashboard / "Create New Persona" Button] --> B{Choose Start Option?};
    B -- "Yes, from Preset" --> C[Display Preset Selection Modal];
    C --> D{Preset Selected?};
    D -- "Yes" --> E[Load Preset Data into UI];
    B -- "No, from Scratch" --> F[Initialize Empty Persona UI];
    E --> G[Persona Creation UI (Category Tabs, Sliders)];
    F --> G;
    G -- "Adjust Traits" --> H{Trait Values Valid?};
    H -- "No" --> I[Display Inline Validation Errors];
    H -- "Yes" --> J[Progress Stepper Updates];
    J --> K{Navigate Categories?};
    K -- "Yes" --> G;
    K -- "No, Ready to Save" --> L[Click "Save Persona" Button];
    L --> M{Persona Data Validated?};
    M -- "No" --> N[Display Validation Errors / Prompt for Missing Info];
    M -- "Yes" --> O[Show "Saving..." Loading State];
    O --> P{Save Successful?};
    P -- "No" --> Q[Display Error Notification];
    P -- "Yes" --> R[Display Success Notification];
    R --> S[Exit: Persona Saved / My Personas List];
    Q --> L;
```

*   **Entry Point:** Dashboard, "Create New Persona" button, or direct URL.
*   **Modal Usage:** "Preset Selection Modal" (optional).
*   **Validation States:** Inline validation on trait sliders/inputs, pre-save validation on "Save Persona" button click.
*   **Progress Visualization:** `ProgressStepper` and `CategoryTabs` (from `03_frontend_components.md`) indicate current section and overall progress. Autosave banner provides continuous feedback.

### 2. Edit Existing Persona Flow

**Goal:** Allow users to modify a previously saved AI persona.

```mermaid
graph TD
    A[Entry: "My Personas" List / Click Persona Card] --> B[Load Persona Data into UI];
    B --> C[Persona Creation UI (Pre-filled with existing data)];
    C -- "Adjust Traits" --> D{Trait Values Valid?};
    D -- "No" --> E[Display Inline Validation Errors];
    D -- "Yes" --> F[Progress Stepper Updates];
    F --> G{Navigate Categories?};
    G -- "Yes" --> C;
    G -- "No, Ready to Save" --> H[Click "Save Persona" Button];
    H --> I{Persona Data Validated?};
    I -- "No" --> J[Display Validation Errors];
    I -- "Yes" --> K[Show "Saving..." Loading State];
    K --> L{Save Successful?};
    L -- "No" --> M[Display Error Notification];
    L -- "Yes" --> N[Display Success Notification];
    N --> O[Exit: Persona Updated / My Personas List];
    M --> H;
```

*   **Entry Point:** "My Personas" list, clicking on a `PersonaPreviewCard`.
*   **Modal Usage:** None specific to editing, but `TraitExplanationModal` can be used.
*   **Validation States:** Same as "Create New Persona."
*   **Progress Visualization:** `ProgressStepper` and `CategoryTabs` show progress. `isDirty` flag in state management (from `06_state_management.md`) indicates unsaved changes, potentially triggering autosave banners.

### 3. Apply Persona to Agent Flow

**Goal:** Integrate a created persona with a CrewAI agent.

```mermaid
graph TD
    A[Entry: "My Personas" List / Persona Detail View] --> B[Click "Apply to Agent" Button];
    B --> C[Display "Apply to Agent" Modal];
    C --> D{Select Agent Role / Task?};
    D -- "Yes" --> E[Validate Agent/Task Selection];
    E -- "No" --> F[Display Validation Errors in Modal];
    E -- "Yes" --> G[Show "Applying Persona..." Loading State];
    G --> H{API Call to CrewAI Backend Successful?};
    H -- "No" --> I[Display Error Notification];
    H -- "Yes" --> J[Display Success Notification];
    J --> K[Exit: Modal Closes / Confirmation];
    I --> C;
```

*   **Entry Point:** `PersonaPreviewCard` in "My Personas" list or a dedicated persona detail page.
*   **Modal Usage:** "Apply to Agent Modal" for selecting agent roles and tasks.
*   **Validation States:** Validation within the modal for required fields (agent role, task).
*   **Progress Visualization:** Loading state within the modal, success/error notifications.

### 4. Preview Prompt Output Flow

**Goal:** Allow users to see how the current persona translates into an LLM prompt.

```mermaid
graph TD
    A[Entry: Persona Creation UI / Persona Detail View] --> B[Click "Preview Prompt" Button];
    B --> C[Show "Generating Preview..." Loading State];
    C --> D{Prompt Generation Successful?};
    D -- "No" --> E[Display Error Notification];
    D -- "Yes" --> F[Display "Prompt Output Preview" Modal];
    F --> G[Exit: Modal Closes];
```

*   **Entry Point:** Persona creation interface or persona detail view.
*   **Modal Usage:** "Prompt Output Preview Modal" to display the generated prompt.
*   **Validation States:** None specific, but generation might fail if persona data is incomplete/invalid.
*   **Progress Visualization:** Loading state for prompt generation, then the modal display.

### 5. Export/Import Persona Flow

**Goal:** Enable users to export persona JSON or import existing persona JSON files.

#### 5.1. Export Persona Flow

```mermaid
graph TD
    A[Entry: Persona Creation UI / Persona Detail View] --> B[Click "Export Persona" Button];
    B --> C[Display "Export Options" Modal];
    C --> D{Select Export Options (e.g., Pretty Print)?};
    D -- "Yes" --> E[Click "Download" Button];
    E --> F[Trigger File Download];
    F --> G[Display Success Notification];
    G --> H[Exit: Modal Closes];
```

*   **Entry Point:** Persona creation interface or persona detail view.
*   **Modal Usage:** "Export Options Modal."
*   **Validation States:** None.
*   **Progress Visualization:** Success notification after download.

#### 5.2. Import Persona Flow

```mermaid
graph TD
    A[Entry: Dashboard / "My Personas" List] --> B[Click "Import Persona" Button];
    B --> C[Open File Input Dialog];
    C --> D{File Selected?};
    D -- "No" --> E[Exit: Dialog Closed];
    D -- "Yes" --> F[Read File Content];
    F --> G{File Content Valid JSON?};
    G -- "No" --> I[Display Error Notification: Invalid JSON];
    G -- "Yes" --> H{JSON Valid Against Schema?};
    H -- "No" --> J[Display Error Notification: Schema Mismatch];
    H -- "Yes" --> K{Persona ID Exists?};
    K -- "No" --> L[Load Persona into UI / Save as New];
    K -- "Yes" --> M[Display "Overwrite/New" Confirmation Modal];
    M -- "Overwrite" --> N[Load Persona into UI / Overwrite Existing];
    M -- "Save as New" --> L;
    L --> O[Display Success Notification];
    N --> O;
    O --> P[Exit: Persona Loaded / Saved];
```

*   **Entry Point:** Dashboard or "My Personas" list.
*   **Modal Usage:** File input dialog, "Overwrite/New Confirmation Modal."
*   **Validation States:** JSON parsing validation, schema validation.
*   **Progress Visualization:** Loading state during file read, success/error notifications.

These user flows ensure a structured and guided experience, making PersonaForge easy to navigate and use for all persona management tasks.

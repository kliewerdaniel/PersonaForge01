“List and describe all frontend components used in the PersonaForge application, such as: TraitSlider, TraitExplanationModal, PersonaPreviewCard, SavePersonaButton, ProgressStepper, CategoryTabs, ToggleAdvanced. For each, describe props, state interactions, and UI behavior. Apply Hick’s Law (hide advanced settings), Zeigarnik Effect (progress saving), and Aesthetic design.”

---

## Frontend Components for PersonaForge

This document outlines the key frontend components used in the PersonaForge application, detailing their props, state interactions, and UI behavior. Cognitive design principles such as **Hick’s Law**, **Zeigarnik Effect**, and **Aesthetic design** are applied to enhance usability and user experience.

### Component List

1.  **TraitSlider**
    *   **Description:** A slider component used for adjusting individual persona trait values between 0 and 1.
    *   **Props:**
        *   `traitName: string` (e.g., "Formality", "Empathy")
        *   `value: number` (current trait value, 0-1)
        *   `min: number` (always 0)
        *   `max: number` (always 1)
        *   `step: number` (e.g., 0.01 for fine-grained control)
        *   `onChange: (newValue: number) => void` (callback for value changes)
        *   `tooltipContent: string` (short explanation for the trait)
    *   **State Interactions:**
        *   Internally manages its own slider position based on `value` prop.
        *   Triggers `onChange` prop when the user releases the slider or on continuous drag, updating the global persona state.
    *   **UI Behavior:**
        *   Displays the current numerical value next to the slider.
        *   Shows a tooltip with `tooltipContent` on hover, providing immediate context.
        *   Visually indicates active state when being dragged.
        *   **Aesthetic Design:** Smooth animation for slider movement, clear visual distinction between track and thumb, and a consistent color scheme.

2.  **TraitExplanationModal**
    *   **Description:** A modal window that provides detailed explanations for complex or nuanced persona traits.
    *   **Props:**
        *   `isOpen: boolean` (controls visibility)
        *   `onClose: () => void` (callback to close the modal)
        *   `title: string` (e.g., "Understanding Confirmation Bias")
        *   `content: string` (detailed explanation text)
    *   **State Interactions:**
        *   `isOpen` prop is controlled by the parent component (e.g., a button next to a TraitSlider).
        *   `onClose` is called when the user clicks the close button or outside the modal.
    *   **UI Behavior:**
        *   Overlays the main content, dimming the background.
        *   Contains a clear title, the explanation content, and a close button.
        *   **Aesthetic Design:** Clean, minimalist design with sufficient padding and readable typography. Smooth fade-in/fade-out animation.

3.  **PersonaPreviewCard**
    *   **Description:** A dynamic card component that provides a real-time summary or simulated output of the current persona being built.
    *   **Props:**
        *   `personaData: PersonaSchema` (the current JSON persona object)
    *   **State Interactions:**
        *   Receives `personaData` as a prop, which is updated from the global persona state.
        *   Rerenders automatically when `personaData` changes.
    *   **UI Behavior:**
        *   Displays key aspects of the persona (e.g., name, a summary of dominant traits, or a short generated text snippet reflecting the persona's communication style).
        *   May include a "Refresh Preview" button if the generation is computationally intensive.
        *   **Aesthetic Design:** Visually appealing card layout with clear headings and concise summaries. May use subtle animations to indicate updates.

4.  **SavePersonaButton**
    *   **Description:** A button to save the current persona.
    *   **Props:**
        *   `onClick: () => void` (callback to trigger save action)
        *   `isSaving: boolean` (indicates if a save operation is in progress)
        *   `isDisabled: boolean` (e.g., if persona is invalid or unchanged)
    *   **State Interactions:**
        *   `onClick` dispatches a save action to the state management system.
        *   `isSaving` prop is updated by the state management system to show loading state.
    *   **UI Behavior:**
        *   Changes text/icon to "Saving..." or displays a spinner when `isSaving` is true.
        *   Becomes disabled when `isDisabled` is true.
        *   **Optimistic UI:** May immediately show a "Saved!" notification before actual backend confirmation, then revert if an error occurs.
        *   **Zeigarnik Effect:** When a persona is in an unsaved state, this button might have a subtle visual cue (e.g., a pulsating border or a "Save Draft" label) to encourage completion.

5.  **ProgressStepper**
    *   **Description:** A visual indicator of the user's progress through the persona creation steps.
    *   **Props:**
        *   `steps: string[]` (array of step names, e.g., ["Core Traits", "Communication", "Review"])
        *   `currentStepIndex: number` (index of the currently active step)
    *   **State Interactions:**
        *   `currentStepIndex` is updated by the main application logic as the user navigates through categories or completes sections.
    *   **UI Behavior:**
        *   Displays each step, with the current step highlighted.
        *   Completed steps may have a checkmark or different styling.
        *   Clicking on a previous step allows navigation back (if valid).
        *   **Zeigarnik Effect:** Visually reinforces how much progress has been made and what remains, motivating users to complete the sequence.

6.  **CategoryTabs**
    *   **Description:** Tabs used to switch between different trait categories (e.g., "Communication Style," "Cognitive Biases").
    *   **Props:**
        *   `categories: string[]` (array of category names)
        *   `activeCategory: string` (name of the currently active category)
        *   `onSelectCategory: (categoryName: string) => void` (callback when a tab is clicked)
    *   **State Interactions:**
        *   `onSelectCategory` updates the `activeCategory` in the global state, which then controls which trait sliders are visible.
    *   **UI Behavior:**
        *   Visually highlights the `activeCategory` tab.
        *   Clicking a tab smoothly transitions to the corresponding content.
        *   **Law of Proximity:** Tabs are visually grouped at the top of the content area, clearly indicating their function as content selectors.

7.  **ToggleAdvanced**
    *   **Description:** A toggle switch to show or hide advanced persona settings or traits.
    *   **Props:**
        *   `isToggled: boolean` (current state of the toggle)
        *   `onToggle: (newState: boolean) => void` (callback for toggle state change)
        *   `label: string` (e.g., "Show Advanced Settings")
    *   **State Interactions:**
        *   `onToggle` updates a boolean in the global state that controls the visibility of advanced UI sections.
    *   **UI Behavior:**
        *   Visually indicates ON/OFF state.
        *   Clicking changes the state and reveals/hides content.
        *   **Hick’s Law:** By default, advanced settings are hidden, reducing the number of choices and complexity for new or casual users. Only when explicitly toggled do these options appear, managing cognitive load effectively.
        *   **Aesthetic Design:** Clean, satisfying toggle animation.

### Application of Cognitive Design Principles

*   **Hick’s Law (Hide Advanced Settings):** The `ToggleAdvanced` component is a direct application. By default, complex or less frequently used options are hidden, reducing the initial number of choices presented to the user. This simplifies the interface for new users and allows experienced users to progressively disclose more options as needed, minimizing decision time.

*   **Zeigarnik Effect (Progress Saving):** Components like `SavePersonaButton` and `ProgressStepper` leverage this. The `ProgressStepper` visually highlights incomplete sections, creating a mental "to-do" list that encourages users to complete the persona. The `SavePersonaButton` might subtly remind users to save, or an autosave banner could appear, ensuring that unfinished tasks are not forgotten and progress is retained, fostering a sense of commitment to completion.

*   **Aesthetic Design (Overall Appeal):** All components will adhere to a consistent visual language (colors, typography, spacing, border-radius, shadows) as defined in `09_visual_language.md`. This consistent aesthetic contributes to the **Aesthetic-Usability Effect**, making the application feel more professional, trustworthy, and enjoyable to use. Smooth animations, clear visual feedback, and thoughtful layouts across all components enhance the perceived usability and overall user satisfaction.

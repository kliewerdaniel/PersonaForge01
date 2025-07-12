“Describe the user interaction feedback system: loading states, tooltips, hover hints, save notifications, autosave banners, and progress animations. Use Doherty Threshold principles (sub-400ms interaction goals), optimistic UI for saving, and subtle animation cues to improve perceived responsiveness.”

---

## User Interaction Feedback System for PersonaForge

This document specifies the user interaction feedback system for PersonaForge, designed to enhance perceived responsiveness and user confidence. It incorporates **Doherty Threshold principles** (sub-400ms interaction goals), **optimistic UI** for saving, and **subtle animation cues**.

### 1. Loading States

Loading states are crucial for informing users that an action is in progress, preventing frustration and multiple clicks.

*   **Global Loading Spinner/Overlay:**
    *   **When:** For major data fetches (e.g., initial app load, loading a large saved persona, fetching presets).
    *   **Design:** A full-screen overlay with a central spinner and an optional, concise message (e.g., "Loading Persona...").
    *   **Principle:** Prevents user interaction with the entire UI during critical operations, ensuring data consistency.
*   **Component-Specific Loading Indicators:**
    *   **When:** For actions affecting only a specific component (e.g., `PersonaPreviewCard` generating a preview, `SavePersonaButton` during a save).
    *   **Design:** Inline spinners, disabled buttons, or skeleton loaders within the affected component.
    *   **Example:** `SavePersonaButton` will show "Saving..." text and a spinner when `isSaving` prop is true.
    *   **Principle:** Maintains responsiveness of other UI elements while a specific part loads.

### 2. Tooltips and Hover Hints

Provide immediate, contextual information without cluttering the main interface.

*   **Tooltips (for Trait Sliders):**
    *   **When:** On hover over `TraitSlider` labels or the slider thumb.
    *   **Content:** Concise, user-friendly explanations of each trait (as defined in `02_persona_schema.md`).
    *   **Design:** Small, non-intrusive pop-up boxes that appear quickly and disappear when the mouse moves away.
    *   **Principle:** Reduces cognitive load by providing "just-in-time" information, adhering to **Hick's Law** by not overwhelming the user with all details upfront.
*   **Hover Hints (for Buttons/Icons):**
    *   **When:** On hover over interactive icons or buttons without explicit text labels (e.g., "Export," "Delete," "Info" icons).
    *   **Content:** A short label describing the action (e.g., "Export Persona," "Delete Persona," "View Trait Details").
    *   **Design:** Similar to tooltips, but focused on action descriptions.
    *   **Principle:** Improves discoverability and clarity for icon-based interactions.

### 3. Save Notifications

Inform users about the success or failure of save operations.

*   **Success Notification:**
    *   **When:** Immediately after a successful save (manual or autosave).
    *   **Design:** A small, non-modal "toast" notification appearing at the top or bottom of the screen, with a green background/icon.
    *   **Content:** "Persona saved successfully!" or "Draft saved."
    *   **Duration:** Fades out automatically after 2-3 seconds.
    *   **Principle:** Provides positive reinforcement and confirms data persistence.
*   **Error Notification:**
    *   **When:** If a save operation fails.
    *   **Design:** A similar toast notification, but with a red background/icon.
    *   **Content:** "Save failed. Please try again." (with optional details for debugging).
    *   **Duration:** Stays visible longer (e.g., 5 seconds) or until dismissed by the user.
    *   **Principle:** Informs the user of issues and prompts for action.

### 4. Autosave Banners

Communicate the status of automatic saving.

*   **Design:** A subtle, persistent banner at the top or bottom of the main content area.
*   **States:**
    *   **"Saving draft..."**: Appears briefly when an autosave is triggered.
    *   **"Draft saved [timestamp]"**: Appears after a successful autosave, showing when it last occurred.
    *   **"Unsaved changes"**: Appears when `isDirty` is true and no autosave is in progress, subtly reminding the user.
*   **Principle:** Provides continuous feedback on data persistence, reducing user anxiety about losing work and reinforcing the **Zeigarnik Effect** by acknowledging incomplete work.

### 5. Progress Animations

Subtle visual cues that indicate ongoing processes or state changes.

*   **Slider Value Change Animation:**
    *   **When:** When a `TraitSlider` value is programmatically updated (e.g., by loading a preset).
    *   **Design:** Smooth, short animation of the slider thumb moving to the new position.
    *   **Principle:** Provides visual continuity and helps the user understand that a change has occurred.
*   **Tab/Section Transition Animation:**
    *   **When:** When switching between `CategoryTabs` or `ProgressStepper` sections.
    *   **Design:** A subtle fade or slide animation for content areas.
    *   **Principle:** Makes transitions feel smoother and less jarring, improving perceived performance.
*   **Button Click Feedback:**
    *   **When:** On clicking any interactive button.
    *   **Design:** A brief visual press effect (e.g., slight scale down, background color change).
    *   **Principle:** Provides immediate tactile feedback, confirming the click registration.

### 6. Doherty Threshold Principles (Sub-400ms Interaction Goals)

The entire feedback system is designed with the **Doherty Threshold** in mind:

*   **Instant Feedback:** For actions taking less than 400ms (e.g., slider adjustments, tab clicks, button presses), feedback should be immediate (visual changes, subtle animations).
*   **Loading Indicators for Longer Operations:** For operations exceeding 400ms (e.g., saving to backend, complex preview generation), a loading indicator (spinner, skeleton) should appear within 400ms to inform the user that the system is working. This prevents the user from perceiving a delay as a system freeze.
*   **Optimistic UI for Saving:** When a user clicks "Save," the UI immediately shows "Saved!" (or similar success state) while the actual backend save happens in the background. If the backend save fails, the UI reverts to an error state. This makes the application feel incredibly fast and responsive, as the user doesn't wait for network latency.

By meticulously implementing these feedback mechanisms, PersonaForge will provide a highly responsive, informative, and satisfying user experience, making the complex task of persona creation feel fluid and efficient.

“Define the visual design system: color palette, font stack, iconography, spacing scale, border radius tokens, box shadow presets. Align with Aesthetic-Usability principles. Include how these tie into Fitts’s Law (large actionable buttons), Law of Proximity (grouped inputs), and Law of Similarity (consistent toggles/selectors).”

---

## Visual Design System for PersonaForge

This document defines the visual design system for PersonaForge, ensuring a cohesive, aesthetically pleasing, and highly usable interface. It aligns with **Aesthetic-Usability principles** and demonstrates how design elements support cognitive laws like **Fitts’s Law**, **Law of Proximity**, and **Law of Similarity**.

### 1. Color Palette

A limited, purposeful color palette ensures visual harmony and guides user attention.

*   **Primary Accent:** `#6A6AFE` (Vibrant Purple/Blue) - For primary calls to action, active states, and key interactive elements (e.g., active slider thumb, primary buttons).
*   **Secondary Accent:** `#8E8EFF` (Lighter Purple/Blue) - For hover states, secondary buttons, and subtle highlights.
*   **Neutral/Grayscale:**
    *   `#FFFFFF` (White) - Backgrounds, card surfaces.
    *   `#F8F8F8` (Light Gray) - Secondary backgrounds, subtle dividers.
    *   `#E0E0E0` (Medium Gray) - Borders, inactive elements, slider tracks.
    *   `#A0A0A0` (Dark Gray) - Placeholder text, secondary text.
    *   `#333333` (Darkest Gray) - Primary text, headings.
*   **Semantic Colors:**
    *   `#4CAF50` (Green) - Success messages, positive indicators.
    *   `#F44336` (Red) - Error messages, destructive actions.
    *   `#FFC107` (Amber) - Warning messages, pending states.
*   **Principle:** The consistent use of a defined palette contributes to the **Aesthetic-Usability Effect**, making the interface feel polished and professional. Semantic colors provide immediate, intuitive feedback.

### 2. Font Stack

A clear and readable font stack ensures optimal legibility across various screen sizes.

*   **Primary Font (Sans-serif):** `Inter`, `Helvetica Neue`, `Arial`, `sans-serif`
    *   **Usage:** Body text, labels, general UI elements. Prioritizes readability and neutrality.
*   **Secondary Font (Optional, for Headings/Display):** `Montserrat`, `Roboto`, `sans-serif`
    *   **Usage:** H1, H2 headings, or prominent display text. Can be slightly bolder or more distinctive to create visual hierarchy.
*   **Font Sizes (Modular Scale):**
    *   `12px` (Caption, small labels)
    *   `14px` (Body text, input labels)
    *   `16px` (Default body text, button text)
    *   `18px` (Subheadings)
    *   `24px` (H3)
    *   `32px` (H2)
    *   `48px` (H1)
*   **Line Height:** `1.5` for body text for optimal readability.
*   **Principle:** Consistent typography reinforces the **Law of Similarity**, making text elements predictable and easy to scan. A well-defined hierarchy improves information processing.

### 3. Iconography

A consistent set of icons enhances visual communication and reduces reliance on text.

*   **Style:** Line-based, minimalist, and consistent stroke weight.
*   **Source:** A well-known icon library (e.g., Feather Icons, Material Design Icons) or custom-designed set.
*   **Usage:** Navigation, action buttons (e.g., Save, Export, Info), status indicators.
*   **Principle:** Icons, when used consistently and with clear meaning, contribute to the **Aesthetic-Usability Effect**. They also support **Fitts's Law** by providing larger, more easily targetable click areas when combined with text labels or tooltips.

### 4. Spacing Scale (Spacing Tokens)

A predefined, modular spacing system ensures consistent visual rhythm and hierarchy.

*   **Tokens (e.g., in `rem` or `px`):**
    *   `space-xs: 4px` (e.g., between icon and text)
    *   `space-sm: 8px` (e.g., small padding, gap between form elements)
    *   `space-md: 16px` (e.g., standard padding, gap between cards)
    *   `space-lg: 24px` (e.g., section margins, large gaps)
    *   `space-xl: 32px` (e.g., major section separation)
    *   `space-xxl: 48px` (e.g., page margins)
*   **Principle:** Consistent spacing directly applies the **Law of Proximity**. Elements that are functionally related are placed closer together, while unrelated elements have more space, making the visual relationships clear and intuitive. This also contributes to overall aesthetic appeal.

### 5. Border Radius Tokens

Consistent rounding of corners for UI elements.

*   **Tokens:**
    *   `radius-sm: 4px` (e.g., input fields, small buttons)
    *   `radius-md: 8px` (e.g., cards, panels)
    *   `radius-lg: 12px` (e.g., modals, larger containers)
    *   `radius-full: 9999px` (for circular elements like avatars or pills)
*   **Principle:** Contributes to the overall **Aesthetic-Usability Effect** by providing a soft, modern feel. Consistent use of border-radius across similar components reinforces the **Law of Similarity**.

### 6. Box Shadow Presets

Subtle shadows add depth and hierarchy to UI elements.

*   **Tokens:**
    *   `shadow-sm`: `0px 1px 3px rgba(0, 0, 0, 0.1)` (e.g., subtle lift for interactive elements on hover)
    *   `shadow-md`: `0px 4px 6px rgba(0, 0, 0, 0.1)` (e.g., default card shadow, panels)
    *   `shadow-lg`: `0px 10px 15px rgba(0, 0, 0, 0.15)` (e.g., modals, dropdowns, elements needing more emphasis)
*   **Principle:** Shadows help create a sense of depth, indicating which elements are interactive or "float" above others. This visual cue enhances the **Aesthetic-Usability Effect** and can subtly guide user attention.

### How Visual Language Ties into Cognitive Principles:

*   **Fitts’s Law (Large Actionable Buttons):** The color palette (primary accent for CTAs), font stack (clear, readable button text), and spacing scale (generous padding around buttons) will ensure that interactive buttons are visually prominent and have large, easy-to-target click areas. This reduces the time and effort required for users to interact with them.

*   **Law of Proximity (Grouped Inputs):** The spacing scale is fundamental here. Related input fields (e.g., all sliders for "Communication Style") will be placed close together with minimal `space-sm` or `space-md` between them, while distinct categories will be separated by `space-lg` or `space-xl`. This visual grouping makes it clear which elements belong together, reducing cognitive load.

*   **Law of Similarity (Consistent Toggles/Selectors):** The consistent application of the color palette (e.g., active state color), border-radius tokens, and iconography ensures that all interactive elements of the same type (e.g., all `TraitSlider` components, all `ToggleAdvanced` switches, all `CategoryTabs`) look and behave identically. This consistency allows users to quickly recognize and understand the function of elements across the application without re-learning, improving efficiency and reducing errors.

By adhering to this comprehensive visual design system, PersonaForge will offer a delightful and intuitive user experience that is both beautiful and highly functional.

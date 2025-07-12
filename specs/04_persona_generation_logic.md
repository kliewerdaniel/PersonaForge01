“Write the functional logic specification for converting UI-selected trait values into a usable JSON persona format for LLM prompts. Include rules for normalization (0–1), UUID generation for persona IDs, default presets, and how each trait will be used in a prompt template for agents. Discuss how the output can be exported, versioned, and imported back.”

---

## Persona Generation Logic Specification

This document details the functional logic for converting UI-selected trait values into a standardized JSON persona format, suitable for use with LLM prompts and agentic frameworks. It covers normalization, ID generation, presets, prompt templating, and data management (export/import/versioning).

### 1. Trait Value Normalization (0-1)

All UI-selected trait values are inherently designed to be within the range of 0 to 1. No additional normalization steps are required for values directly from the `TraitSlider` components, as their `min` and `max` props enforce this range.

*   **Input:** Raw numerical values from UI sliders (guaranteed 0-1).
*   **Output:** The same numerical values, directly mapped to the JSON schema.

### 2. UUID Generation for Persona IDs

Each new persona created will be assigned a unique identifier.

*   **Mechanism:** Upon initiating a "Create New Persona" flow, a new UUID (Universally Unique Identifier) will be generated. This UUID will serve as the `id` field in the persona's JSON schema.
*   **Implementation:** Use a standard UUID v4 generation library (e.g., `uuid` in JavaScript).
*   **Example:** `f47ac10b-58cc-4372-a567-0e02b2c3d479`

### 3. Default Presets

PersonaForge will offer a set of predefined persona presets to provide starting points for users.

*   **Definition:** Presets are pre-configured JSON persona objects (conforming to `02_persona_schema.md`) stored locally or fetched from a backend.
*   **Application Logic:**
    *   When a user selects a preset, the corresponding JSON data is loaded into the UI state, populating all `TraitSlider` and other input components.
    *   Users can then modify these preset values, effectively creating a new persona based on the preset.
*   **Initial Presets (Examples):**
    *   **"Neutral Assistant":** Low creativity, high formality, balanced empathy.
    *   **"Creative Brainstormer":** High creativity, low formality, high adventurousness.
    *   **"Cautious Analyst":** High caution, high directness, low adventurousness.

### 4. Trait Usage in LLM Prompt Templates

The generated JSON persona will be dynamically injected into LLM prompt templates to influence agent behavior. The mapping from trait values (0-1) to prompt instructions will be qualitative and context-dependent.

*   **General Approach:**
    *   Each trait value will be translated into a descriptive phrase or a numerical instruction within the prompt.
    *   Conditional logic can be used to generate different prompt segments based on trait ranges (e.g., 0-0.3 = "low", 0.3-0.7 = "medium", 0.7-1 = "high").
*   **Example Prompt Template Snippet (Conceptual):**

    ```
    You are an AI agent named {persona.name}.
    Your communication style is:
    - Formality: {persona.traits.communicationStyle.formality_description}
    - Verbosity: {persona.traits.communicationStyle.verbosity_description}
    - Directness: {persona.traits.communicationStyle.directness_description}
    - Tone: {persona.traits.communicationStyle.tone_description}

    When making decisions, you exhibit:
    - Confirmation Bias: {persona.traits.cognitiveBiases.confirmationBias_description}
    - Anchoring Bias: {persona.traits.cognitiveBiases.anchoringBias_description}

    Your emotional expression is:
    - Empathy: {persona.traits.emotionalRange.empathy_description}
    ...
    ```

*   **Trait-to-Description Mapping Logic (Example for `formality`):**

    ```javascript
    function getFormalityDescription(value) {
      if (value <= 0.2) return "very informal and casual";
      if (value <= 0.5) return "moderately informal";
      if (value <= 0.8) return "moderately formal";
      return "very formal and professional";
    }
    // This function would be applied to all traits to generate their descriptive strings.
    ```

*   **Dynamic Prompt Generation:** The frontend (or a dedicated backend service) will construct the full prompt string by iterating through the persona's traits and inserting the generated descriptions or raw values into a predefined template.

### 5. Exporting Persona Output

Users will be able to export their created personas for external use.

*   **Format:** JSON (conforming to `02_persona_schema.md`).
*   **Mechanism:**
    *   A "Export Persona" button will trigger a download of the current persona's JSON data.
    *   The file name will be `persona_[persona_name]_[uuid_prefix].json` (e.g., `persona_CreativeBrainstormer_f47ac10b.json`).
*   **Options (Modal):**
    *   **Include Description:** Option to include the user-defined `description` field.
    *   **Pretty Print:** Option to format the JSON with indentation for readability.
    *   **Minified:** Option for compact JSON for programmatic use.

### 6. Versioning Personas

While the core schema remains stable, individual persona instances can be versioned to track changes.

*   **Mechanism:**
    *   When a persona is saved, if it's an existing persona, a new version could be created. This might involve storing previous states or simply updating a `lastModified` timestamp and a `version` number.
    *   For simplicity in the initial build, versioning might be limited to a `lastModified` timestamp and a simple integer `version` field within the persona JSON itself, incremented on each save.
    *   More advanced versioning (e.g., Git-like history) would require backend support.
*   **Schema Addition (Optional for initial build, but good for future):**
    ```json
    "metadata": {
      "type": "object",
      "properties": {
        "createdAt": { "type": "string", "format": "date-time" },
        "lastModified": { "type": "string", "format": "date-time" },
        "version": { "type": "integer", "minimum": 1 }
      }
    }
    ```

### 7. Importing Personas

Users will be able to import existing persona JSON files.

*   **Mechanism:**
    *   An "Import Persona" button will open a file input dialog.
    *   The selected JSON file will be read and validated against `02_persona_schema.md`.
    *   If valid, the imported persona data will populate the UI, allowing for editing or saving as a new persona.
*   **Validation Logic:**
    *   Check if the imported JSON adheres to the `AIPersona` schema.
    *   Handle parsing errors (e.g., invalid JSON format).
    *   Provide user feedback for successful imports or validation failures.
*   **Conflict Resolution (if `id` exists):**
    *   If an imported persona's `id` already exists in the user's saved personas, prompt the user:
        *   "Overwrite existing persona?"
        *   "Save as new persona?" (generates a new UUID for the imported data).

This comprehensive logic ensures that PersonaForge can effectively create, manage, and integrate AI personas with LLM-based agent systems.

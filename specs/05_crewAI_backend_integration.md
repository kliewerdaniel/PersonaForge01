“Specify how the PersonaForge frontend will integrate with a CrewAI backend setup. Detail how personas will be passed into CrewAI agents, and how different agent roles (Planner, Researcher, Executor) might use different subsets of persona traits. Include example API endpoints and schemas for interacting with agent configuration.”

---

## CrewAI Backend Integration Specification

This document outlines how the PersonaForge frontend will integrate with a CrewAI backend setup. It details the mechanism for passing personas to CrewAI agents, how different agent roles might utilize specific subsets of persona traits, and provides example API endpoints and schemas for interaction.

### 1. Overview of Integration Flow

The integration will follow a client-server model where PersonaForge (frontend) sends persona data to a CrewAI backend service. This service will then instantiate or configure CrewAI agents with the provided persona traits.

1.  **Persona Creation/Selection (Frontend):** User defines or selects a persona in PersonaForge.
2.  **Persona Export/Send (Frontend):** The frontend sends the complete JSON persona object to the CrewAI backend.
3.  **Agent Configuration (Backend):** The CrewAI backend receives the persona, parses it, and uses the trait values to dynamically configure the behavior, prompt, or tools of individual agents within a CrewAI task.
4.  **Task Execution (Backend):** CrewAI agents, now imbued with their personas, execute their assigned tasks.

### 2. Passing Personas to CrewAI Agents

Personas will be passed to the CrewAI backend as a complete JSON object, conforming to the schema defined in `02_persona_schema.md`.

*   **Method:** HTTP POST request.
*   **Endpoint:** A dedicated API endpoint on the CrewAI backend will receive the persona data.
*   **Data Structure:** The request body will contain the full `AIPersona` JSON object.

### 3. Trait Utilization by Different Agent Roles

Different agent roles within CrewAI (e.g., Planner, Researcher, Executor) will leverage specific subsets of persona traits to optimize their performance and behavior for their designated functions. This allows for fine-grained control over a multi-agent system's collective intelligence.

#### Example Agent Roles and Trait Usage:

1.  **Planner Agent:**
    *   **Role:** Responsible for breaking down complex tasks, defining sub-tasks, and outlining the overall strategy.
    *   **Key Persona Traits Utilized:**
        *   **Creativity (Originality, Flexibility):** Influences how novel or conventional the planning strategies are. A high `originality` might lead to unconventional, innovative plans.
        *   **Cognitive Biases (Confirmation Bias, Anchoring Bias):** A low `confirmationBias` ensures the planner considers diverse approaches, not just those confirming initial assumptions.
        *   **Risk Tolerance (Caution, Adventurousness):** Determines if the planner prefers safe, predictable plans or more experimental, high-reward strategies.
    *   **Integration:** The planner's system prompt or initial instructions will be augmented with directives based on these traits. For example: "As a Planner, you prioritize highly original solutions and are not afraid to explore unconventional paths."

2.  **Researcher Agent:**
    *   **Role:** Gathers information, analyzes data, and provides insights relevant to the task.
    *   **Key Persona Traits Utilized:**
        *   **Learning Style (Curiosity, Adaptability):** A high `curiosity` encourages deeper exploration, while `adaptability` helps in quickly processing new information sources.
        *   **Cognitive Biases (Recency Bias):** A low `recencyBias` ensures the researcher considers historical data as much as recent findings.
        *   **Communication Style (Verbosity, Directness):** Influences how detailed and straightforward the research findings are presented.
    *   **Integration:** The researcher's prompt will guide its information-gathering and synthesis process. For example: "As a Researcher, you are highly curious and will seek out comprehensive information, presenting findings concisely."

3.  **Executor Agent:**
    *   **Role:** Takes the plan and research findings and executes the actual steps, potentially interacting with external tools or APIs.
    *   **Key Persona Traits Utilized:**
        *   **Communication Style (Formality, Directness):** Influences how the executor reports progress or interacts with other agents/systems.
        *   **Emotional Range (Patience):** A high `patience` helps the executor handle delays or unexpected issues during execution without "giving up."
        *   **Risk Tolerance (Caution):** A high `caution` might lead the executor to double-check steps or seek confirmation before proceeding with critical actions.
    *   **Integration:** The executor's operational guidelines will be shaped by these traits. For example: "As an Executor, you are very cautious and will ensure all steps are verified before proceeding, reporting progress formally."

### 4. Example API Endpoints and Schemas

The CrewAI backend will expose API endpoints for managing and interacting with agents and tasks.

#### Endpoint: `/api/agents/configure`

*   **Purpose:** To configure or update a CrewAI agent's persona.
*   **Method:** `POST`
*   **Request Body Schema:**

    ```json
    {
      "type": "object",
      "properties": {
        "agent_id": {
          "type": "string",
          "description": "The ID of the CrewAI agent to configure (optional, if creating new)."
        },
        "agent_role": {
          "type": "string",
          "enum": ["Planner", "Researcher", "Executor", "Custom"],
          "description": "The role of the agent being configured."
        },
        "persona": {
          "$ref": "path/to/02_persona_schema.json"
          // In a real setup, this would be a direct reference or the full schema embedded.
          // For this spec, assume the full persona object from 02_persona_schema.md
        },
        "task_id": {
          "type": "string",
          "description": "Optional: The ID of the task this agent will be assigned to."
        }
      },
      "required": ["agent_role", "persona"]
    }
    ```

*   **Response Body Schema (Success):**

    ```json
    {
      "type": "object",
      "properties": {
        "status": { "type": "string", "enum": ["success"] },
        "message": { "type": "string" },
        "configured_agent_id": { "type": "string", "description": "The ID of the configured agent." }
      }
    }
    ```

*   **Response Body Schema (Error):**

    ```json
    {
      "type": "object",
      "properties": {
        "status": { "type": "string", "enum": ["error"] },
        "message": { "type": "string" },
        "details": { "type": "string" }
      }
    }
    ```

#### Endpoint: `/api/tasks/create`

*   **Purpose:** To initiate a new CrewAI task with configured agents.
*   **Method:** `POST`
*   **Request Body Schema:**

    ```json
    {
      "type": "object",
      "properties": {
        "task_name": {
          "type": "string",
          "description": "Name of the task."
        },
        "task_description": {
          "type": "string",
          "description": "Detailed description of the task."
        },
        "agents": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "agent_id": { "type": "string", "description": "ID of a pre-configured agent." },
              "role": { "type": "string", "description": "Role of the agent in this task." }
            },
            "required": ["agent_id", "role"]
          },
          "description": "List of agents and their roles for this task."
        },
        "output_format": {
          "type": "string",
          "enum": ["text", "json", "markdown"],
          "default": "text"
        }
      },
      "required": ["task_name", "task_description", "agents"]
    }
    ```

*   **Response Body Schema (Success):**

    ```json
    {
      "type": "object",
      "properties": {
        "status": { "type": "string", "enum": ["success"] },
        "message": { "type": "string" },
        "task_run_id": { "type": "string", "description": "Unique ID for the initiated task run." }
      }
    }
    ```

This integration strategy allows PersonaForge to act as a powerful front-end for defining and managing the "personalities" of AI agents within a CrewAI ecosystem, enabling more dynamic and controlled multi-agent behaviors.

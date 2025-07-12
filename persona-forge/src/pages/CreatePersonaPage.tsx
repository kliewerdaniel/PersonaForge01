import React, { useState, useEffect } from 'react';
import { usePersonaStore } from '../store/personaStore';
import CategoryTabs from '../components/CategoryTabs';
import TraitSlider from '../components/TraitSlider';
import PersonaPreviewCard from '../components/PersonaPreviewCard';
import SavePersonaButton from '../components/SavePersonaButton';
import NotificationContainer from '../components/NotificationToast';
import { useNotificationStore } from '../store/notificationStore';
import ProgressStepper from '../components/ProgressStepper';
import type { AIPersona } from '../types/persona';
import { useProgressStore } from '../store/progressStore';
import { useSavedPersonasStore } from '../store/savedPersonasStore';

const traitCategories: { [key in keyof AIPersona['traits']]: { [key: string]: string } } = {
  communicationStyle: {
    formality: "How formal or casual the AI's language is. (0: Very Informal, 1: Very Formal)",
    verbosity: "How concise or verbose the AI's responses are. (0: Very Concise, 1: Very Verbose)",
    directness: "How direct or indirect the AI's communication is. (0: Very Indirect, 1: Very Direct)",
    tone: "The overall emotional tone of the AI's communication. (0: Neutral/Objective, 1: Expressive/Emotional)",
  },
  cognitiveBiases: {
    confirmationBias: "Tendency to favor information confirming existing beliefs. (0: Open-minded, 1: Strongly biased)",
    anchoringBias: "Reliance on initial information when making decisions. (0: Flexible, 1: Heavily anchored)",
    recencyBias: "Emphasis on recent information over older data. (0: Balanced, 1: Focus on recent)",
  },
  emotionalRange: {
    empathy: "Ability to understand and share the feelings of others. (0: Detached, 1: Highly Empathetic)",
    optimism: "Tendency to be hopeful and confident about the future. (0: Pessimistic, 1: Optimistic)",
    patience: "Capacity to accept delay or difficulty without becoming annoyed. (0: Impatient, 1: Very Patient)",
  },
  creativity: {
    originality: "How unique or conventional the AI's ideas are. (0: Conventional, 1: Highly Original)",
    flexibility: "Ability to adapt to new ideas or change approaches. (0: Rigid, 1: Highly Flexible)",
  },
  riskTolerance: {
    adventurousness: "How willing the AI is to explore new or uncertain paths. (0: Risk-averse, 1: Highly Adventurous)",
    caution: "How much the AI prioritizes safety and predictability. (0: Reckless, 1: Very Cautious)",
  },
  learningStyle: {
    adaptability: "How quickly the AI adjusts to new data or environments. (0: Slow to adapt, 1: Highly adaptable)",
    curiosity: "The AI's inclination to seek out new information or explore. (0: Indifferent, 1: Highly Curious)",
  },
};

const CreatePersonaPage: React.FC = () => {
  const { currentPersona, setTraitValue, setPersonaName, setPersonaDescription, markAsSaved, loadPersona } = usePersonaStore();
  const { addNotification } = useNotificationStore();
  const { setCurrentSection, markSectionComplete } = useProgressStore();
  const { addPersona, updatePersona, personas } = useSavedPersonasStore();
  const [activeCategory, setActiveCategory] = useState<keyof AIPersona['traits']>('communicationStyle');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setCurrentSection(activeCategory);
    // Mark section complete if all traits in it have been touched (simplified for now)
    const allTraitsTouched = Object.keys(traitCategories[activeCategory]).every(traitKey => 
      (currentPersona.traits[activeCategory] as any)[traitKey] !== undefined
    );
    if (allTraitsTouched) {
      markSectionComplete(activeCategory);
    }
  }, [activeCategory, currentPersona.traits, setCurrentSection, markSectionComplete, traitCategories]);

  const handleSavePersona = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Shorter delay for better UX

      const existingPersona = personas.find(p => p.id === currentPersona.id);
      if (existingPersona) {
        updatePersona(currentPersona);
        addNotification(`Persona '${currentPersona.name}' updated successfully!`, 'success');
      } else {
        addPersona(currentPersona);
        addNotification(`Persona '${currentPersona.name}' saved successfully!`, 'success');
      }
      markAsSaved();
    } catch (error) {
      console.error('Failed to save persona:', error);
      addNotification('Failed to save persona.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const isSaveDisabled = !currentPersona.name.trim(); // Disable if name is empty

  const handleExportPersona = () => {
    const filename = `persona_${currentPersona.name.replace(/\s+/g, '_')}_${currentPersona.id.substring(0, 8)}.json`;
    const jsonStr = JSON.stringify(currentPersona, null, 2); // Pretty print JSON

    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addNotification('Persona exported successfully!', 'success');
  };

  const handleImportPersona = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedData: AIPersona = JSON.parse(content);

        // Basic validation: check for required fields and structure
        if (!importedData.id || !importedData.name || !importedData.traits) {
          throw new Error('Invalid persona format: Missing required fields (id, name, traits).');
        }
        // More robust validation would involve a JSON schema validator library

        loadPersona(importedData);
        addNotification(`Persona '${importedData.name}' imported successfully!`, 'success');
      } catch (error: any) {
        console.error('Failed to import persona:', error);
        addNotification(`Failed to import persona: ${error.message}`, 'error');
      } finally {
        // Clear the file input to allow re-importing the same file
        event.target.value = '';
      }
    };
    reader.readAsText(file);
  };

  const currentCategoryTraits = traitCategories[activeCategory];

  return (
    <div className="flex-1 p-lg flex">
      <div className="flex-1 pr-lg">
        <h2 className="text-2xl font-display font-bold mb-lg">Create Persona</h2>
        <NotificationContainer />

        <ProgressStepper
          steps={Object.keys(traitCategories).map(key => key.replace(/([A-Z])/g, ' $1').trim())}
          currentStepIndex={Object.keys(traitCategories).indexOf(activeCategory)}
          onStepClick={(index) => setActiveCategory(Object.keys(traitCategories)[index] as keyof AIPersona['traits'])}
        />

        {/* Persona Name and Description */}
        <div className="bg-neutral-100 p-md rounded-md shadow-md mb-lg">
          <h3 className="text-lg font-display font-bold text-primary mb-sm">Persona Details</h3>
          <div className="mb-md">
            <label htmlFor="personaName" className="block text-sm font-medium text-neutral-500 mb-xs">
              Persona Name
            </label>
            <input
              type="text"
              id="personaName"
              value={currentPersona.name}
              onChange={(e) => setPersonaName(e.target.value)}
              className="w-full p-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="e.g., Creative Assistant"
            />
          </div>
          <div className="mb-md">
            <label htmlFor="personaDescription" className="block text-sm font-medium text-neutral-500 mb-xs">
              Description
            </label>
            <textarea
              id="personaDescription"
              value={currentPersona.description || ''}
              onChange={(e) => setPersonaDescription(e.target.value)}
              rows={3}
              className="w-full p-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary resize-y"
              placeholder="A brief overview of this persona's character..."
            ></textarea>
          </div>
        </div>

        {/* Trait Categories */}
        <CategoryTabs
          categories={Object.keys(traitCategories)}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory as (category: string) => void}
        />

        {/* Trait Sliders for Active Category */}
        <div className="bg-neutral-100 p-md rounded-md shadow-md">
          <h3 className="text-lg font-display font-bold text-primary mb-lg">
            {activeCategory.replace(/([A-Z])/g, ' $1').trim()} Traits
          </h3>
          {Object.entries(currentCategoryTraits).map(([traitKey, tooltipContent]) => (
            <TraitSlider
              key={traitKey}
              traitName={traitKey.replace(/([A-Z])/g, ' $1').trim()}
              value={(currentPersona.traits[activeCategory] as any)[traitKey]}
              onChange={(newValue) => setTraitValue(activeCategory, traitKey, newValue)}
              tooltipContent={tooltipContent}
            />
          ))}
        </div>
      </div>

      {/* Right Sidebar for Persona Preview */}
      <div className="w-80 flex-shrink-0 flex flex-col">
        <PersonaPreviewCard personaData={currentPersona} />
        <div className="mt-auto p-md bg-neutral-100 rounded-md shadow-md">
          <SavePersonaButton
            onClick={handleSavePersona}
            isSaving={isSaving}
            isDisabled={isSaveDisabled}
          />
          <button
            onClick={handleExportPersona}
            className="w-full py-sm px-md rounded-md font-semibold transition-colors duration-200 bg-neutral-300 text-neutral-500 hover:bg-neutral-400 mt-sm"
          >
            Export Persona (JSON)
          </button>
          <input
            type="file"
            id="importPersonaInput"
            className="hidden"
            accept=".json"
            onChange={handleImportPersona}
          />
          <button
            onClick={() => document.getElementById('importPersonaInput')?.click()}
            className="w-full py-sm px-md rounded-md font-semibold transition-colors duration-200 bg-neutral-300 text-neutral-500 hover:bg-neutral-400 mt-sm"
          >
            Import Persona (JSON)
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePersonaPage;

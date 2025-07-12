import React from 'react';
import type { AIPersona } from '../types/persona';

interface PersonaPreviewCardProps {
  personaData: AIPersona;
}

const PersonaPreviewCard: React.FC<PersonaPreviewCardProps> = ({ personaData }) => {
  return (
    <div className="bg-neutral-100 p-md rounded-md shadow-md mb-lg">
      <h3 className="text-lg font-display font-bold text-primary mb-sm">Persona Preview</h3>
      <div className="text-sm text-neutral-500">
        <p className="mb-xs"><strong>Name:</strong> {personaData.name}</p>
        <p className="mb-xs"><strong>Description:</strong> {personaData.description || 'No description provided.'}</p>
        <p className="mb-xs"><strong>ID:</strong> {personaData.id}</p>
        <p className="mb-xs"><strong>Last Modified:</strong> {new Date(personaData.metadata?.lastModified || '').toLocaleString()}</p>
        <p className="mb-xs"><strong>Version:</strong> {personaData.metadata?.version}</p>
        
        <h4 className="text-md font-semibold mt-md mb-xs">Persona JSON:</h4>
        <pre className="bg-neutral-200 p-xs rounded-sm overflow-auto text-xs">
          <code>{JSON.stringify(personaData, null, 2)}</code>
        </pre>
      </div>
      {/* Future: Add a more dynamic preview, e.g., a generated text snippet */}
    </div>
  );
};

export default PersonaPreviewCard;

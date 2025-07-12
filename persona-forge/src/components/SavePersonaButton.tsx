import React from 'react';

interface SavePersonaButtonProps {
  onClick: () => void;
  isSaving: boolean;
  isDisabled: boolean;
}

const SavePersonaButton: React.FC<SavePersonaButtonProps> = ({
  onClick,
  isSaving,
  isDisabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled || isSaving}
      className={`py-sm px-md rounded-md font-semibold transition-colors duration-200
        ${isDisabled || isSaving
          ? 'bg-neutral-300 text-neutral-400 cursor-not-allowed'
          : 'bg-primary text-white hover:bg-secondary'
        }`}
    >
      {isSaving ? 'Saving...' : 'Save Persona'}
    </button>
  );
};

export default SavePersonaButton;

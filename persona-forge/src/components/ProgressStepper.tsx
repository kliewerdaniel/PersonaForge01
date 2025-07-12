import React from 'react';

interface ProgressStepperProps {
  steps: string[];
  currentStepIndex: number;
  onStepClick?: (index: number) => void; // Optional for navigation
}

const ProgressStepper: React.FC<ProgressStepperProps> = ({
  steps,
  currentStepIndex,
  onStepClick,
}) => {
  return (
    <div className="flex items-center justify-between mb-lg">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div
            className={`flex flex-col items-center cursor-pointer ${
              index <= currentStepIndex ? 'text-primary' : 'text-neutral-400'
            }`}
            onClick={() => onStepClick && onStepClick(index)}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                ${index <= currentStepIndex ? 'bg-primary text-white' : 'bg-neutral-300 text-neutral-500'}`}
            >
              {index + 1}
            </div>
            <span className="mt-xs text-xs text-center">{step}</span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-1 mx-xs ${
                index < currentStepIndex ? 'bg-primary' : 'bg-neutral-300'
              }`}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressStepper;

import React from 'react';

interface TraitSliderProps {
  traitName: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (newValue: number) => void;
  tooltipContent: string;
}

const TraitSlider: React.FC<TraitSliderProps> = ({
  traitName,
  value,
  min = 0,
  max = 1,
  step = 0.01,
  onChange,
  tooltipContent,
}) => {
  const displayValue = (value * 100).toFixed(0); // Convert 0-1 to 0-100 for display

  return (
    <div className="mb-md">
      <div className="flex justify-between items-center mb-xs">
        <label htmlFor={traitName} className="text-sm font-medium text-neutral-500">
          {traitName}
        </label>
        <span className="text-sm font-semibold text-primary">{displayValue}%</span>
      </div>
      <input
        type="range"
        id={traitName}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-neutral-300 rounded-lg appearance-none cursor-pointer accent-primary"
        title={tooltipContent}
      />
      <p className="text-xs text-neutral-400 mt-xs">{tooltipContent}</p>
    </div>
  );
};

export default TraitSlider;

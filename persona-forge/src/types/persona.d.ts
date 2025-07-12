// persona.d.ts
// This file defines the TypeScript interfaces for the AI Persona schema.

export interface AIPersona {
  id: string;
  name: string;
  description?: string;
  traits: {
    communicationStyle: {
      formality: number;
      verbosity: number;
      directness: number;
      tone: number;
    };
    cognitiveBiases: {
      confirmationBias: number;
      anchoringBias: number;
      recencyBias: number;
    };
    emotionalRange: {
      empathy: number;
      optimism: number;
      patience: number;
    };
    creativity: {
      originality: number;
      flexibility: number;
    };
    riskTolerance: {
      adventurousness: number;
      caution: number;
    };
    learningStyle: {
      adaptability: number;
      curiosity: number;
    };
  };
  metadata?: {
    createdAt: string;
    lastModified: string;
    version: number;
  };
}

export interface PredictionResult {
  isFake: boolean;
  confidence: number;
  confidence_real: number;
  confidence_fake: number;
  risk_level: "LOW" | "MEDIUM" | "HIGH";
  riskFactors?: string[];
  skills?: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  jobDescription: string;
  preview: string;
  result: PredictionResult;
}

export interface SkillInfo {
  name: string;
  description: string;
  roadmap: {
    beginner: string[];
    intermediate: string[];
    advanced: string[];
  };
  resources: {
    name: string;
    type: "course" | "documentation" | "video" | "practice";
    url: string;
  }[];
}

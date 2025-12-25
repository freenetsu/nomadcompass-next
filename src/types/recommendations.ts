import type { QuestionnaireFormData } from "@/lib/validations/questionnaire";

export interface CountryRecommendation {
  countryId: string;
  countryName: string;
  countryCode: string;
  flag: string;
  overallScore: number; // 0-100
  matchPercentage: number; // 0-100
  strengths: string[]; // Points forts du pays
  weaknesses: string[]; // Points faibles du pays
  summary: string; // Résumé de la recommandation
  scores: {
    budget: number; // 0-100
    climate: number; // 0-100
    safety: number; // 0-100
    healthcare: number; // 0-100
    lifestyle: number; // 0-100
  };
  data: {
    costOfLivingIndex?: number;
    averageRent?: number;
    averageTemp?: number;
    climate?: string;
    safetyIndex?: number;
    healthcareIndex?: number;
    pollutionIndex?: number;
  };
}

export interface RecommendationsResponse {
  recommendations: CountryRecommendation[];
  userProfile: {
    questionnaire: QuestionnaireFormData;
    analyzedAt: string;
  };
  analysis: {
    topPriorities: Array<{ name: string; score: number }>;
    budgetCategory: "economique" | "moyen" | "eleve";
    climatePreference: string;
  };
}

export interface ClaudeAnalysisInput {
  questionnaire: QuestionnaireFormData;
  countries: Array<{
    id: string;
    name: string;
    code: string;
    flag: string;
    data: {
      costOfLivingIndex?: number;
      averageRent?: number;
      averageSalary?: number;
      averageTemp?: number;
      climate?: string;
      safetyIndex?: number;
      healthcareIndex?: number;
      pollutionIndex?: number;
      transportIndex?: number;
    };
  }>;
}

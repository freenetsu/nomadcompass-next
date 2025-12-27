import type {
  ClaudeAnalysisInput,
  CountryRecommendation,
} from "@/types/recommendations";
import type { QuestionnaireFormData } from "./validations/questionnaire";

/**
 * Génère des recommandations mockées basées sur le questionnaire utilisateur
 * Utilisé en mode développement sans API Anthropic
 */
export function generateMockRecommendations(
  questionnaire: QuestionnaireFormData,
  countries: ClaudeAnalysisInput["countries"],
): CountryRecommendation[] {
  const recommendations: CountryRecommendation[] = countries.map((country) => {
    // Calculer les scores basés sur les priorités utilisateur
    const budgetScore = calculateBudgetScore(
      questionnaire.budget.budgetMensuel,
      country.data.costOfLivingIndex,
      country.data.averageRent,
    );

    const climateScore = calculateClimateScore(
      questionnaire.climat.temperaturePreferee,
      country.data.averageTemp,
      country.data.climate,
    );

    const safetyScore = country.data.safetyIndex || 70;
    const healthcareScore = country.data.healthcareIndex || 70;

    const lifestyleScore = calculateLifestyleScore(
      questionnaire.priorites,
      country.data,
    );

    // Score global pondéré par les priorités
    const overallScore = calculateOverallScore(
      {
        budget: budgetScore,
        climate: climateScore,
        safety: safetyScore,
        healthcare: healthcareScore,
        lifestyle: lifestyleScore,
      },
      questionnaire.priorites,
    );

    // Générer les points forts et faibles
    const { strengths, weaknesses } = generateStrengthsWeaknesses(
      country,
      {
        budget: budgetScore,
        climate: climateScore,
        safety: safetyScore,
        healthcare: healthcareScore,
        lifestyle: lifestyleScore,
      },
      questionnaire,
    );

    // Générer un résumé personnalisé
    const summary = generateSummary(
      country,
      questionnaire,
      overallScore,
      budgetScore,
      climateScore,
    );

    return {
      countryId: country.id,
      countryName: country.name,
      countryCode: country.code,
      flag: country.flag,
      overallScore: Math.round(overallScore),
      matchPercentage: Math.round((overallScore / 100) * 100),
      strengths,
      weaknesses,
      summary,
      scores: {
        budget: Math.round(budgetScore),
        climate: Math.round(climateScore),
        safety: Math.round(safetyScore),
        healthcare: Math.round(healthcareScore),
        lifestyle: Math.round(lifestyleScore),
      },
      data: {
        costOfLivingIndex: country.data.costOfLivingIndex,
        averageRent: country.data.averageRent,
        averageTemp: country.data.averageTemp,
        climate: country.data.climate,
        safetyIndex: country.data.safetyIndex,
        healthcareIndex: country.data.healthcareIndex,
        pollutionIndex: country.data.pollutionIndex,
      },
    };
  });

  // Trier par score global décroissant
  return recommendations.sort((a, b) => b.overallScore - a.overallScore);
}

function calculateBudgetScore(
  userBudget: number,
  costIndex?: number,
  avgRent?: number,
): number {
  if (!costIndex) return 70;

  // Plus le coût est bas par rapport au budget, meilleur le score
  const estimatedCost = (costIndex / 100) * 1500 + (avgRent || 800);
  const ratio = userBudget / estimatedCost;

  if (ratio >= 2) return 95; // Budget très confortable
  if (ratio >= 1.5) return 85; // Budget confortable
  if (ratio >= 1.2) return 75; // Budget correct
  if (ratio >= 1) return 65; // Budget juste
  if (ratio >= 0.8) return 50; // Budget serré
  return 35; // Budget insuffisant
}

function calculateClimateScore(
  preference: string,
  avgTemp?: number,
  climate?: string,
): number {
  if (!avgTemp) return 70;

  const tempRanges: Record<string, [number, number]> = {
    froid: [-10, 10],
    tempere: [10, 20],
    chaud: [20, 28],
    tropical: [25, 35],
  };

  const [minTemp, maxTemp] = tempRanges[preference] || [10, 20];

  if (avgTemp >= minTemp && avgTemp <= maxTemp) return 95;
  const diff = Math.min(
    Math.abs(avgTemp - minTemp),
    Math.abs(avgTemp - maxTemp),
  );
  return Math.max(50, 95 - diff * 5);
}

function calculateLifestyleScore(
  priorities: QuestionnaireFormData["priorites"],
  countryData: ClaudeAnalysisInput["countries"][0]["data"],
): number {
  let score = 0;
  let totalWeight = 0;

  // Culture et environnement
  if (priorities.culture) {
    score += 75 * priorities.culture;
    totalWeight += priorities.culture;
  }

  if (priorities.environnement && countryData.pollutionIndex) {
    const envScore = Math.max(0, 100 - countryData.pollutionIndex);
    score += envScore * priorities.environnement;
    totalWeight += priorities.environnement;
  }

  // Transport
  if (countryData.transportIndex) {
    score += countryData.transportIndex * 2;
    totalWeight += 2;
  }

  return totalWeight > 0 ? score / totalWeight : 70;
}

function calculateOverallScore(
  scores: {
    budget: number;
    climate: number;
    safety: number;
    healthcare: number;
    lifestyle: number;
  },
  priorities: QuestionnaireFormData["priorites"],
): number {
  let totalScore = 0;
  let totalWeight = 0;

  totalScore += scores.budget * priorities.coutVie;
  totalWeight += priorities.coutVie;

  totalScore += scores.climate * 3; // Climat toujours important
  totalWeight += 3;

  totalScore += scores.safety * priorities.securite;
  totalWeight += priorities.securite;

  totalScore += scores.healthcare * priorities.sante;
  totalWeight += priorities.sante;

  totalScore += scores.lifestyle * priorities.culture;
  totalWeight += priorities.culture;

  return totalWeight > 0 ? totalScore / totalWeight : 70;
}

function generateStrengthsWeaknesses(
  country: ClaudeAnalysisInput["countries"][0],
  scores: {
    budget: number;
    climate: number;
    safety: number;
    healthcare: number;
    lifestyle: number;
  },
  questionnaire: QuestionnaireFormData,
): { strengths: string[]; weaknesses: string[] } {
  const strengths: string[] = [];
  const weaknesses: string[] = [];

  // Budget
  if (scores.budget >= 80) {
    strengths.push(
      `Coût de la vie très abordable pour votre budget de ${questionnaire.budget.budgetMensuel}€/mois`,
    );
  } else if (scores.budget < 60) {
    weaknesses.push("Coût de la vie élevé par rapport à votre budget");
  }

  // Climat
  if (scores.climate >= 85) {
    strengths.push(
      `Climat idéal correspondant à votre préférence (${questionnaire.climat.temperaturePreferee})`,
    );
  } else if (scores.climate < 65) {
    weaknesses.push(
      "Climat différent de vos préférences habituelles",
    );
  }

  // Sécurité
  if (scores.safety >= 80) {
    strengths.push("Excellent niveau de sécurité et stabilité");
  } else if (scores.safety < 65) {
    weaknesses.push("Niveau de sécurité à considérer");
  }

  // Santé
  if (scores.healthcare >= 75) {
    strengths.push("Système de santé de qualité");
  } else if (scores.healthcare < 60) {
    weaknesses.push("Système de santé à améliorer");
  }

  // Points forts génériques
  if (country.data.internetSpeed && country.data.internetSpeed > 100) {
    strengths.push("Excellente connexion internet");
  }

  if (country.data.transportIndex && country.data.transportIndex > 70) {
    strengths.push("Réseau de transport bien développé");
  }

  // Assurer au moins 2-3 points de chaque
  if (strengths.length === 0) {
    strengths.push("Destination populaire auprès des expatriés");
    strengths.push("Riche patrimoine culturel");
  }

  if (weaknesses.length === 0) {
    weaknesses.push("Adaptation culturelle nécessaire");
  }

  return {
    strengths: strengths.slice(0, 5),
    weaknesses: weaknesses.slice(0, 3),
  };
}

function generateSummary(
  country: ClaudeAnalysisInput["countries"][0],
  questionnaire: QuestionnaireFormData,
  overallScore: number,
  budgetScore: number,
  climateScore: number,
): string {
  const matchLevel =
    overallScore >= 80
      ? "excellente"
      : overallScore >= 70
        ? "très bonne"
        : overallScore >= 60
          ? "bonne"
          : "correcte";

  const budgetPart =
    budgetScore >= 80
      ? "très abordable"
      : budgetScore >= 65
        ? "adapté"
        : "à considérer attentivement";

  const climatePart =
    climateScore >= 80
      ? "un climat idéal"
      : climateScore >= 65
        ? "un climat agréable"
        : "un climat différent de vos habitudes";

  return `${country.name} représente une ${matchLevel} option pour votre profil de ${questionnaire.profil.profession}. Avec un coût de la vie ${budgetPart} pour votre budget et ${climatePart}, ce pays offre un bon équilibre selon vos priorités.`;
}

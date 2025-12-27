import Anthropic from "@anthropic-ai/sdk";
import type {
  ClaudeAnalysisInput,
  CountryRecommendation,
  RecommendationsResponse,
} from "@/types/recommendations";
import type { QuestionnaireFormData } from "./validations/questionnaire";
import { generateMockRecommendations } from "./mock-recommendations";

// Vérifier si on utilise le mode mock (pas d'API key ou API key par défaut)
const USE_MOCK_MODE =
  !process.env.ANTHROPIC_API_KEY ||
  process.env.ANTHROPIC_API_KEY === "your-anthropic-api-key" ||
  process.env.USE_MOCK_RECOMMENDATIONS === "true";

const anthropic = USE_MOCK_MODE
  ? null
  : new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY || "",
    });

/**
 * Crée le prompt pour Claude avec le questionnaire et les données pays
 */
function createAnalysisPrompt(input: ClaudeAnalysisInput): string {
  const { questionnaire, countries } = input;

  return `Tu es un expert en expatriation pour les Français. Analyse le profil de l'utilisateur et recommande les meilleurs pays pour lui.

## PROFIL UTILISATEUR

**Informations personnelles :**
- Âge : ${questionnaire.profil.age} ans
- Situation familiale : ${questionnaire.profil.situation}
- Profession : ${questionnaire.profil.profession}
- Niveau d'études : ${questionnaire.profil.niveauEtudes}

**Budget :**
- Budget mensuel : ${questionnaire.budget.budgetMensuel}€
- Épargne disponible : ${questionnaire.budget.epargne}€
- Source de revenus : ${questionnaire.budget.revenus}

**Préférences climatiques :**
- Température préférée : ${questionnaire.climat.temperaturePreferee}
- Saison préférée : ${questionnaire.climat.saisonPreferee}
- Précipitations : ${questionnaire.climat.precipitations}

**Priorités (1-5) :**
- Coût de la vie : ${questionnaire.priorites.coutVie}/5
- Sécurité : ${questionnaire.priorites.securite}/5
- Système de santé : ${questionnaire.priorites.sante}/5
- Éducation : ${questionnaire.priorites.education}/5
- Opportunités d'emploi : ${questionnaire.priorites.emploi}/5
- Vie culturelle : ${questionnaire.priorites.culture}/5
- Environnement : ${questionnaire.priorites.environnement}/5
- Qualité internet : ${questionnaire.priorites.internet}/5

## DONNÉES PAYS DISPONIBLES

${countries
  .map(
    (country) => `
**${country.name} ${country.flag}**
- Indice coût de vie : ${country.data.costOfLivingIndex || "N/A"}
- Loyer moyen : ${country.data.averageRent || "N/A"}
- Température moyenne : ${country.data.averageTemp || "N/A"}°C
- Climat : ${country.data.climate || "N/A"}
- Indice sécurité : ${country.data.safetyIndex || "N/A"}/100
- Indice santé : ${country.data.healthcareIndex || "N/A"}/100
- Indice pollution : ${country.data.pollutionIndex || "N/A"}/100
- Indice transport : ${country.data.transportIndex || "N/A"}/100
`,
  )
  .join("\n")}

## INSTRUCTIONS

Analyse CHAQUE pays et calcule des scores basés sur les priorités de l'utilisateur.

Pour chaque pays, fournis :
1. **overallScore** (0-100) : Score global de compatibilité
2. **matchPercentage** (0-100) : Pourcentage de correspondance avec le profil
3. **strengths** : 3-5 points forts spécifiques pour cet utilisateur
4. **weaknesses** : 2-3 points faibles ou défis
5. **summary** : Résumé personnalisé de 2-3 phrases
6. **scores** : Scores détaillés (0-100) pour :
   - budget : Adapté au budget de l'utilisateur
   - climate : Correspondance avec préférences climatiques
   - safety : Niveau de sécurité
   - healthcare : Qualité du système de santé
   - lifestyle : Qualité de vie globale

**Calcul des scores :**
- Pondère selon les priorités de l'utilisateur (1-5)
- Budget : compare costOfLivingIndex avec budgetMensuel
- Climate : compare averageTemp avec temperaturePreferee
- Safety : utilise safetyIndex
- Healthcare : utilise healthcareIndex
- Lifestyle : combine culture, environnement, transport

Retourne UNIQUEMENT un JSON valide (sans markdown) avec cette structure :

{
  "recommendations": [
    {
      "countryId": "id",
      "countryName": "nom",
      "countryCode": "code",
      "flag": "emoji",
      "overallScore": 85,
      "matchPercentage": 87,
      "strengths": ["point 1", "point 2", "point 3"],
      "weaknesses": ["défi 1", "défi 2"],
      "summary": "Résumé personnalisé...",
      "scores": {
        "budget": 90,
        "climate": 85,
        "safety": 80,
        "healthcare": 75,
        "lifestyle": 88
      },
      "data": {
        "costOfLivingIndex": 52.8,
        "averageRent": 25.3,
        "averageTemp": 17.5,
        "climate": "Mediterranean",
        "safetyIndex": 72.1,
        "healthcareIndex": 70.5,
        "pollutionIndex": 45.2
      }
    }
  ]
}

Classe les recommandations par overallScore décroissant. Retourne TOUS les pays analysés.`;
}

/**
 * Analyse le profil utilisateur et génère des recommandations personnalisées
 */
export async function analyzeUserProfile(
  questionnaire: QuestionnaireFormData,
  countries: ClaudeAnalysisInput["countries"],
): Promise<CountryRecommendation[]> {
  // Mode mock : utiliser les recommandations générées localement
  if (USE_MOCK_MODE) {
    console.log(
      "🎭 Mode MOCK activé - Utilisation des recommandations simulées",
    );
    // Simuler un délai d'API pour plus de réalisme
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return generateMockRecommendations(questionnaire, countries);
  }

  // Mode API : utiliser Claude
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error(
      "ANTHROPIC_API_KEY is not defined in environment variables",
    );
  }

  const prompt = createAnalysisPrompt({ questionnaire, countries });

  try {
    const message = await anthropic!.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      temperature: 0.7,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // Extraire le contenu texte de la réponse
    const content = message.content[0];
    if (content.type !== "text") {
      throw new Error("Expected text response from Claude");
    }

    const responseText = content.text;

    // Parser la réponse JSON
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Failed to parse Claude response:", responseText);
      throw new Error("Invalid JSON response from Claude");
    }

    if (
      !parsedResponse.recommendations ||
      !Array.isArray(parsedResponse.recommendations)
    ) {
      throw new Error("Invalid response format from Claude");
    }

    return parsedResponse.recommendations;
  } catch (error) {
    console.error("Error calling Claude API:", error);
    throw error;
  }
}

/**
 * Génère une analyse complète avec métadonnées
 */
export async function generateRecommendations(
  questionnaire: QuestionnaireFormData,
  countries: ClaudeAnalysisInput["countries"],
): Promise<RecommendationsResponse> {
  const recommendations = await analyzeUserProfile(questionnaire, countries);

  // Analyser les priorités de l'utilisateur
  const priorities = [
    { name: "Coût de la vie", score: questionnaire.priorites.coutVie },
    { name: "Sécurité", score: questionnaire.priorites.securite },
    { name: "Système de santé", score: questionnaire.priorites.sante },
    { name: "Éducation", score: questionnaire.priorites.education },
    { name: "Opportunités d'emploi", score: questionnaire.priorites.emploi },
    { name: "Vie culturelle", score: questionnaire.priorites.culture },
    { name: "Environnement", score: questionnaire.priorites.environnement },
    { name: "Qualité internet", score: questionnaire.priorites.internet },
  ];

  const topPriorities = priorities
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  // Déterminer la catégorie de budget
  let budgetCategory: "economique" | "moyen" | "eleve";
  if (questionnaire.budget.budgetMensuel < 1500) {
    budgetCategory = "economique";
  } else if (questionnaire.budget.budgetMensuel < 3000) {
    budgetCategory = "moyen";
  } else {
    budgetCategory = "eleve";
  }

  // Créer une description du climat préféré
  const climateMapping = {
    froid: "climat froid",
    tempere: "climat tempéré",
    chaud: "climat chaud",
    tropical: "climat tropical",
  };
  const climatePreference =
    climateMapping[questionnaire.climat.temperaturePreferee];

  return {
    recommendations,
    userProfile: {
      questionnaire,
      analyzedAt: new Date().toISOString(),
    },
    analysis: {
      topPriorities,
      budgetCategory,
      climatePreference,
    },
  };
}

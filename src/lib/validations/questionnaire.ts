import { z } from "zod";

// Step 1: Profil
export const profilSchema = z.object({
  age: z.coerce
    .number()
    .min(18, "Vous devez avoir au moins 18 ans")
    .max(100, "Age invalide"),
  situation: z.enum(["celibataire", "couple", "famille"], {
    message: "Veuillez sélectionner votre situation familiale",
  }),
  profession: z.string().min(2, "Veuillez indiquer votre profession"),
  niveauEtudes: z.enum(["bac", "bac+2", "bac+3", "bac+5", "doctorat"], {
    message: "Veuillez sélectionner votre niveau d'études",
  }),
});

// Step 2: Budget
export const budgetSchema = z.object({
  budgetMensuel: z.coerce
    .number()
    .min(500, "Le budget mensuel doit être au moins de 500€")
    .max(50000, "Budget mensuel trop élevé"),
  epargne: z.coerce
    .number()
    .min(0, "L'épargne ne peut pas être négative")
    .max(1000000, "Montant d'épargne trop élevé"),
  revenus: z.enum(
    ["salarie", "freelance", "entrepreneur", "retraite", "rentier"],
    {
      message: "Veuillez sélectionner votre source de revenus",
    },
  ),
});

// Step 3: Climat
export const climatSchema = z.object({
  temperaturePreferee: z.enum(["froid", "tempere", "chaud", "tropical"], {
    message: "Veuillez sélectionner votre température préférée",
  }),
  saisonPreferee: z.enum(["printemps", "ete", "automne", "hiver"], {
    message: "Veuillez sélectionner votre saison préférée",
  }),
  precipitations: z.enum(["peu", "moyen", "beaucoup"], {
    message:
      "Veuillez indiquer votre préférence pour les précipitations",
  }),
});

// Step 4: Priorités
export const prioritesSchema = z.object({
  coutVie: z.coerce.number().min(1, "Minimum 1").max(5, "Maximum 5"),
  securite: z.coerce.number().min(1, "Minimum 1").max(5, "Maximum 5"),
  sante: z.coerce.number().min(1, "Minimum 1").max(5, "Maximum 5"),
  education: z.coerce.number().min(1, "Minimum 1").max(5, "Maximum 5"),
  emploi: z.coerce.number().min(1, "Minimum 1").max(5, "Maximum 5"),
  culture: z.coerce.number().min(1, "Minimum 1").max(5, "Maximum 5"),
  environnement: z.coerce.number().min(1, "Minimum 1").max(5, "Maximum 5"),
  internet: z.coerce.number().min(1, "Minimum 1").max(5, "Maximum 5"),
});

// Complete questionnaire schema
export const questionnaireSchema = z.object({
  profil: profilSchema,
  budget: budgetSchema,
  climat: climatSchema,
  priorites: prioritesSchema,
});

// TypeScript types
export type ProfilFormData = z.infer<typeof profilSchema>;
export type BudgetFormData = z.infer<typeof budgetSchema>;
export type ClimatFormData = z.infer<typeof climatSchema>;
export type PrioritesFormData = z.infer<typeof prioritesSchema>;
export type QuestionnaireFormData = z.infer<typeof questionnaireSchema>;

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/components/ui";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ProfilStep } from "@/components/questionnaire/ProfilStep";
import { BudgetStep } from "@/components/questionnaire/BudgetStep";
import { ClimatStep } from "@/components/questionnaire/ClimatStep";
import { PrioritesStep } from "@/components/questionnaire/PrioritesStep";
import {
  questionnaireSchema,
  profilSchema,
  budgetSchema,
  climatSchema,
  prioritesSchema,
  type QuestionnaireFormData,
} from "@/lib/validations/questionnaire";

const steps = [
  {
    title: "Profil",
    description: "Informations personnelles",
    component: ProfilStep,
    schema: profilSchema,
    field: "profil" as const,
  },
  {
    title: "Budget",
    description: "Vos moyens financiers",
    component: BudgetStep,
    schema: budgetSchema,
    field: "budget" as const,
  },
  {
    title: "Climat",
    description: "Préférences météo",
    component: ClimatStep,
    schema: climatSchema,
    field: "climat" as const,
  },
  {
    title: "Priorités",
    description: "Ce qui compte pour vous",
    component: PrioritesStep,
    schema: prioritesSchema,
    field: "priorites" as const,
  },
];

export default function QuestionnairePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const methods = useForm<QuestionnaireFormData>({
    resolver: zodResolver(questionnaireSchema) as any,
    mode: "onChange",
    defaultValues: {
      profil: {
        age: "" as any,
        situation: "" as any,
        profession: "",
        niveauEtudes: "" as any,
      },
      budget: {
        budgetMensuel: "" as any,
        epargne: "" as any,
        revenus: "" as any,
      },
      climat: {
        temperaturePreferee: "" as any,
        saisonPreferee: "" as any,
        precipitations: "" as any,
      },
      priorites: {
        coutVie: 3,
        securite: 3,
        sante: 3,
        education: 3,
        emploi: 3,
        culture: 3,
        environnement: 3,
        internet: 3,
      },
    },
  });

  const { trigger, handleSubmit } = methods;
  const StepComponent = steps[currentStep].component;

  // Debug: tracker les changements d'étape et réinitialiser canSubmit
  useEffect(() => {
    console.log(`📍 currentStep a changé: ${currentStep} (${steps[currentStep]?.title || 'inconnu'})`);
    // Réinitialiser le flag de soumission à chaque changement d'étape
    setCanSubmit(false);
  }, [currentStep]);

  // Debug: tracker toute tentative de navigation
  useEffect(() => {
    const originalPush = router.push;
    router.push = function(...args) {
      console.log(`🚨 router.push appelé avec:`, args);
      console.trace('Call stack:');
      return originalPush.apply(this, args);
    };

    return () => {
      router.push = originalPush;
    };
  }, [router]);

  const handleNext = async () => {
    console.log(`🔹 handleNext appelé - Étape actuelle: ${currentStep} (${steps[currentStep].title})`);
    const field = steps[currentStep].field;
    const isValid = await trigger(field);

    console.log(`🔹 Validation: ${isValid ? '✅ Valide' : '❌ Invalide'}`);

    if (isValid) {
      if (currentStep < steps.length - 1) {
        console.log(`🔹 Passage à l'étape ${currentStep + 1} (${steps[currentStep + 1].title})`);
        setCurrentStep(currentStep + 1);
      } else {
        console.log(`🔹 Dernière étape atteinte - ne devrait pas arriver ici`);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: QuestionnaireFormData) => {
    console.log(`🎯 onSubmit appelé - currentStep: ${currentStep}, canSubmit: ${canSubmit}`);

    // Empêcher la soumission si on n'a pas explicitement cliqué sur le bouton
    if (!canSubmit) {
      console.warn(`⚠️ Tentative de soumission automatique - BLOQUÉE (canSubmit = false)`);
      return;
    }

    // Empêcher la soumission si on n'est pas à la dernière étape
    if (currentStep < steps.length - 1) {
      console.warn(`⚠️ Tentative de soumission avant la dernière étape - bloquée (étape ${currentStep}/${steps.length - 1})`);
      setCanSubmit(false);
      return;
    }

    console.log(`✅ Soumission autorisée - dernière étape atteinte et canSubmit = true`);

    if (!session?.user) {
      console.log(`❌ Pas de session - redirection vers signin`);
      router.push("/auth/signin?callbackUrl=/questionnaire");
      return;
    }

    setIsSubmitting(true);

    try {
      console.log(`📤 Envoi du questionnaire...`);
      const response = await fetch("/api/questionnaire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit questionnaire");
      }

      console.log(`✅ Questionnaire envoyé - redirection vers dashboard`);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error submitting questionnaire:", error);
      alert("Une erreur est survenue lors de l'envoi du questionnaire");
    } finally {
      setIsSubmitting(false);
      setCanSubmit(false); // Réinitialiser après la soumission
    }
  };

  return (
    <div className="min-h-screen bg-ocean-50">
      <header className="border-b border-ocean-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <Link
            href="/home"
            className="flex items-center gap-2 text-gray-900 hover:text-brand-500 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Retour
          </Link>
          <h1 className="text-lg font-semibold text-gray-900">
            Questionnaire
          </h1>
          <div className="w-20" />
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-12">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={`flex flex-1 items-center ${index < steps.length - 1 ? "flex-1" : ""}`}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                      index <= currentStep
                        ? "border-brand-500 bg-brand-500 text-white"
                        : "border-ocean-200 bg-white text-gray-500"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span
                    className={`mt-2 hidden text-xs sm:block ${
                      index <= currentStep
                        ? "font-medium text-brand-500"
                        : "text-gray-600"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`mx-2 h-0.5 flex-1 ${
                      index < currentStep
                        ? "bg-brand-500"
                        : "bg-ocean-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={(e) => {
              // Empêcher la soumission du formulaire avec la touche Enter
              if (e.key === "Enter" && e.target instanceof HTMLInputElement) {
                e.preventDefault();
              }
            }}
          >
            <div className="rounded-xl bg-white p-8 shadow-md border border-ocean-200">
              <StepComponent />

              <div className="mt-12 flex items-center justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Précédent
                </Button>

                {currentStep < steps.length - 1 ? (
                  <Button type="button" onClick={handleNext}>
                    Suivant
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    onClick={() => {
                      console.log("🔘 Bouton 'Voir les résultats' cliqué - activation de canSubmit");
                      setCanSubmit(true);
                    }}
                  >
                    {isSubmitting ? "Envoi..." : "Voir les résultats"}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

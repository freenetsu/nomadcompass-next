"use client";

import { useState } from "react";
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
  const router = useRouter();
  const { data: session } = useSession();

  const methods = useForm<QuestionnaireFormData>({
    resolver: zodResolver(questionnaireSchema),
    mode: "onChange",
    defaultValues: {
      profil: {
        age: undefined,
        situation: undefined,
        profession: "",
        niveauEtudes: undefined,
      },
      budget: {
        budgetMensuel: undefined,
        epargne: undefined,
        revenus: undefined,
      },
      climat: {
        temperaturePreferee: undefined,
        saisonPreferee: undefined,
        precipitations: undefined,
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

  const handleNext = async () => {
    const field = steps[currentStep].field;
    const isValid = await trigger(field);

    if (isValid) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: QuestionnaireFormData) => {
    if (!session?.user) {
      router.push("/auth/signin?callbackUrl=/questionnaire");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/questionnaire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit questionnaire");
      }

      router.push("/dashboard");
    } catch (error) {
      console.error("Error submitting questionnaire:", error);
      alert("Une erreur est survenue lors de l'envoi du questionnaire");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
            Retour
          </Link>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
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
                        : "border-gray-300 bg-white text-gray-500 dark:border-gray-600 dark:bg-gray-800"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span
                    className={`mt-2 hidden text-xs sm:block ${
                      index <= currentStep
                        ? "font-medium text-brand-500"
                        : "text-gray-500 dark:text-gray-400"
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
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="rounded-2xl bg-white p-8 shadow-theme-sm dark:bg-gray-800">
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
                  <Button type="submit" isLoading={isSubmitting}>
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

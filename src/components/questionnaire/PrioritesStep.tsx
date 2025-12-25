"use client";

import { useFormContext } from "react-hook-form";
import { Label } from "@/components/form/Label";
import type { QuestionnaireFormData } from "@/lib/validations/questionnaire";

const priorityLabels = {
  coutVie: "Coût de la vie",
  securite: "Sécurité",
  sante: "Système de santé",
  education: "Éducation",
  emploi: "Opportunités d'emploi",
  culture: "Vie culturelle",
  environnement: "Environnement",
  internet: "Qualité internet",
};

export function PrioritesStep() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<QuestionnaireFormData>();

  const priorities = Object.keys(priorityLabels) as Array<
    keyof typeof priorityLabels
  >;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Vos priorités
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Notez de 1 (peu important) à 5 (très important) les critères suivants.
        </p>
      </div>

      <div className="space-y-6">
        {priorities.map((key) => {
          const value = watch(`priorites.${key}`) || 3;
          const error = errors.priorites?.[key];

          return (
            <div key={key}>
              <div className="flex items-center justify-between">
                <Label htmlFor={key}>{priorityLabels[key]}</Label>
                <span className="text-lg font-semibold text-brand-500">
                  {value}
                </span>
              </div>
              <input
                id={key}
                type="range"
                min="1"
                max="5"
                step="1"
                {...register(`priorites.${key}`)}
                className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
                style={{
                  background: `linear-gradient(to right, rgb(70 95 255) 0%, rgb(70 95 255) ${((Number(value) - 1) / 4) * 100}%, rgb(229 231 235) ${((Number(value) - 1) / 4) * 100}%, rgb(229 231 235) 100%)`,
                }}
              />
              <div className="mt-1 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Peu important</span>
                <span>Très important</span>
              </div>
              {error && (
                <p className="mt-1 text-xs text-error-500">{error.message}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

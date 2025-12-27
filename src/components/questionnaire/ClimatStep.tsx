"use client";

import { useFormContext } from "react-hook-form";
import { Select } from "@/components/form/Select";
import { Label } from "@/components/form/Label";
import type { QuestionnaireFormData } from "@/lib/validations/questionnaire";

export function ClimatStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<QuestionnaireFormData>();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Climat préféré
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Le climat est un facteur important pour votre bien-être au quotidien.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="temperaturePreferee">Température préférée</Label>
          <Select
            id="temperaturePreferee"
            {...register("climat.temperaturePreferee")}
            error={!!errors.climat?.temperaturePreferee}
            options={[
              { value: "froid", label: "Froid (< 15°C)" },
              { value: "tempere", label: "Tempéré (15-25°C)" },
              { value: "chaud", label: "Chaud (25-30°C)" },
              { value: "tropical", label: "Tropical (> 30°C)" },
            ]}
            placeholder="Sélectionnez votre température idéale"
          />
        </div>

        <div>
          <Label htmlFor="saisonPreferee">Saison préférée</Label>
          <Select
            id="saisonPreferee"
            {...register("climat.saisonPreferee")}
            error={!!errors.climat?.saisonPreferee}
            options={[
              { value: "printemps", label: "Printemps" },
              { value: "ete", label: "Été" },
              { value: "automne", label: "Automne" },
              { value: "hiver", label: "Hiver" },
            ]}
            placeholder="Sélectionnez votre saison favorite"
          />
        </div>

        <div>
          <Label htmlFor="precipitations">Précipitations</Label>
          <Select
            id="precipitations"
            {...register("climat.precipitations")}
            error={!!errors.climat?.precipitations}
            options={[
              { value: "peu", label: "Peu de pluie" },
              { value: "moyen", label: "Pluie modérée" },
              { value: "beaucoup", label: "Beaucoup de pluie" },
            ]}
            placeholder="Sélectionnez votre préférence"
          />
        </div>
      </div>
    </div>
  );
}

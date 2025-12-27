"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/form/Input";
import { Select } from "@/components/form/Select";
import { Label } from "@/components/form/Label";
import type { QuestionnaireFormData } from "@/lib/validations/questionnaire";

export function BudgetStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<QuestionnaireFormData>();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Votre budget
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Donnez-nous une idée de vos moyens financiers pour trouver les
          destinations adaptées.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="budgetMensuel">Budget mensuel (€)</Label>
          <Input
            id="budgetMensuel"
            type="number"
            placeholder="2000"
            {...register("budget.budgetMensuel")}
            error={!!errors.budget?.budgetMensuel}
            hint={
              errors.budget?.budgetMensuel?.message ||
              "Budget mensuel disponible pour vivre"
            }
          />
        </div>

        <div>
          <Label htmlFor="epargne">Épargne disponible (€)</Label>
          <Input
            id="epargne"
            type="number"
            placeholder="10000"
            {...register("budget.epargne")}
            error={!!errors.budget?.epargne}
            hint={
              errors.budget?.epargne?.message ||
              "Pour l'installation et les premiers mois"
            }
          />
        </div>

        <div>
          <Label htmlFor="revenus">Source de revenus</Label>
          <Select
            id="revenus"
            {...register("budget.revenus")}
            error={!!errors.budget?.revenus}
            options={[
              { value: "salarie", label: "Salarié" },
              { value: "freelance", label: "Freelance / Indépendant" },
              { value: "entrepreneur", label: "Entrepreneur" },
              { value: "retraite", label: "Retraité" },
              { value: "rentier", label: "Rentier" },
            ]}
            placeholder="Sélectionnez votre source de revenus"
          />
        </div>
      </div>
    </div>
  );
}

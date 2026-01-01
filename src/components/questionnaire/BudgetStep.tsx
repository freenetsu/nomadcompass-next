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
        <h2 className="text-2xl font-bold text-gray-900">
          Votre budget
        </h2>
        <p className="mt-2 text-sm text-gray-700">
          Donnez-nous une idée de vos moyens financiers pour trouver les
          destinations adaptées.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="budgetMensuel" required>Budget mensuel (€)</Label>
          <Input
            id="budgetMensuel"
            type="number"
            placeholder="2000"
            {...register("budget.budgetMensuel", { valueAsNumber: true })}
            error={!!errors.budget?.budgetMensuel}
          />
          {errors.budget?.budgetMensuel ? (
            <p className="mt-1.5 text-xs text-error-600">
              {errors.budget.budgetMensuel.message}
            </p>
          ) : (
            <p className="mt-1.5 text-xs text-gray-600">
              Budget mensuel disponible pour vivre
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="epargne" required>Épargne disponible (€)</Label>
          <Input
            id="epargne"
            type="number"
            placeholder="10000"
            {...register("budget.epargne", { valueAsNumber: true })}
            error={!!errors.budget?.epargne}
          />
          {errors.budget?.epargne ? (
            <p className="mt-1.5 text-xs text-error-600">
              {errors.budget.epargne.message}
            </p>
          ) : (
            <p className="mt-1.5 text-xs text-gray-600">
              Pour l&apos;installation et les premiers mois
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="revenus" required>Source de revenus</Label>
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
          {errors.budget?.revenus && (
            <p className="mt-1.5 text-xs text-error-600">
              {errors.budget.revenus.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

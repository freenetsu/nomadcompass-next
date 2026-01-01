"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/form/Input";
import { Select } from "@/components/form/Select";
import { Label } from "@/components/form/Label";
import type { QuestionnaireFormData } from "@/lib/validations/questionnaire";

export function ProfilStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<QuestionnaireFormData>();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Votre profil
        </h2>
        <p className="mt-2 text-sm text-gray-700">
          Aidez-nous à mieux vous connaître pour personnaliser nos
          recommandations.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="age" required>Âge</Label>
          <Input
            id="age"
            type="number"
            placeholder="Votre âge"
            {...register("profil.age", { valueAsNumber: true })}
            error={!!errors.profil?.age}
          />
          {errors.profil?.age && (
            <p className="mt-1.5 text-xs text-error-600">
              {errors.profil.age.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="situation" required>Situation familiale</Label>
          <Select
            id="situation"
            {...register("profil.situation")}
            error={!!errors.profil?.situation}
            options={[
              { value: "celibataire", label: "Célibataire" },
              { value: "couple", label: "En couple" },
              { value: "famille", label: "Famille avec enfants" },
            ]}
            placeholder="Sélectionnez votre situation"
          />
          {errors.profil?.situation && (
            <p className="mt-1.5 text-xs text-error-600">
              {errors.profil.situation.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="profession" required>Profession</Label>
          <Input
            id="profession"
            type="text"
            placeholder="Ex: Développeur, Designer, Médecin..."
            {...register("profil.profession")}
            error={!!errors.profil?.profession}
          />
          {errors.profil?.profession && (
            <p className="mt-1.5 text-xs text-error-600">
              {errors.profil.profession.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="niveauEtudes" required>Niveau d&apos;études</Label>
          <Select
            id="niveauEtudes"
            {...register("profil.niveauEtudes")}
            error={!!errors.profil?.niveauEtudes}
            options={[
              { value: "bac", label: "Baccalauréat" },
              { value: "bac+2", label: "Bac +2 (BTS, DUT)" },
              { value: "bac+3", label: "Bac +3 (Licence)" },
              { value: "bac+5", label: "Bac +5 (Master)" },
              { value: "doctorat", label: "Doctorat" },
            ]}
            placeholder="Sélectionnez votre niveau"
          />
          {errors.profil?.niveauEtudes && (
            <p className="mt-1.5 text-xs text-error-600">
              {errors.profil.niveauEtudes.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

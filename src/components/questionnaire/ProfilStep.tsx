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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Votre profil
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Aidez-nous à mieux vous connaître pour personnaliser nos
          recommandations.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="age">Âge</Label>
          <Input
            id="age"
            type="number"
            placeholder="Votre âge"
            {...register("profil.age")}
            error={!!errors.profil?.age}
          />
        </div>

        <div>
          <Label htmlFor="situation">Situation familiale</Label>
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
        </div>

        <div>
          <Label htmlFor="profession">Profession</Label>
          <Input
            id="profession"
            type="text"
            placeholder="Ex: Développeur, Designer, Médecin..."
            {...register("profil.profession")}
            error={!!errors.profil?.profession}
          />
        </div>

        <div>
          <Label htmlFor="niveauEtudes">Niveau d&apos;études</Label>
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
        </div>
      </div>
    </div>
  );
}

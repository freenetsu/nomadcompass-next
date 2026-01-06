import { z } from "zod";

export const profileSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne peut pas dépasser 50 caractères")
    .optional()
    .nullable()
    .or(z.literal("")),

  location: z
    .string()
    .min(2, "La localisation doit contenir au moins 2 caractères")
    .max(100, "La localisation ne peut pas dépasser 100 caractères")
    .optional()
    .nullable()
    .or(z.literal("")),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

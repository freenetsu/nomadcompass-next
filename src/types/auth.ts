import type { DefaultSession } from "next-auth";

/**
 * Rôles utilisateur possibles dans l'application
 */
export type UserRole = "user" | "admin";

/**
 * Extension des types NextAuth pour ajouter les champs personnalisés
 */
declare module "next-auth" {
  /**
   * Interface Session étendue avec les données utilisateur type-safe
   */
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: UserRole;
      email: string;
      name?: string | null;
      image?: string | null;
    };
  }

  /**
   * Interface User étendue pour inclure le rôle
   */
  interface User {
    id: string;
    role: string;
    email: string;
    name?: string | null;
    image?: string | null;
  }
}

/**
 * Extension du module JWT pour typer les tokens
 */
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
  }
}

import { auth } from "@/lib/auth";
import type { Session } from "next-auth";
import type { UserRole } from "@/types/auth";

/**
 * Vérifie si l'utilisateur est un administrateur
 * @param session - La session utilisateur
 * @returns true si l'utilisateur est admin, false sinon
 */
export function isAdmin(session: Session | null): boolean {
  return session?.user?.role === "admin";
}

/**
 * Vérifie si l'utilisateur a un rôle spécifique
 * @param session - La session utilisateur
 * @param role - Le rôle à vérifier
 * @returns true si l'utilisateur a le rôle, false sinon
 */
export function hasRole(session: Session | null, role: UserRole): boolean {
  return session?.user?.role === role;
}

/**
 * Récupère la session courante (serveur uniquement)
 * @returns La session ou null si non authentifié
 */
export async function getAuthSession() {
  return await auth();
}

/**
 * Vérifie que l'utilisateur est authentifié
 * @throws Error si non authentifié
 * @returns La session utilisateur
 */
export async function requireAuth() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Non authentifié");
  }
  return session;
}

/**
 * Vérifie que l'utilisateur est authentifié et est admin
 * @throws Error si non authentifié ou pas admin
 * @returns La session utilisateur
 */
export async function requireAdmin() {
  const session = await requireAuth();
  if (session.user.role !== "admin") {
    throw new Error("Accès refusé - Admin requis");
  }
  return session;
}

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import type { UserRole } from "@/types/auth";

// Validation des variables d'environnement au démarrage
if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error("❌ GOOGLE_CLIENT_ID is required");
}
if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("❌ GOOGLE_CLIENT_SECRET is required");
}
if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("❌ NEXTAUTH_SECRET is required");
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),

  // Configuration JWT sessions (compatible avec Edge Runtime middleware)
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 jours
  },

  secret: process.env.NEXTAUTH_SECRET,

  // Debug uniquement en développement
  debug: process.env.NODE_ENV === "development",

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: false,
    }),
  ],

  callbacks: {
    // JWT callback : Ajoute les données custom au token
    async jwt({ token, user }) {
      // Lors de la première connexion (user est présent)
      if (user) {
        token.id = user.id;
        token.role = (user.role as UserRole) || "user";
      }
      return token;
    },

    // Session callback : Transfert les données du token vers la session
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = (token.role as UserRole) || "user";
      }
      return session;
    },

    // SignIn callback : validation lors de la connexion
    async signIn({ user, account, profile }) {
      console.log("🔐 [SIGNIN CALLBACK] Début de la connexion");
      console.log("👤 User:", { id: user.id, email: user.email, name: user.name });
      console.log("🔑 Account:", { provider: account?.provider, type: account?.type });
      console.log("📋 Profile:", profile ? "✅ Présent" : "❌ Absent");

      // On peut ajouter des vérifications ici (ex: email domain, status utilisateur)
      if (!user.email) {
        console.log("❌ [SIGNIN CALLBACK] ÉCHEC: Pas d'email");
        return false;
      }

      console.log("✅ [SIGNIN CALLBACK] Connexion autorisée");
      return true;
    },
  },

  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },

  events: {
    async signIn({ user }) {
      if (process.env.NODE_ENV === "development") {
        console.log(`✅ Connexion: ${user.email}`);
      }
    },
    async signOut() {
      if (process.env.NODE_ENV === "development") {
        console.log(`🚪 Déconnexion`);
      }
    },
  },
});

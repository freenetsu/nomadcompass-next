import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { authConfig } from "@/lib/auth.config";
import type { UserRole } from "@/types/auth";
import type { Adapter } from "next-auth/adapters";

/**
 * Main Auth.js configuration with Prisma adapter and JWT sessions
 *
 * This file exports:
 * - auth(): Get session in Server Components
 * - handlers (GET, POST): API route handlers
 * - signIn(): Programmatic sign in
 * - signOut(): Programmatic sign out
 */
export const {
  auth,
  handlers,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,

  // PrismaAdapter for database sessions (type cast to bypass role field incompatibility)
  adapter: PrismaAdapter(prisma) as Adapter,

  // Database session strategy - more reliable for OAuth on Vercel
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  callbacks: {
    /**
     * Session callback - controls what data is exposed to the client
     * With database sessions, we get the user from the database
     */
    async session({ session, user }) {
      console.log("📋 [SESSION] Callback triggered for:", user?.email);
      if (session.user && user) {
        session.user.id = user.id;
        session.user.email = user.email!;
        session.user.role = ((user as any).role as UserRole) || "user";
      }
      return session;
    },

    /**
     * SignIn callback - control who can sign in
     * Return true to allow, false to deny
     * Note: PrismaAdapter handles user/account creation automatically
     */
    async signIn({ user, account }) {
      console.log("🔐 [SIGNIN] Callback triggered");
      console.log("  - User:", user.email);
      console.log("  - Provider:", account?.provider);

      // Require email for all sign-ins
      if (!user.email) {
        console.error("  ❌ No email provided, denying sign-in");
        return false;
      }

      console.log("  ✅ Sign-in authorized for:", user.email);
      return true;
    },

    /**
     * Redirect callback - control post-login redirect
     */
    async redirect({ url, baseUrl }) {
      console.log("🔀 [REDIRECT] Called");
      console.log("  - url:", url);
      console.log("  - baseUrl:", baseUrl);

      // Allows relative callback URLs
      if (url.startsWith("/")) {
        const redirectUrl = `${baseUrl}${url}`;
        console.log("  ✅ Redirecting to:", redirectUrl);
        return redirectUrl;
      }

      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) {
        console.log("  ✅ Same origin, redirecting to:", url);
        return url;
      }

      // Default to home page
      const defaultUrl = `${baseUrl}/home`;
      console.log("  ✅ Default redirect to:", defaultUrl);
      return defaultUrl;
    },
  },

  events: {},

  // Enable debug in development OR if AUTH_DEBUG is set
  debug: process.env.NODE_ENV === "development" || process.env.AUTH_DEBUG === "true",
});

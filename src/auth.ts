import NextAuth from "next-auth";
import { prisma } from "@/lib/prisma";
import { authConfig } from "@/lib/auth.config";
import type { UserRole } from "@/types/auth";

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
  // Note: PrismaAdapter commented out due to type incompatibility
  // Users are created/updated in the signIn callback below
  // adapter: PrismaAdapter(prisma),

  // JWT session strategy (required for Edge runtime compatibility)
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  callbacks: {
    /**
     * JWT callback - called when creating or updating a JWT
     * This runs on every request when using JWT sessions
     */
    async jwt({ token, user, account }) {
      // Initial sign in - user object is available
      if (user) {
        console.log("🔑 [JWT] Creating token for user:", user.email);
        token.id = user.id;
        token.email = user.email;
        token.role = (user as any).role || "user";
      }

      // OAuth tokens from provider
      if (account?.access_token) {
        console.log("🔑 [JWT] Saving OAuth tokens");
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }

      return token;
    },

    /**
     * Session callback - controls what data is exposed to the client
     * This runs on every getSession() or useSession() call
     */
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.role = (token.role as UserRole) || "user";
      }

      return session;
    },

    /**
     * SignIn callback - control who can sign in
     * Return true to allow, false to deny
     * IMPORTANT: Also creates/updates user in database to avoid foreign key errors
     */
    async signIn({ user, account, profile }) {
      console.log("🔐 [SIGNIN] Callback triggered");
      console.log("  - User:", user.email);
      console.log("  - Provider:", account?.provider);

      // Require email for all sign-ins
      if (!user.email) {
        console.error("  ❌ No email provided, denying sign-in");
        return false;
      }

      try {
        console.log("  📝 Attempting to save user to database...");
        // Ensure user exists in database (upsert)
        // This prevents foreign key constraint errors when saving questionnaire responses
        const dbUser = await prisma.user.upsert({
          where: { email: user.email },
          update: {
            name: user.name,
            image: user.image,
          },
          create: {
            id: user.id || undefined,
            email: user.email,
            name: user.name,
            image: user.image,
            role: "user",
          },
        });

        // Update the user.id to match the database ID
        user.id = dbUser.id;

        console.log("  ✅ User saved successfully:", dbUser.id);
        return true;
      } catch (error) {
        console.error("  ❌ Error saving user to database:", error);
        // Still allow sign-in even if database save fails
        return true;
      }
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

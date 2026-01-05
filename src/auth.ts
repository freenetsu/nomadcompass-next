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
console.log("🔧 [AUTH INIT] Initializing Auth.js configuration...");
console.log("🔧 [AUTH INIT] Environment variables check:");
console.log("  - AUTH_SECRET:", process.env.AUTH_SECRET ? "✅ SET" : "❌ MISSING");
console.log("  - AUTH_GITHUB_ID:", process.env.AUTH_GITHUB_ID ? `✅ ${process.env.AUTH_GITHUB_ID}` : "❌ MISSING");
console.log("  - AUTH_GITHUB_SECRET:", process.env.AUTH_GITHUB_SECRET ? `✅ ${process.env.AUTH_GITHUB_SECRET.substring(0, 10)}...` : "❌ MISSING");
console.log("  - AUTH_URL:", process.env.AUTH_URL || "Not set (will use default)");
console.log("  - DATABASE_URL:", process.env.DATABASE_URL ? "✅ SET" : "❌ MISSING");

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
    async jwt({ token, user, account, profile, trigger }) {
      console.log("\n🔐 [JWT CALLBACK] Called");
      console.log("  - Trigger:", trigger || "signIn");
      console.log("  - User present:", !!user);
      console.log("  - Account present:", !!account);
      console.log("  - Profile present:", !!profile);

      // Initial sign in - user object is available
      if (user) {
        console.log("  ✅ Initial sign-in detected");
        console.log("  - User ID:", user.id);
        console.log("  - User email:", user.email);
        console.log("  - User role:", (user as any).role || "user");

        token.id = user.id;
        token.email = user.email;
        token.role = (user as any).role || "user";
      }

      // OAuth tokens from provider
      if (account?.access_token) {
        console.log("  ✅ OAuth tokens received");
        console.log("  - Provider:", account.provider);
        console.log("  - Access token present:", !!account.access_token);
        console.log("  - Refresh token present:", !!account.refresh_token);

        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }

      console.log("  ✅ JWT callback completed");
      return token;
    },

    /**
     * Session callback - controls what data is exposed to the client
     * This runs on every getSession() or useSession() call
     */
    async session({ session, token, user }) {
      console.log("\n🔒 [SESSION CALLBACK] Called");
      console.log("  - Session user present:", !!session.user);
      console.log("  - Token ID:", token.id || "N/A");
      console.log("  - Token email:", token.email || "N/A");

      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.role = (token.role as UserRole) || "user";

        console.log("  ✅ Session data set:");
        console.log("    - ID:", session.user.id);
        console.log("    - Email:", session.user.email);
        console.log("    - Role:", session.user.role);
      }

      console.log("  ✅ Session callback completed");
      return session;
    },

    /**
     * SignIn callback - control who can sign in
     * Return true to allow, false to deny
     * IMPORTANT: Also creates/updates user in database to avoid foreign key errors
     */
    async signIn({ user, account, profile }) {
      console.log("\n🚪 [SIGNIN CALLBACK] Called");
      console.log("  - User email:", user.email || "N/A");
      console.log("  - Provider:", account?.provider || "N/A");
      console.log("  - Profile present:", !!profile);

      // Require email for all sign-ins
      if (!user.email) {
        console.log("  ❌ SIGNIN REJECTED: No email provided");
        return false;
      }

      try {
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

        console.log("  ✅ User saved to database with ID:", dbUser.id);
        console.log("  ✅ SIGNIN ALLOWED for:", user.email);
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
      console.log("\n🔄 [REDIRECT CALLBACK] Called");
      console.log("  - URL:", url);
      console.log("  - Base URL:", baseUrl);

      let redirectUrl = "";

      // Allows relative callback URLs
      if (url.startsWith("/")) {
        redirectUrl = `${baseUrl}${url}`;
        console.log("  ✅ Relative URL detected, redirecting to:", redirectUrl);
        return redirectUrl;
      }

      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) {
        redirectUrl = url;
        console.log("  ✅ Same origin detected, redirecting to:", redirectUrl);
        return redirectUrl;
      }

      // Default to home page
      redirectUrl = `${baseUrl}/home`;
      console.log("  ✅ Default redirect to:", redirectUrl);
      return redirectUrl;
    },
  },

  events: {
    async signIn(message) {
      console.log("\n🎉 [EVENT] Sign-in successful!");
      console.log("  - User:", message.user.email);
      console.log("  - Account provider:", message.account?.provider);
      console.log("  - Is new user:", message.isNewUser);
    },

    async signOut(message) {
      console.log("\n👋 [EVENT] Sign-out");
    },
  },

  // Enable debug in development
  debug: process.env.NODE_ENV === "development",
});

console.log("✅ [AUTH INIT] Auth.js configuration completed");

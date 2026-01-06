import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { prisma } from "@/lib/prisma";
import type { UserRole } from "@/types/auth";

/**
 * NextAuth.js v5 - Configuration Simplifiée
 *
 * Configuration optimisée pour Vercel avec:
 * - trustHost: true (requis pour Vercel)
 * - JWT strategy (plus fiable que database sessions)
 * - Gestion manuelle des users en DB
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  // CRITICAL: Trust the Vercel proxy
  trustHost: true,

  // Providers configuration
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],

  // Custom pages
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },

  // JWT session strategy - more reliable on Vercel
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    /**
     * SignIn callback - save user to database
     */
    async signIn({ user, account }) {
      if (!user.email) {
        return false;
      }

      try {
        // Upsert user in database
        await prisma.user.upsert({
          where: { email: user.email },
          update: {
            name: user.name,
            image: user.image,
          },
          create: {
            email: user.email,
            name: user.name,
            image: user.image,
            role: "user",
          },
        });

        return true;
      } catch (error) {
        console.error("Error saving user:", error);
        // Allow sign-in even if DB save fails
        return true;
      }
    },

    /**
     * JWT callback - add user data to token
     */
    async jwt({ token, user, trigger }) {
      if (user?.email) {
        // Initial sign in - fetch user from DB
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
          select: { id: true, role: true },
        });

        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role;
        }
      }

      return token;
    },

    /**
     * Session callback - expose user data to client
     */
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = (token.role as UserRole) || "user";
      }

      return session;
    },

    /**
     * Redirect callback - control post-login redirect
     */
    async redirect({ url, baseUrl }) {
      // Allow relative URLs
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }

      // Allow same-origin URLs
      if (new URL(url).origin === baseUrl) {
        return url;
      }

      // Default to /home
      return `${baseUrl}/home`;
    },
  },
});

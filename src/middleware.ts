import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware de protection des routes authentifiées avec logs détaillés
 * Compatible avec database sessions (utilise auth() au lieu de getToken())
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log("\n🛡️  [MIDDLEWARE] Request received");
  console.log("  - Path:", pathname);
  console.log("  - Method:", request.method);

  // Liste des routes protégées
  const protectedRoutes = [
    "/admin",
    "/dashboard",
    "/home",
    "/questionnaire",
    "/favorites",
    "/compare",
    "/countries",
    "/country",
    "/profile"
  ];

  // Vérifier si la route actuelle est protégée
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  console.log("  - Is protected route:", isProtectedRoute);

  if (isProtectedRoute) {
    console.log("  🔒 Protected route detected, checking session...");

    const session = await auth();

    console.log("  - Session found:", !!session);
    console.log("  - User found:", !!session?.user);

    if (session?.user) {
      console.log("  - User ID:", session.user.id);
      console.log("  - User email:", session.user.email);
      console.log("  - User role:", session.user.role);
    }

    // Pas connecté : redirection vers signin
    if (!session?.user) {
      console.log("  ❌ No session, redirecting to sign-in...");
      const url = new URL("/auth/signin", request.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }

    // Connecté mais pas admin (seulement pour /admin)
    if (pathname.startsWith("/admin") && session.user.role !== "admin") {
      console.log("  ❌ User is not admin, redirecting to home...");
      return NextResponse.redirect(new URL("/", request.url));
    }

    console.log("  ✅ Access granted");
  }

  console.log("  ✅ Middleware passed");
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
    "/home/:path*",
    "/questionnaire/:path*",
    "/favorites/:path*",
    "/compare/:path*",
    "/countries/:path*",
    "/country/:path*",
    "/profile/:path*"
  ],
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * Proxy de protection des routes authentifiées (Next.js 16+ convention)
 * Utilise getToken() au lieu de auth() pour réduire la taille du bundle Edge
 *
 * Cette approche légère permet de rester sous la limite de 1MB des Edge Functions
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

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

  if (isProtectedRoute) {
    // Utiliser getToken() au lieu de auth() - beaucoup plus léger
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET
    });

    // Pas connecté : redirection vers signin
    if (!token) {
      const url = new URL("/auth/signin", request.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }

    // Connecté mais pas admin (seulement pour /admin)
    if (pathname.startsWith("/admin") && token.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

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

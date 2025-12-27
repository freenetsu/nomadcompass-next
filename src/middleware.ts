import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware de protection des routes authentifiées
 * Compatible avec database sessions (utilise auth() au lieu de getToken())
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protection des routes authentifiées
  if (pathname.startsWith("/admin") || pathname.startsWith("/dashboard")) {
    const session = await auth();

    // Pas connecté : redirection vers signin
    if (!session?.user) {
      const url = new URL("/auth/signin", request.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }

    // Connecté mais pas admin (seulement pour /admin)
    if (pathname.startsWith("/admin") && session.user.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};

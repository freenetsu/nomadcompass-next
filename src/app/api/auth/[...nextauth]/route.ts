import { handlers } from "@/auth";

/**
 * NextAuth.js API Route Handler
 *
 * Force Node.js runtime (not Edge) for better cookie handling
 * This is critical for Auth.js to properly set session cookies on Vercel
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const { GET, POST } = handlers;

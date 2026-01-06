import { handlers } from "@/auth";

// Force Node.js runtime for reliable cookie handling on Vercel
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const { GET, POST } = handlers;

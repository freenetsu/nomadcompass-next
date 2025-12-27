import { handlers } from "@/lib/auth";

// Debug: Log environment variables in API route
console.log("🔍 [API ROUTE] Auth route loaded");
console.log("🔍 [API ROUTE] GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID ? `${process.env.GOOGLE_CLIENT_ID.substring(0, 20)}...` : "❌ NOT SET");
console.log("🔍 [API ROUTE] GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET ? "✅ SET" : "❌ NOT SET");
console.log("🔍 [API ROUTE] NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET ? "✅ SET" : "❌ NOT SET");
console.log("🔍 [API ROUTE] NEXTAUTH_URL:", process.env.NEXTAUTH_URL);

export const { GET, POST } = handlers;

import { handlers } from "@/auth";
import { NextRequest } from "next/server";

/**
 * NextAuth.js API Route Handler with detailed logging
 *
 * This file exports the GET and POST handlers from Auth.js
 * to handle all authentication requests at /api/auth/*
 */

async function loggedGET(request: NextRequest) {
  const url = new URL(request.url);
  console.log("\n🌐 [API ROUTE] GET request received");
  console.log("  - Path:", url.pathname);
  console.log("  - Search params:", url.searchParams.toString());
  console.log("  - Full URL:", url.toString());

  try {
    const response = await handlers.GET(request);
    console.log("  ✅ GET handler completed successfully");
    console.log("  - Status:", response.status);
    return response;
  } catch (error) {
    console.error("  ❌ GET handler error:", error);
    throw error;
  }
}

async function loggedPOST(request: NextRequest) {
  const url = new URL(request.url);
  console.log("\n🌐 [API ROUTE] POST request received");
  console.log("  - Path:", url.pathname);
  console.log("  - Search params:", url.searchParams.toString());

  try {
    const response = await handlers.POST(request);
    console.log("  ✅ POST handler completed successfully");
    console.log("  - Status:", response.status);
    return response;
  } catch (error) {
    console.error("  ❌ POST handler error:", error);
    throw error;
  }
}

export { loggedGET as GET, loggedPOST as POST };

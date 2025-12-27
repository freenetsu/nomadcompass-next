import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/helpers";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Vérification admin avec helper type-safe
    await requireAdmin();

    const countries = await prisma.country.findMany({
      include: {
        data: {
          select: {
            costOfLivingIndex: true,
            safetyIndex: true,
          },
        },
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(countries);
  } catch (error) {
    console.error("Error fetching countries:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    // Vérification admin avec helper type-safe
    await requireAdmin();

    const body = await request.json();
    const { name, code, flag, continent } = body;

    if (!name || !code || !flag || !continent) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const country = await prisma.country.create({
      data: { name, code, flag, continent },
    });

    return NextResponse.json(country, { status: 201 });
  } catch (error) {
    console.error("Error creating country:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

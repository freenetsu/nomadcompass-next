import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const favorites = await prisma.favorite.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        country: {
          include: {
            data: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(favorites);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { countryId } = await request.json();

    if (!countryId) {
      return NextResponse.json(
        { error: "Country ID is required" },
        { status: 400 },
      );
    }

    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_countryId: {
          userId: session.user.id,
          countryId,
        },
      },
    });

    if (existingFavorite) {
      return NextResponse.json(
        { error: "Country already in favorites" },
        { status: 409 },
      );
    }

    const favorite = await prisma.favorite.create({
      data: {
        userId: session.user.id,
        countryId,
      },
      include: {
        country: true,
      },
    });

    return NextResponse.json(favorite, { status: 201 });
  } catch (error) {
    console.error("Error adding favorite:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Vous devez être connecté pour voir vos favoris" },
        { status: 401 },
      );
    }

    const favorites = await prisma.favorite.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        countries: {
          include: { country_data: true,
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
      { error: "Erreur lors du chargement des favoris" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Vous devez être connecté pour ajouter des favoris" },
        { status: 401 },
      );
    }

    const { countryId } = await request.json();

    if (!countryId) {
      return NextResponse.json(
        { error: "L'identifiant du pays est requis" },
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
        { error: "Ce pays est déjà dans vos favoris" },
        { status: 409 },
      );
    }

    const favorite = await prisma.favorite.create({
      data: {
        userId: session.user.id,
        countryId,
      },
      include: {
        countries: true,
      },
    });

    return NextResponse.json(favorite, { status: 201 });
  } catch (error) {
    console.error("Error adding favorite:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'ajout aux favoris" },
      { status: 500 },
    );
  }
}

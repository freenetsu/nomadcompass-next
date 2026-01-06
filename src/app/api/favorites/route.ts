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

    // Transform data to match frontend interface (countries -> country, country_data -> data)
    const transformedFavorites = favorites.map((fav) => ({
      id: fav.id,
      userId: fav.userId,
      countryId: fav.countryId,
      createdAt: fav.createdAt,
      country: {
        id: fav.countries.id,
        name: fav.countries.name,
        code: fav.countries.code,
        flag: fav.countries.flag,
        continent: fav.countries.continent,
        data: fav.countries.country_data ? {
          costOfLivingIndex: fav.countries.country_data.costOfLivingIndex,
          averageRent: fav.countries.country_data.averageRent,
          safetyIndex: fav.countries.country_data.safetyIndex,
          healthcareIndex: fav.countries.country_data.healthcareIndex,
        } : null,
      },
    }));

    return NextResponse.json(transformedFavorites);
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
        countries: {
          include: { country_data: true },
        },
      },
    });

    // Transform data to match frontend interface
    const transformedFavorite = {
      id: favorite.id,
      userId: favorite.userId,
      countryId: favorite.countryId,
      createdAt: favorite.createdAt,
      country: {
        id: favorite.countries.id,
        name: favorite.countries.name,
        code: favorite.countries.code,
        flag: favorite.countries.flag,
        continent: favorite.countries.continent,
        data: favorite.countries.country_data ? {
          costOfLivingIndex: favorite.countries.country_data.costOfLivingIndex,
          averageRent: favorite.countries.country_data.averageRent,
          safetyIndex: favorite.countries.country_data.safetyIndex,
          healthcareIndex: favorite.countries.country_data.healthcareIndex,
        } : null,
      },
    };

    return NextResponse.json(transformedFavorite, { status: 201 });
  } catch (error) {
    console.error("Error adding favorite:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'ajout aux favoris" },
      { status: 500 },
    );
  }
}

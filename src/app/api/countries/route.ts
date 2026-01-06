import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const countries = await prisma.countries.findMany({
      include: {
        country_data: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    // Transform data to match frontend interface (country_data -> data)
    const transformedCountries = countries.map((country) => ({
      id: country.id,
      name: country.name,
      code: country.code,
      flag: country.flag,
      continent: country.continent,
      data: country.country_data ? {
        costOfLivingIndex: country.country_data.costOfLivingIndex,
        averageRent: country.country_data.averageRent,
        averageSalary: country.country_data.averageSalary,
        averageTemp: country.country_data.averageTemp,
        climate: country.country_data.climate,
        safetyIndex: country.country_data.safetyIndex,
        healthcareIndex: country.country_data.healthcareIndex,
        pollutionIndex: country.country_data.pollutionIndex,
        internetSpeed: country.country_data.internetSpeed,
        transportIndex: country.country_data.transportIndex,
        rainfall: country.country_data.rainfall,
      } : null,
    }));

    return NextResponse.json(transformedCountries);
  } catch (error) {
    console.error("Error fetching countries:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

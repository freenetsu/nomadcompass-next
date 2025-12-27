import { PrismaClient } from "@prisma/client";
import { scrapeNumbeo } from "./scrapers/numbeo";
import { scrapeClimate, getClimateDataFallback } from "./scrapers/climate";
import {
  parseCountryData,
  validateCountryData,
  calculateDataQuality,
} from "./utils/dataParser";

const prisma = new PrismaClient();

// English country names for Numbeo
const countryNamesEN: Record<string, string> = {
  Portugal: "Portugal",
  Espagne: "Spain",
  Thaïlande: "Thailand",
  Mexique: "Mexico",
  Canada: "Canada",
  "Émirats Arabes Unis": "United Arab Emirates",
  Indonésie: "Indonesia",
  Vietnam: "Vietnam",
  Chine: "China",
  Qatar: "Qatar",
  "Arabie Saoudite": "Saudi Arabia",
  Bahreïn: "Bahrain",
  Oman: "Oman",
  Koweït: "Kuwait",
  Singapour: "Singapore",
  Malaisie: "Malaysia",
  Philippines: "Philippines",
  Japon: "Japan",
  "Corée du Sud": "South Korea",
  Grèce: "Greece",
  Italie: "Italy",
};

// Capital cities for each country (used for climate data)
const countryCapitals: Record<string, string> = {
  Portugal: "Lisbon",
  Espagne: "Madrid",
  Thaïlande: "Bangkok",
  Mexique: "Mexico City",
  Canada: "Toronto",
  "Émirats Arabes Unis": "Dubai",
  Indonésie: "Jakarta",
  Vietnam: "Ho Chi Minh City",
  Chine: "Beijing",
  Qatar: "Doha",
  "Arabie Saoudite": "Riyadh",
  Bahreïn: "Manama",
  Oman: "Muscat",
  Koweït: "Kuwait City",
  Singapour: "Singapore",
  Malaisie: "Kuala Lumpur",
  Philippines: "Manila",
  Japon: "Tokyo",
  "Corée du Sud": "Seoul",
  Grèce: "Athens",
  Italie: "Rome",
};

interface ScrapingResult {
  countryId: string;
  countryName: string;
  success: boolean;
  dataQuality?: {
    score: number;
    completeness: number;
    missingFields: string[];
  };
  errors: string[];
}

async function scrapeCountryData(
  countryId: string,
  countryName: string,
): Promise<ScrapingResult> {
  console.log(`\n🌍 Scraping data for ${countryName}...`);

  const result: ScrapingResult = {
    countryId,
    countryName,
    success: false,
    errors: [],
  };

  try {
    const capitalCity = countryCapitals[countryName] || countryName;
    const countryNameEN = countryNamesEN[countryName] || countryName;

    // Scrape Numbeo data
    console.log(`  📊 Fetching Numbeo data...`);
    const numbeoData = await scrapeNumbeo(countryNameEN, capitalCity);

    if (!numbeoData) {
      console.log(`  ⚠️  No Numbeo data found`);
    } else {
      console.log(`  ✅ Numbeo data retrieved`);
    }

    // Small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Scrape climate data
    console.log(`  🌡️  Fetching climate data...`);
    let climateData = await scrapeClimate(countryNameEN, capitalCity);

    if (!climateData) {
      console.log(`  ⚠️  No climate data scraped, using fallback...`);
      climateData = getClimateDataFallback(countryNameEN, capitalCity);
    } else {
      console.log(`  ✅ Climate data retrieved`);
    }

    // Parse and merge data
    const parsedData = parseCountryData(numbeoData, climateData);

    // Validate data
    const validation = validateCountryData(parsedData);
    if (!validation.isValid) {
      console.log(`  ❌ Data validation failed:`);
      validation.errors.forEach((error) => console.log(`     - ${error}`));
      result.errors = validation.errors;
      return result;
    }

    // Calculate data quality
    const quality = calculateDataQuality(parsedData);
    console.log(
      `  📈 Data quality: ${quality.score}/100 (${quality.completeness}% complete)`,
    );
    if (quality.missingFields.length > 0) {
      console.log(`  📝 Missing fields: ${quality.missingFields.join(", ")}`);
    }

    // Save to database
    console.log(`  💾 Saving to database...`);
    await prisma.countryData.upsert({
      where: { countryId },
      create: {
        countryId,
        ...parsedData,
      },
      update: {
        ...parsedData,
        updatedAt: new Date(),
      },
    });

    console.log(`  ✅ Successfully saved data for ${countryName}`);
    result.success = true;
    result.dataQuality = quality;

    // Delay between countries to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 2000));
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.log(`  ❌ Error scraping ${countryName}: ${errorMessage}`);
    result.errors.push(errorMessage);
  }

  return result;
}

async function main() {
  console.log("🚀 Starting country data scraping...\n");
  console.log("=".repeat(60));

  try {
    // Fetch all countries from database
    const countries = await prisma.country.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    if (countries.length === 0) {
      console.log(
        "⚠️  No countries found in database. Please run the seed script first:",
      );
      console.log("   npm run prisma:seed");
      return;
    }

    console.log(`📋 Found ${countries.length} countries to process\n`);
    console.log("=".repeat(60));

    const results: ScrapingResult[] = [];

    // Process each country sequentially
    for (const country of countries) {
      const result = await scrapeCountryData(country.id, country.name);
      results.push(result);
    }

    // Print summary
    console.log("\n" + "=".repeat(60));
    console.log("📊 SCRAPING SUMMARY");
    console.log("=".repeat(60));

    const successful = results.filter((r) => r.success);
    const failed = results.filter((r) => !r.success);

    console.log(`\n✅ Successful: ${successful.length}/${results.length}`);
    console.log(`❌ Failed: ${failed.length}/${results.length}`);

    if (successful.length > 0) {
      console.log("\n🎯 Data Quality Breakdown:");
      successful.forEach((r) => {
        if (r.dataQuality) {
          console.log(
            `   ${r.countryName}: ${r.dataQuality.score}/100 (${r.dataQuality.completeness}% complete)`,
          );
        }
      });
    }

    if (failed.length > 0) {
      console.log("\n❌ Failed Countries:");
      failed.forEach((r) => {
        console.log(`   ${r.countryName}:`);
        r.errors.forEach((error) => console.log(`      - ${error}`));
      });
    }

    const avgQuality =
      successful.length > 0
        ? Math.round(
            successful.reduce(
              (sum, r) => sum + (r.dataQuality?.score || 0),
              0,
            ) / successful.length,
          )
        : 0;

    console.log(`\n📈 Average data quality: ${avgQuality}/100`);
    console.log("\n" + "=".repeat(60));
    console.log("✨ Scraping completed!");
  } catch (error) {
    console.error("\n❌ Fatal error:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

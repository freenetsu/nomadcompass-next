import { chromium } from "playwright";

export interface ClimateData {
  country: string;
  city?: string;
  averageTemp: number; // Average yearly temperature in Celsius
  climate: string; // Climate type description
  rainfall: number; // Average annual rainfall in mm
}

/**
 * Scrape climate data for a city/country
 * Using climate-data.org as source
 */
export async function scrapeClimate(
  countryName: string,
  cityName: string,
): Promise<ClimateData | null> {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Search for the city on climate-data.org
    const searchUrl = `https://en.climate-data.org/search/?q=${encodeURIComponent(cityName)}`;

    console.log(`Scraping climate data: ${searchUrl}`);

    await page.goto(searchUrl, { waitUntil: "networkidle" });

    // Click on the first search result
    const firstResult = page.locator(".search-results a").first();
    const resultExists = (await firstResult.count()) > 0;

    if (!resultExists) {
      console.log(`No climate data found for ${cityName}`);
      return null;
    }

    await firstResult.click();
    await page.waitForLoadState("networkidle");

    // Extract climate data
    const data: Partial<ClimateData> = {
      country: countryName,
      city: cityName,
    };

    // Get average temperature
    const tempText = await page
      .locator("text=/Average temperature.*°C/i")
      .first()
      .textContent();
    const tempMatch = tempText?.match(/([\d.]+)°C/);
    data.averageTemp = tempMatch ? parseFloat(tempMatch[1]) : 0;

    // Get climate type from description
    const climateDesc = await page
      .locator(".climate-text, .description")
      .first()
      .textContent();
    data.climate = climateDesc?.trim().substring(0, 100) || "Unknown";

    // Get annual rainfall
    const rainfallText = await page
      .locator("text=/precipitation.*mm/i")
      .first()
      .textContent();
    const rainfallMatch = rainfallText?.match(/([\d.]+)\s*mm/);
    data.rainfall = rainfallMatch ? parseFloat(rainfallMatch[1]) : 0;

    console.log(`Successfully scraped climate data for ${cityName}`);
    return data as ClimateData;
  } catch (error) {
    console.error(`Error scraping climate for ${cityName}:`, error);
    return null;
  } finally {
    await browser.close();
  }
}

/**
 * Simple climate data based on known information
 * Fallback when scraping fails
 */
export function getClimateDataFallback(
  countryName: string,
  capitalCity: string,
): ClimateData {
  // Hardcoded climate data for common expat destinations
  const knownClimates: Record<string, ClimateData> = {
    Portugal: {
      country: "Portugal",
      city: "Lisbon",
      averageTemp: 17.5,
      climate: "Mediterranean",
      rainfall: 774,
    },
    Spain: {
      country: "Spain",
      city: "Madrid",
      averageTemp: 14.5,
      climate: "Hot-summer Mediterranean",
      rainfall: 436,
    },
    Thailand: {
      country: "Thailand",
      city: "Bangkok",
      averageTemp: 28.5,
      climate: "Tropical savanna",
      rainfall: 1498,
    },
    Mexico: {
      country: "Mexico",
      city: "Mexico City",
      averageTemp: 16.5,
      climate: "Subtropical highland",
      rainfall: 820,
    },
    Canada: {
      country: "Canada",
      city: "Toronto",
      averageTemp: 9.0,
      climate: "Humid continental",
      rainfall: 831,
    },
    "United Arab Emirates": {
      country: "United Arab Emirates",
      city: "Dubai",
      averageTemp: 27.0,
      climate: "Hot desert",
      rainfall: 78,
    },
    Indonesia: {
      country: "Indonesia",
      city: "Bali",
      averageTemp: 27.0,
      climate: "Tropical monsoon",
      rainfall: 1735,
    },
    Vietnam: {
      country: "Vietnam",
      city: "Ho Chi Minh City",
      averageTemp: 27.5,
      climate: "Tropical savanna",
      rainfall: 1931,
    },
  };

  return (
    knownClimates[countryName] || {
      country: countryName,
      city: capitalCity,
      averageTemp: 20,
      climate: "Temperate",
      rainfall: 800,
    }
  );
}

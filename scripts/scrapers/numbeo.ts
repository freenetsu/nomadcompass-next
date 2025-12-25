import { chromium } from "playwright";

export interface NumbeoData {
  country: string;
  city?: string;
  costOfLivingIndex: number;
  rentIndex: number;
  groceriesIndex: number;
  restaurantPriceIndex: number;
  localPurchasingPowerIndex: number;
  safetyIndex: number;
  healthcareIndex: number;
  pollutionIndex: number;
  trafficIndex: number;
  climateIndex: number;
}

/**
 * Scrape cost of living data from Numbeo for a specific country/city
 */
export async function scrapeNumbeo(
  countryName: string,
  cityName?: string,
): Promise<NumbeoData | null> {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Construct Numbeo URL
    const searchTerm = cityName ? `${cityName}, ${countryName}` : countryName;
    const url = `https://www.numbeo.com/cost-of-living/in/${encodeURIComponent(searchTerm)}`;

    console.log(`Scraping Numbeo: ${url}`);

    // Navigate to the page
    await page.goto(url, { waitUntil: "networkidle" });

    // Check if page exists
    const notFound = await page.locator('text="City Not Found"').count();
    if (notFound > 0) {
      console.log(`City/Country not found on Numbeo: ${searchTerm}`);
      return null;
    }

    // Extract indices from the summary table
    const data: Partial<NumbeoData> = {
      country: countryName,
      city: cityName,
    };

    // Cost of Living Index
    const costOfLivingText = await page
      .locator('tr:has-text("Cost of Living Index") td.priceValue')
      .first()
      .textContent();
    data.costOfLivingIndex = parseFloat(costOfLivingText?.trim() || "0");

    // Rent Index
    const rentText = await page
      .locator('tr:has-text("Rent Index") td.priceValue')
      .first()
      .textContent();
    data.rentIndex = parseFloat(rentText?.trim() || "0");

    // Groceries Index
    const groceriesText = await page
      .locator('tr:has-text("Groceries Index") td.priceValue')
      .first()
      .textContent();
    data.groceriesIndex = parseFloat(groceriesText?.trim() || "0");

    // Restaurant Price Index
    const restaurantText = await page
      .locator('tr:has-text("Restaurant Price Index") td.priceValue')
      .first()
      .textContent();
    data.restaurantPriceIndex = parseFloat(restaurantText?.trim() || "0");

    // Local Purchasing Power Index
    const purchasingPowerText = await page
      .locator('tr:has-text("Local Purchasing Power Index") td.priceValue')
      .first()
      .textContent();
    data.localPurchasingPowerIndex = parseFloat(
      purchasingPowerText?.trim() || "0",
    );

    // Navigate to quality of life page
    const qolUrl = `https://www.numbeo.com/quality-of-life/in/${encodeURIComponent(searchTerm)}`;
    await page.goto(qolUrl, { waitUntil: "networkidle" });

    // Safety Index
    const safetyText = await page
      .locator('tr:has-text("Safety Index") td')
      .last()
      .textContent();
    data.safetyIndex = parseFloat(safetyText?.trim() || "0");

    // Health Care Index
    const healthcareText = await page
      .locator('tr:has-text("Health Care Index") td')
      .last()
      .textContent();
    data.healthcareIndex = parseFloat(healthcareText?.trim() || "0");

    // Pollution Index
    const pollutionText = await page
      .locator('tr:has-text("Pollution Index") td')
      .last()
      .textContent();
    data.pollutionIndex = parseFloat(pollutionText?.trim() || "0");

    // Traffic Index
    const trafficText = await page
      .locator('tr:has-text("Traffic Index") td')
      .last()
      .textContent();
    data.trafficIndex = parseFloat(trafficText?.trim() || "0");

    // Climate Index
    const climateText = await page
      .locator('tr:has-text("Climate Index") td')
      .last()
      .textContent();
    data.climateIndex = parseFloat(climateText?.trim() || "0");

    console.log(`Successfully scraped data for ${searchTerm}`);
    return data as NumbeoData;
  } catch (error) {
    console.error(`Error scraping Numbeo for ${countryName}:`, error);
    return null;
  } finally {
    await browser.close();
  }
}

/**
 * Batch scrape multiple countries
 */
export async function scrapeNumbeoCountries(
  countries: Array<{ name: string; city?: string }>,
): Promise<NumbeoData[]> {
  const results: NumbeoData[] = [];

  for (const country of countries) {
    const data = await scrapeNumbeo(country.name, country.city);
    if (data) {
      results.push(data);
    }
    // Add delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  return results;
}

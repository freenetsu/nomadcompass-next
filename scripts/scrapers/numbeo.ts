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
 * Scrape cost of living data from Numbeo for a specific country
 */
export async function scrapeNumbeo(
  countryName: string,
  cityName?: string,
): Promise<NumbeoData | null> {
  const browser = await chromium.launch({
    headless: true,
    args: ['--disable-blink-features=AutomationControlled']
  });
  const page = await browser.newPage();

  await page.setExtraHTTPHeaders({
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
  });

  try {
    console.log(`Scraping Numbeo for: ${countryName}`);

    // Navigate to the rankings page
    const url = 'https://www.numbeo.com/cost-of-living/rankings_by_country.jsp';
    await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });

    // Find the row for this country
    const countryRow = page.locator(`tr:has-text("${countryName}")`).first();
    const rowExists = (await countryRow.count()) > 0;

    if (!rowExists) {
      console.log(`Country not found in rankings: ${countryName}`);
      return null;
    }

    const data: Partial<NumbeoData> = {
      country: countryName,
      city: cityName,
    };

    // Extract all the cells from the country row
    const cells = await countryRow.locator('td').allTextContents();

    // Table structure: Rank, Country, Cost of Living Index, Rent Index, Cost of Living Plus Rent Index,
    // Groceries Index, Restaurant Price Index, Local Purchasing Power Index
    if (cells.length >= 7) {
      data.costOfLivingIndex = parseFloat(cells[2]?.trim() || "0");
      data.rentIndex = parseFloat(cells[3]?.trim() || "0");
      data.groceriesIndex = parseFloat(cells[5]?.trim() || "0");
      data.restaurantPriceIndex = parseFloat(cells[6]?.trim() || "0");
      data.localPurchasingPowerIndex = parseFloat(cells[7]?.trim() || "0");
    }

    // Navigate to quality of life rankings page
    const qolUrl = 'https://www.numbeo.com/quality-of-life/rankings_by_country.jsp';
    await page.goto(qolUrl, { waitUntil: "networkidle", timeout: 60000 });

    // Find the row for this country
    const qolRow = page.locator(`tr:has-text("${countryName}")`).first();
    const qolRowExists = (await qolRow.count()) > 0;

    if (qolRowExists) {
      const qolCells = await qolRow.locator('td').allTextContents();

      // Table structure: Rank, Country, Quality of Life Index, Purchasing Power Index, Safety Index,
      // Health Care Index, Cost of Living Index, Property Price to Income Ratio, Traffic Commute Time Index,
      // Pollution Index, Climate Index
      if (qolCells.length >= 10) {
        data.safetyIndex = parseFloat(qolCells[4]?.trim() || "0");
        data.healthcareIndex = parseFloat(qolCells[5]?.trim() || "0");
        data.pollutionIndex = parseFloat(qolCells[9]?.trim() || "0");
        data.trafficIndex = parseFloat(qolCells[8]?.trim() || "0");
        data.climateIndex = parseFloat(qolCells[10]?.trim() || "0");
      }
    }

    console.log(`Successfully scraped data for ${countryName}`);
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

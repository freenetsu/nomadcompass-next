import type { NumbeoData } from "../scrapers/numbeo";
import type { ClimateData } from "../scrapers/climate";

export interface ParsedCountryData {
  costOfLivingIndex: number | null;
  averageRent: number | null;
  averageSalary: number | null;
  averageTemp: number | null;
  climate: string | null;
  safetyIndex: number | null;
  healthcareIndex: number | null;
  pollutionIndex: number | null;
  internetSpeed: number | null;
  transportIndex: number | null;
  visaRequirements: string | null;
  taxRate: number | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rawData: any;
}

/**
 * Merge Numbeo and Climate data into a single CountryData object
 */
export function parseCountryData(
  numbeoData: NumbeoData | null,
  climateData: ClimateData | null,
): ParsedCountryData {
  return {
    // Cost of living data from Numbeo
    costOfLivingIndex: numbeoData?.costOfLivingIndex ?? null,
    averageRent: numbeoData?.rentIndex ?? null,
    averageSalary: numbeoData?.localPurchasingPowerIndex ?? null,

    // Climate data
    averageTemp: climateData?.averageTemp ?? null,
    climate: climateData?.climate ?? null,

    // Quality of life indices from Numbeo
    safetyIndex: numbeoData?.safetyIndex ?? null,
    healthcareIndex: numbeoData?.healthcareIndex ?? null,
    pollutionIndex: numbeoData?.pollutionIndex ?? null,
    transportIndex: numbeoData?.trafficIndex ?? null,

    // Fields to be filled manually or from other sources later
    internetSpeed: null, // TODO: Add internet speed scraper
    visaRequirements: null, // TODO: Add visa requirements scraper
    taxRate: null, // TODO: Add tax rate scraper

    // Store raw data for debugging and future reference
    rawData: JSON.parse(
      JSON.stringify({
        ...(numbeoData && { numbeo: numbeoData }),
        ...(climateData && { climate: climateData }),
        scrapedAt: new Date().toISOString(),
      }),
    ),
  };
}

/**
 * Validate that parsed data has minimum required fields
 */
export function validateCountryData(data: ParsedCountryData): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Check if we have at least some data
  if (
    !data.costOfLivingIndex &&
    !data.averageTemp &&
    !data.safetyIndex &&
    !data.healthcareIndex
  ) {
    errors.push(
      "No valid data: missing all critical fields (cost of living, temperature, safety, healthcare)",
    );
  }

  // Validate ranges for numeric fields
  if (data.costOfLivingIndex && data.costOfLivingIndex < 0) {
    errors.push("Cost of living index cannot be negative");
  }

  if (data.safetyIndex && (data.safetyIndex < 0 || data.safetyIndex > 100)) {
    errors.push("Safety index must be between 0 and 100");
  }

  if (
    data.healthcareIndex &&
    (data.healthcareIndex < 0 || data.healthcareIndex > 100)
  ) {
    errors.push("Healthcare index must be between 0 and 100");
  }

  if (
    data.pollutionIndex &&
    (data.pollutionIndex < 0 || data.pollutionIndex > 100)
  ) {
    errors.push("Pollution index must be between 0 and 100");
  }

  if (data.averageTemp && (data.averageTemp < -50 || data.averageTemp > 50)) {
    errors.push("Average temperature must be between -50°C and 50°C");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Calculate a quality score for the data based on how many fields are populated
 */
export function calculateDataQuality(data: ParsedCountryData): {
  score: number; // 0-100
  completeness: number; // 0-100 percentage
  missingFields: string[];
} {
  const criticalFields = [
    { key: "costOfLivingIndex", label: "Cost of living" },
    { key: "averageTemp", label: "Average temperature" },
    { key: "climate", label: "Climate type" },
    { key: "safetyIndex", label: "Safety index" },
    { key: "healthcareIndex", label: "Healthcare index" },
  ];

  const optionalFields = [
    { key: "averageRent", label: "Average rent" },
    { key: "averageSalary", label: "Average salary" },
    { key: "pollutionIndex", label: "Pollution index" },
    { key: "transportIndex", label: "Transport index" },
    { key: "internetSpeed", label: "Internet speed" },
    { key: "visaRequirements", label: "Visa requirements" },
    { key: "taxRate", label: "Tax rate" },
  ];

  const allFields = [...criticalFields, ...optionalFields];

  let filledCount = 0;
  let criticalFilledCount = 0;
  const missingFields: string[] = [];

  // Check critical fields
  criticalFields.forEach(({ key, label }) => {
    const value = data[key as keyof ParsedCountryData];
    if (value !== null && value !== undefined) {
      filledCount++;
      criticalFilledCount++;
    } else {
      missingFields.push(label);
    }
  });

  // Check optional fields
  optionalFields.forEach(({ key }) => {
    const value = data[key as keyof ParsedCountryData];
    if (value !== null && value !== undefined) {
      filledCount++;
    }
  });

  const completeness = Math.round((filledCount / allFields.length) * 100);

  // Score calculation: critical fields weigh more
  // Critical fields: 70% of score, Optional fields: 30% of score
  const criticalScore = (criticalFilledCount / criticalFields.length) * 70;
  const optionalScore =
    ((filledCount - criticalFilledCount) / optionalFields.length) * 30;
  const score = Math.round(criticalScore + optionalScore);

  return {
    score,
    completeness,
    missingFields,
  };
}

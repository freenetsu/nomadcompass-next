import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Créer les pays
  const portugal = await prisma.country.upsert({
    where: { code: "PT" },
    update: {},
    create: {
      name: "Portugal",
      code: "PT",
      flag: "🇵🇹",
      continent: "Europe",
      data: {
        create: {
          costOfLivingIndex: 65.5,
          averageRent: 800,
          averageSalary: 1200,
          averageTemp: 17.5,
          climate: "Méditerranéen",
          safetyIndex: 85.2,
          healthcareIndex: 78.4,
          pollutionIndex: 32.1,
          internetSpeed: 120.5,
          transportIndex: 72.3,
          visaRequirements:
            "Les citoyens français peuvent vivre au Portugal sans visa grâce à l'UE. Visa D7 disponible pour les retraités et travailleurs indépendants.",
          taxRate: 28.5,
        },
      },
    },
  });

  const spain = await prisma.country.upsert({
    where: { code: "ES" },
    update: {},
    create: {
      name: "Espagne",
      code: "ES",
      flag: "🇪🇸",
      continent: "Europe",
      data: {
        create: {
          costOfLivingIndex: 68.2,
          averageRent: 900,
          averageSalary: 1400,
          averageTemp: 18.2,
          climate: "Méditerranéen/Continental",
          safetyIndex: 82.5,
          healthcareIndex: 80.1,
          pollutionIndex: 35.4,
          internetSpeed: 150.2,
          transportIndex: 75.8,
          visaRequirements:
            "Libre circulation pour les citoyens français (UE). Visa non lucratif disponible pour les retraités.",
          taxRate: 30.2,
        },
      },
    },
  });

  const thailand = await prisma.country.upsert({
    where: { code: "TH" },
    update: {},
    create: {
      name: "Thaïlande",
      code: "TH",
      flag: "🇹🇭",
      continent: "Asie",
      data: {
        create: {
          costOfLivingIndex: 45.8,
          averageRent: 400,
          averageSalary: 600,
          averageTemp: 28.5,
          climate: "Tropical",
          safetyIndex: 75.3,
          healthcareIndex: 68.7,
          pollutionIndex: 52.3,
          internetSpeed: 95.4,
          transportIndex: 65.2,
          visaRequirements:
            "Exemption de visa 30 jours. Smart Visa, Visa retraité (50+ ans), ou Visa éducation disponibles pour séjours longs.",
          taxRate: 15.5,
        },
      },
    },
  });

  const mexico = await prisma.country.upsert({
    where: { code: "MX" },
    update: {},
    create: {
      name: "Mexique",
      code: "MX",
      flag: "🇲🇽",
      continent: "Amérique du Nord",
      data: {
        create: {
          costOfLivingIndex: 52.3,
          averageRent: 500,
          averageSalary: 700,
          averageTemp: 21.0,
          climate: "Varié (Tropical à Désertique)",
          safetyIndex: 65.8,
          healthcareIndex: 64.2,
          pollutionIndex: 48.7,
          internetSpeed: 85.3,
          transportIndex: 60.5,
          visaRequirements:
            "Exemption visa 180 jours. Visa temporaire (1-4 ans) disponible pour retraités et travailleurs à distance.",
          taxRate: 20.5,
        },
      },
    },
  });

  const canada = await prisma.country.upsert({
    where: { code: "CA" },
    update: {},
    create: {
      name: "Canada",
      code: "CA",
      flag: "🇨🇦",
      continent: "Amérique du Nord",
      data: {
        create: {
          costOfLivingIndex: 78.5,
          averageRent: 1400,
          averageSalary: 3200,
          averageTemp: 5.0,
          climate: "Continental/Arctique",
          safetyIndex: 88.5,
          healthcareIndex: 82.3,
          pollutionIndex: 28.4,
          internetSpeed: 140.8,
          transportIndex: 70.2,
          visaRequirements:
            "ETA obligatoire. Programme Entrée Express pour résidence permanente, PVT pour jeunes (18-35 ans).",
          taxRate: 33.0,
        },
      },
    },
  });

  console.log("✅ Seed completed!");
  console.log({
    portugal,
    spain,
    thailand,
    mexico,
    canada,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

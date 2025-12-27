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

  const china = await prisma.country.upsert({
    where: { code: "CN" },
    update: {},
    create: {
      name: "Chine",
      code: "CN",
      flag: "🇨🇳",
      continent: "Asie",
      data: {
        create: {
          costOfLivingIndex: 55.2,
          averageRent: 650,
          averageSalary: 1200,
          averageTemp: 14.5,
          climate: "Varié (Continental à Tropical)",
          safetyIndex: 80.5,
          healthcareIndex: 70.8,
          pollutionIndex: 68.5,
          internetSpeed: 110.3,
          transportIndex: 82.5,
          visaRequirements:
            "Visa requis. Visa Z pour travail, visa M pour affaires, visa X pour études. Permis de résidence disponible.",
          taxRate: 25.0,
        },
      },
    },
  });

  const indonesia = await prisma.country.upsert({
    where: { code: "ID" },
    update: {},
    create: {
      name: "Indonésie",
      code: "ID",
      flag: "🇮🇩",
      continent: "Asie",
      data: {
        create: {
          costOfLivingIndex: 42.5,
          averageRent: 350,
          averageSalary: 500,
          averageTemp: 26.8,
          climate: "Tropical équatorial",
          safetyIndex: 72.3,
          healthcareIndex: 65.4,
          pollutionIndex: 58.7,
          internetSpeed: 85.2,
          transportIndex: 62.8,
          visaRequirements:
            "Exemption visa 30 jours. Visa on arrival disponible. Visa B211A (60 jours extensible) pour nomades digitaux.",
          taxRate: 17.5,
        },
      },
    },
  });

  const uae = await prisma.country.upsert({
    where: { code: "AE" },
    update: {},
    create: {
      name: "Émirats Arabes Unis",
      code: "AE",
      flag: "🇦🇪",
      continent: "Asie",
      data: {
        create: {
          costOfLivingIndex: 72.8,
          averageRent: 1200,
          averageSalary: 3500,
          averageTemp: 28.2,
          climate: "Désertique",
          safetyIndex: 90.5,
          healthcareIndex: 75.8,
          pollutionIndex: 45.2,
          internetSpeed: 180.5,
          transportIndex: 78.5,
          visaRequirements:
            "Exemption visa 90 jours. Visa de travail sponsorisé par employeur. Golden Visa (5-10 ans) pour investisseurs et talents.",
          taxRate: 0.0,
        },
      },
    },
  });

  const qatar = await prisma.country.upsert({
    where: { code: "QA" },
    update: {},
    create: {
      name: "Qatar",
      code: "QA",
      flag: "🇶🇦",
      continent: "Asie",
      data: {
        create: {
          costOfLivingIndex: 76.5,
          averageRent: 1400,
          averageSalary: 4200,
          averageTemp: 28.5,
          climate: "Désertique",
          safetyIndex: 92.3,
          healthcareIndex: 78.5,
          pollutionIndex: 52.8,
          internetSpeed: 160.2,
          transportIndex: 75.3,
          visaRequirements:
            "Exemption visa 90 jours. Visa de travail sponsorisé obligatoire. Kafala system pour résidence.",
          taxRate: 0.0,
        },
      },
    },
  });

  const saudiArabia = await prisma.country.upsert({
    where: { code: "SA" },
    update: {},
    create: {
      name: "Arabie Saoudite",
      code: "SA",
      flag: "🇸🇦",
      continent: "Asie",
      data: {
        create: {
          costOfLivingIndex: 65.8,
          averageRent: 900,
          averageSalary: 3800,
          averageTemp: 26.5,
          climate: "Désertique",
          safetyIndex: 85.2,
          healthcareIndex: 74.5,
          pollutionIndex: 62.3,
          internetSpeed: 145.8,
          transportIndex: 72.5,
          visaRequirements:
            "Visa touristique eVisa 90 jours. Visa de travail sponsorisé requis. Programme Premium Residency disponible.",
          taxRate: 0.0,
        },
      },
    },
  });

  const bahrain = await prisma.country.upsert({
    where: { code: "BH" },
    update: {},
    create: {
      name: "Bahreïn",
      code: "BH",
      flag: "🇧🇭",
      continent: "Asie",
      data: {
        create: {
          costOfLivingIndex: 68.5,
          averageRent: 750,
          averageSalary: 2800,
          averageTemp: 27.8,
          climate: "Désertique",
          safetyIndex: 86.5,
          healthcareIndex: 72.8,
          pollutionIndex: 58.5,
          internetSpeed: 135.5,
          transportIndex: 70.2,
          visaRequirements:
            "eVisa disponible. Visa de travail sponsorisé. Flexible Visa (1-2 ans) pour entrepreneurs et retraités.",
          taxRate: 0.0,
        },
      },
    },
  });

  const oman = await prisma.country.upsert({
    where: { code: "OM" },
    update: {},
    create: {
      name: "Oman",
      code: "OM",
      flag: "🇴🇲",
      continent: "Asie",
      data: {
        create: {
          costOfLivingIndex: 62.3,
          averageRent: 650,
          averageSalary: 2500,
          averageTemp: 27.2,
          climate: "Désertique",
          safetyIndex: 88.8,
          healthcareIndex: 73.2,
          pollutionIndex: 48.5,
          internetSpeed: 125.8,
          transportIndex: 68.5,
          visaRequirements:
            "eVisa disponible 30 jours. Visa de travail sponsorisé. Programme de résidence pour investisseurs.",
          taxRate: 0.0,
        },
      },
    },
  });

  const kuwait = await prisma.country.upsert({
    where: { code: "KW" },
    update: {},
    create: {
      name: "Koweït",
      code: "KW",
      flag: "🇰🇼",
      continent: "Asie",
      data: {
        create: {
          costOfLivingIndex: 64.8,
          averageRent: 800,
          averageSalary: 3200,
          averageTemp: 26.8,
          climate: "Désertique",
          safetyIndex: 84.5,
          healthcareIndex: 71.5,
          pollutionIndex: 68.2,
          internetSpeed: 130.5,
          transportIndex: 69.8,
          visaRequirements:
            "Visa requis. Visa de travail sponsorisé obligatoire. Kafala system pour résidence.",
          taxRate: 0.0,
        },
      },
    },
  });

  const vietnam = await prisma.country.upsert({
    where: { code: "VN" },
    update: {},
    create: {
      name: "Vietnam",
      code: "VN",
      flag: "🇻🇳",
      continent: "Asie",
      data: {
        create: {
          costOfLivingIndex: 38.5,
          averageRent: 300,
          averageSalary: 450,
          averageTemp: 24.5,
          climate: "Tropical",
          safetyIndex: 78.5,
          healthcareIndex: 62.8,
          pollutionIndex: 65.3,
          internetSpeed: 92.5,
          transportIndex: 58.5,
          visaRequirements:
            "Exemption visa 45 jours. eVisa disponible. Visa affaires et travail disponibles.",
          taxRate: 20.0,
        },
      },
    },
  });

  const singapore = await prisma.country.upsert({
    where: { code: "SG" },
    update: {},
    create: {
      name: "Singapour",
      code: "SG",
      flag: "🇸🇬",
      continent: "Asie",
      data: {
        create: {
          costOfLivingIndex: 85.2,
          averageRent: 2200,
          averageSalary: 4500,
          averageTemp: 27.5,
          climate: "Tropical équatorial",
          safetyIndex: 95.5,
          healthcareIndex: 88.5,
          pollutionIndex: 35.8,
          internetSpeed: 245.5,
          transportIndex: 92.5,
          visaRequirements:
            "Exemption visa 90 jours. Employment Pass pour professionnels qualifiés. EntrePass pour entrepreneurs.",
          taxRate: 17.0,
        },
      },
    },
  });

  const malaysia = await prisma.country.upsert({
    where: { code: "MY" },
    update: {},
    create: {
      name: "Malaisie",
      code: "MY",
      flag: "🇲🇾",
      continent: "Asie",
      data: {
        create: {
          costOfLivingIndex: 44.8,
          averageRent: 420,
          averageSalary: 800,
          averageTemp: 27.0,
          climate: "Tropical équatorial",
          safetyIndex: 76.5,
          healthcareIndex: 72.5,
          pollutionIndex: 52.8,
          internetSpeed: 105.8,
          transportIndex: 68.5,
          visaRequirements:
            "Exemption visa 90 jours. MM2H (Malaysia My Second Home) pour retraités. DE Rantau Nomad Pass pour nomades digitaux.",
          taxRate: 24.0,
        },
      },
    },
  });

  const philippines = await prisma.country.upsert({
    where: { code: "PH" },
    update: {},
    create: {
      name: "Philippines",
      code: "PH",
      flag: "🇵🇭",
      continent: "Asie",
      data: {
        create: {
          costOfLivingIndex: 40.2,
          averageRent: 320,
          averageSalary: 480,
          averageTemp: 27.2,
          climate: "Tropical",
          safetyIndex: 70.5,
          healthcareIndex: 64.2,
          pollutionIndex: 62.5,
          internetSpeed: 75.8,
          transportIndex: 55.8,
          visaRequirements:
            "Exemption visa 30 jours. SRRV (Special Resident Retiree's Visa) pour retraités 35+. Visa travail disponible.",
          taxRate: 25.0,
        },
      },
    },
  });

  const japan = await prisma.country.upsert({
    where: { code: "JP" },
    update: {},
    create: {
      name: "Japon",
      code: "JP",
      flag: "🇯🇵",
      continent: "Asie",
      data: {
        create: {
          costOfLivingIndex: 82.5,
          averageRent: 1100,
          averageSalary: 3200,
          averageTemp: 15.5,
          climate: "Tempéré/Subtropical",
          safetyIndex: 92.8,
          healthcareIndex: 86.5,
          pollutionIndex: 38.5,
          internetSpeed: 195.8,
          transportIndex: 88.5,
          visaRequirements:
            "Exemption visa 90 jours. Visa de travail (diverses catégories). PVT pour jeunes (18-30 ans).",
          taxRate: 30.5,
        },
      },
    },
  });

  const southKorea = await prisma.country.upsert({
    where: { code: "KR" },
    update: {},
    create: {
      name: "Corée du Sud",
      code: "KR",
      flag: "🇰🇷",
      continent: "Asie",
      data: {
        create: {
          costOfLivingIndex: 75.8,
          averageRent: 950,
          averageSalary: 2800,
          averageTemp: 12.5,
          climate: "Continental tempéré",
          safetyIndex: 88.5,
          healthcareIndex: 83.5,
          pollutionIndex: 58.8,
          internetSpeed: 220.5,
          transportIndex: 85.8,
          visaRequirements:
            "Exemption visa 90 jours. Visa E pour travail. Visa D pour résidence longue durée. PVT disponible.",
          taxRate: 27.5,
        },
      },
    },
  });

  const greece = await prisma.country.upsert({
    where: { code: "GR" },
    update: {},
    create: {
      name: "Grèce",
      code: "GR",
      flag: "🇬🇷",
      continent: "Europe",
      data: {
        create: {
          costOfLivingIndex: 62.8,
          averageRent: 650,
          averageSalary: 1100,
          averageTemp: 18.5,
          climate: "Méditerranéen",
          safetyIndex: 79.5,
          healthcareIndex: 72.8,
          pollutionIndex: 42.5,
          internetSpeed: 115.8,
          transportIndex: 68.5,
          visaRequirements:
            "Libre circulation UE. Golden Visa pour investisseurs (250k€). Visa nomade digital disponible.",
          taxRate: 29.0,
        },
      },
    },
  });

  const italy = await prisma.country.upsert({
    where: { code: "IT" },
    update: {},
    create: {
      name: "Italie",
      code: "IT",
      flag: "🇮🇹",
      continent: "Europe",
      data: {
        create: {
          costOfLivingIndex: 71.5,
          averageRent: 850,
          averageSalary: 1600,
          averageTemp: 15.5,
          climate: "Méditerranéen/Continental",
          safetyIndex: 81.5,
          healthcareIndex: 79.8,
          pollutionIndex: 45.8,
          internetSpeed: 125.5,
          transportIndex: 74.5,
          visaRequirements:
            "Libre circulation UE. Visa nomade digital en préparation. Visa élective pour retraités.",
          taxRate: 31.5,
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
    china,
    indonesia,
    uae,
    qatar,
    saudiArabia,
    bahrain,
    oman,
    kuwait,
    vietnam,
    singapore,
    malaysia,
    philippines,
    japan,
    southKorea,
    greece,
    italy,
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

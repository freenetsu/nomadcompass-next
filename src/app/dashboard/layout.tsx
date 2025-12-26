import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Vos Recommandations",
  description:
    "Découvrez vos recommandations personnalisées de pays pour votre expatriation. Analyse IA basée sur votre profil, budget et priorités.",
  openGraph: {
    title: "Dashboard - Vos Recommandations | NomadCompass",
    description:
      "Découvrez vos recommandations personnalisées de pays pour votre expatriation.",
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

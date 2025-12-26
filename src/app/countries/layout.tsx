import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Détails du Pays",
  description:
    "Découvrez toutes les informations détaillées sur ce pays : coût de vie, climat, sécurité, santé et qualité de vie pour votre expatriation.",
  openGraph: {
    title: "Détails du Pays | NomadCompass",
    description:
      "Informations complètes pour votre expatriation : coût de vie, climat, sécurité.",
  },
};

export default function CountriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

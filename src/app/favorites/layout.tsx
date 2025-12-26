import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mes Favoris",
  description:
    "Retrouvez tous vos pays favoris sauvegardés. Comparez facilement les destinations qui vous intéressent pour votre expatriation.",
  openGraph: {
    title: "Mes Favoris | NomadCompass",
    description: "Retrouvez tous vos pays favoris pour votre expatriation.",
  },
};

export default function FavoritesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

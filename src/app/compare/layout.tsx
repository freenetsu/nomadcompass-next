import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comparer les Pays",
  description:
    "Comparez plusieurs pays côte à côte : coût de vie, climat, sécurité, santé. Trouvez la meilleure destination pour votre expatriation.",
  openGraph: {
    title: "Comparer les Pays | NomadCompass",
    description: "Comparez les pays pour trouver votre destination idéale.",
  },
};

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

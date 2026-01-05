import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mon Profil",
  description:
    "Gérez vos informations personnelles et vos préférences de compte.",
  openGraph: {
    title: "Mon Profil | NomadCompass",
    description: "Gérez vos informations personnelles et vos préférences de compte.",
  },
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

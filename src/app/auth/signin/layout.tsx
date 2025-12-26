import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion",
  description:
    "Connectez-vous à votre compte NomadCompass pour accéder à vos recommandations personnalisées et gérer vos favoris.",
  openGraph: {
    title: "Connexion | NomadCompass",
    description: "Accédez à votre espace personnel NomadCompass.",
  },
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

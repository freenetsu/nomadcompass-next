import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Questionnaire d'Expatriation",
  description:
    "Répondez à notre questionnaire personnalisé pour recevoir des recommandations de pays adaptées à votre profil, budget et priorités d'expatriation.",
  openGraph: {
    title: "Questionnaire d'Expatriation | NomadCompass",
    description:
      "Recevez des recommandations personnalisées en répondant à notre questionnaire.",
  },
};

export default function QuestionnaireLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

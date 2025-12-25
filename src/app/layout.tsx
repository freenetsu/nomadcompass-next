import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { PageTransition } from "@/components/providers/PageTransition";

export const metadata: Metadata = {
  title: {
    default: "NomadCompass - Votre guide d'expatriation",
    template: "%s | NomadCompass",
  },
  description:
    "Plateforme IA d'analyse d'expatriation pour les Français souhaitant s'installer à l'étranger. Découvrez les meilleurs pays selon votre profil, budget et priorités.",
  keywords: [
    "expatriation",
    "nomade digital",
    "vivre à l'étranger",
    "pays expatriation",
    "guide expatriation",
    "coût de vie",
    "IA",
    "analyse personnalisée",
  ],
  authors: [{ name: "NomadCompass" }],
  creator: "NomadCompass",
  publisher: "NomadCompass",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: "NomadCompass",
    title: "NomadCompass - Votre guide d'expatriation",
    description:
      "Découvrez les meilleurs pays pour votre expatriation grâce à l'IA. Analyse personnalisée basée sur votre profil, budget et priorités.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NomadCompass - Plateforme d'analyse d'expatriation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NomadCompass - Votre guide d'expatriation",
    description:
      "Découvrez les meilleurs pays pour votre expatriation grâce à l'IA",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // À remplir plus tard avec les codes de vérification
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="font-outfit antialiased">
        <SessionProvider>
          <ThemeProvider>
            <PageTransition>{children}</PageTransition>
            <ToastProvider />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

import Link from "next/link";
import { Button, Badge } from "@/components/ui";
import { ArrowLeft, Heart } from "lucide-react";

const countryData: Record<string, { name: string; flag: string; score: number; description: string }> = {
  portugal: { name: "Portugal", flag: "🇵🇹", score: 87, description: "Destination idéale pour les expatriés français grâce à sa proximité, son climat et sa communauté francophone." },
  spain: { name: "Espagne", flag: "🇪🇸", score: 82, description: "Proximité géographique et qualité de vie exceptionnelle." },
  thailand: { name: "Thaïlande", flag: "🇹🇭", score: 79, description: "Coût de vie attractif et climat tropical." },
};

export default async function CountryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const country = countryData[id] || countryData.portugal;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            <ArrowLeft className="h-5 w-5" />Résultats
          </Link>
          <Button variant="outline" size="sm"><Heart className="mr-2 h-4 w-4" />Ajouter aux favoris</Button>
        </div>
      </header>
      <div className="bg-white dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="flex items-center gap-6">
            <span className="text-7xl">{country.flag}</span>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{country.name}</h1>
              <div className="mt-2"><Badge color="success" size="md">Score: {country.score}%</Badge></div>
            </div>
          </div>
          <p className="mt-6 max-w-3xl text-lg text-gray-600 dark:text-gray-400">{country.description}</p>
        </div>
      </div>
    </div>
  );
}

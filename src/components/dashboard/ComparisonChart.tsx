"use client";

import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import type { CountryRecommendation } from "@/types/recommendations";

// Import dynamique de ReactApexChart pour éviter les erreurs SSR
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface ComparisonChartProps {
  recommendations: CountryRecommendation[];
  maxCountries?: number;
}

export function ComparisonChart({
  recommendations,
  maxCountries = 3,
}: ComparisonChartProps) {
  // Prendre les N premiers pays
  const topCountries = recommendations.slice(0, maxCountries);

  // Catégories pour le radar chart
  const categories = ["Budget", "Climat", "Sécurité", "Santé", "Vie"];

  // Préparer les séries de données
  const series = topCountries.map((country) => ({
    name: country.countryName,
    data: [
      country.scores.budget,
      country.scores.climate,
      country.scores.safety,
      country.scores.healthcare,
      country.scores.lifestyle,
    ],
  }));

  const options: ApexOptions = {
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "radar",
      toolbar: {
        show: false,
      },
    },
    colors: ["#465fff", "#10b981", "#f59e0b"],
    stroke: {
      width: 2,
    },
    fill: {
      opacity: 0.1,
    },
    markers: {
      size: 4,
      hover: {
        size: 6,
      },
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: ["#9CA3AF", "#9CA3AF", "#9CA3AF", "#9CA3AF", "#9CA3AF"],
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      show: false,
      min: 0,
      max: 100,
    },
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      fontFamily: "Outfit",
      fontSize: "14px",
      markers: {
        width: 10,
        height: 10,
        radius: 10,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5,
      },
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val}/100`,
      },
    },
  };

  return (
    <div className="w-full">
      <ReactApexChart
        options={options}
        series={series}
        type="radar"
        height={400}
      />
    </div>
  );
}

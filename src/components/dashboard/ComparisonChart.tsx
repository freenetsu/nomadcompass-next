"use client";

import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useTheme } from "@/context/ThemeContext";
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
  const { theme } = useTheme();
  const isDark = theme === "dark";

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

  const labelColor = isDark ? "#cbd5e1" : "#475569";
  const legendColor = isDark ? "#e2e8f0" : "#334155";

  const options: ApexOptions = {
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "radar",
      toolbar: {
        show: false,
      },
      background: "transparent",
    },
    colors: ["#2563eb", "#10b981", "#f59e0b"],
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
          colors: [labelColor, labelColor, labelColor, labelColor, labelColor],
          fontSize: "12px",
          fontWeight: 500,
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
      labels: {
        colors: legendColor,
      },
      markers: {
        size: 10,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5,
      },
    },
    tooltip: {
      theme: isDark ? "dark" : "light",
      y: {
        formatter: (val: number) => `${val}/100`,
      },
    },
  };

  return (
    <div className="w-full">
      <ReactApexChart
        key={theme}
        options={options}
        series={series}
        type="radar"
        height={400}
      />
    </div>
  );
}

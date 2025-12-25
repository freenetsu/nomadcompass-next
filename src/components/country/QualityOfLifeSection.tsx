import { Card } from "@/components/ui/Card";
import { Shield, Heart, Wind, Wifi } from "lucide-react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface QualityOfLifeSectionProps {
  safetyIndex?: number;
  healthcareIndex?: number;
  pollutionIndex?: number;
  internetSpeed?: number;
}

export function QualityOfLifeSection({
  safetyIndex,
  healthcareIndex,
  pollutionIndex,
  internetSpeed,
}: QualityOfLifeSectionProps) {
  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-success-500";
    if (score >= 50) return "text-warning-500";
    return "text-error-500";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 70) return "Excellent";
    if (score >= 50) return "Bon";
    return "Moyen";
  };

  const metrics = [
    {
      icon: Shield,
      label: "Sécurité",
      value: safetyIndex,
      description: "Indice de sécurité générale",
      color: "text-success-500 bg-success-50 dark:bg-success-500/15",
    },
    {
      icon: Heart,
      label: "Santé",
      value: healthcareIndex,
      description: "Qualité du système de santé",
      color: "text-error-500 bg-error-50 dark:bg-error-500/15",
    },
    {
      icon: Wind,
      label: "Environnement",
      value: pollutionIndex ? 100 - pollutionIndex : undefined,
      description: "Qualité de l'air et environnement",
      color: "text-blue-500 bg-blue-50 dark:bg-blue-500/15",
      inverted: true,
    },
    {
      icon: Wifi,
      label: "Internet",
      value: internetSpeed,
      description: "Vitesse et fiabilité internet",
      color: "text-brand-500 bg-brand-50 dark:bg-brand-500/15",
    },
  ];

  const hasChartData = [safetyIndex, healthcareIndex, pollutionIndex].some(
    (val) => val !== undefined && val !== null,
  );

  const chartOptions: ApexOptions = {
    chart: {
      type: "bar",
      height: 300,
      toolbar: { show: false },
      fontFamily: "Outfit, sans-serif",
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 8,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val.toFixed(0)}`,
      offsetX: 30,
      style: {
        fontSize: "12px",
        colors: ["#374151"],
      },
    },
    colors: ["#10b981", "#ef4444", "#3b82f6"],
    xaxis: {
      categories: ["Sécurité", "Santé", "Environnement"],
      max: 100,
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val.toFixed(1)}/100`,
      },
    },
  };

  const chartSeries = [
    {
      name: "Score",
      data: [
        safetyIndex || 0,
        healthcareIndex || 0,
        pollutionIndex ? 100 - pollutionIndex : 0,
      ],
    },
  ];

  return (
    <Card
      title="Qualité de vie"
      desc="Indicateurs de sécurité, santé et environnement"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const hasValue = metric.value !== undefined && metric.value !== null;

          return (
            <div
              key={metric.label}
              className="rounded-xl border border-gray-200 p-5 dark:border-gray-700"
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${metric.color}`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {metric.label}
              </h4>
              {hasValue ? (
                <>
                  <div className="mt-2 flex items-baseline gap-2">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {metric.value.toFixed(0)}
                    </p>
                    <span className="text-sm text-gray-500">/100</span>
                  </div>
                  <p
                    className={`mt-1 text-sm font-medium ${getScoreColor(metric.value)}`}
                  >
                    {getScoreLabel(metric.value)}
                  </p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {metric.description}
                  </p>
                </>
              ) : (
                <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
                  Non disponible
                </p>
              )}
            </div>
          );
        })}
      </div>

      {hasChartData && (
        <div className="mt-6">
          <h4 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
            Comparaison visuelle
          </h4>
          <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-700">
            <ReactApexChart
              options={chartOptions}
              series={chartSeries}
              type="bar"
              height={200}
            />
          </div>
        </div>
      )}

      <div className="mt-6 rounded-xl bg-gray-50 p-4 dark:bg-gray-800/50">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <p className="font-medium text-gray-900 dark:text-white">
            💡 Bon à savoir
          </p>
          <ul className="mt-2 space-y-1">
            <li>
              • Les indices sont basés sur des données collectées auprès de
              milliers d'utilisateurs
            </li>
            <li>
              • Un score supérieur à 70 est considéré comme excellent pour la
              qualité de vie
            </li>
            <li>
              • L'indice environnement est inversé : moins de pollution = score
              plus élevé
            </li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

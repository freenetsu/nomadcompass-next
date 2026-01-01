import { Card } from "@/components/ui/Card";
import { Thermometer, Cloud, Droplets, Sun } from "lucide-react";

interface ClimateSectionProps {
  averageTemp?: number;
  climate?: string;
  rainfall?: number;
}

export function ClimateSection({
  averageTemp,
  climate,
  rainfall,
}: ClimateSectionProps) {
  const getTemperatureColor = (temp: number) => {
    if (temp < 10) return "text-blue-500 bg-blue-50";
    if (temp < 20)
      return "text-success-500 bg-success-50";
    if (temp < 25)
      return "text-warning-500 bg-warning-50";
    return "text-error-500 bg-error-50";
  };

  const getRainfallLevel = (rain: number) => {
    if (rain < 500) return { label: "Faible", color: "text-warning-500" };
    if (rain < 1000) return { label: "Modéré", color: "text-success-500" };
    return { label: "Élevé", color: "text-blue-500" };
  };

  const metrics = [
    {
      icon: Thermometer,
      label: "Température moyenne",
      value: averageTemp,
      unit: "°C",
      color: averageTemp
        ? getTemperatureColor(averageTemp)
        : "text-gray-500 bg-gray-50",
    },
    {
      icon: Cloud,
      label: "Type de climat",
      value: climate,
      isText: true,
      color: "text-brand-500 bg-brand-50",
    },
    {
      icon: Droplets,
      label: "Précipitations annuelles",
      value: rainfall,
      unit: "mm",
      extra: rainfall ? getRainfallLevel(rainfall).label : null,
      color: "text-blue-500 bg-blue-50",
    },
  ];

  return (
    <Card title="Climat" desc="Données météorologiques annuelles moyennes">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const hasValue = metric.value !== undefined && metric.value !== null;

          return (
            <div
              key={metric.label}
              className="rounded-xl border border-gray-200 p-5"
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${metric.color}`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <h4 className="text-sm font-medium text-gray-900">
                {metric.label}
              </h4>
              {hasValue ? (
                <>
                  {metric.isText ? (
                    <p className="mt-2 text-lg font-semibold text-gray-900">
                      {metric.value}
                    </p>
                  ) : (
                    <p className="mt-2 text-2xl font-bold text-gray-900">
                      {typeof metric.value === "number"
                        ? metric.value.toFixed(1)
                        : metric.value}
                      {metric.unit && (
                        <span className="ml-1 text-sm font-normal text-gray-900">
                          {metric.unit}
                        </span>
                      )}
                    </p>
                  )}
                  {metric.extra && (
                    <p
                      className={`mt-1 text-sm font-medium ${getRainfallLevel(metric.value as number).color}`}
                    >
                      {metric.extra}
                    </p>
                  )}
                </>
              ) : (
                <p className="mt-2 text-sm text-gray-900">
                  Données non disponibles
                </p>
              )}
            </div>
          );
        })}
      </div>

      {averageTemp !== undefined && (
        <div className="mt-6 rounded-xl bg-white border border-gray-100 p-4">
          <div className="flex items-start gap-3">
            <Sun className="mt-0.5 h-5 w-5 text-gray-900" />
            <div>
              <h5 className="font-medium text-gray-900">
                Conditions climatiques
              </h5>
              <p className="mt-1 text-sm text-gray-900">
                {averageTemp < 15 &&
                  "Climat frais à froid. Prévoyez des vêtements chauds."}
                {averageTemp >= 15 &&
                  averageTemp < 25 &&
                  "Climat tempéré agréable toute l'année."}
                {averageTemp >= 25 &&
                  "Climat chaud. Privilégiez les vêtements légers et la protection solaire."}
                {rainfall !== undefined &&
                  rainfall > 1000 &&
                  " Précipitations importantes, surtout pendant la saison des pluies."}
              </p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

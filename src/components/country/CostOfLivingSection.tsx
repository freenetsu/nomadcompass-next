import { Card } from "@/components/ui/Card";
import { DollarSign, Home, ShoppingCart, Coffee } from "lucide-react";

interface CostOfLivingSectionProps {
  costOfLivingIndex?: number;
  averageRent?: number;
  averageSalary?: number;
}

export function CostOfLivingSection({
  costOfLivingIndex,
  averageRent,
  averageSalary,
}: CostOfLivingSectionProps) {
  const metrics = [
    {
      icon: DollarSign,
      label: "Indice coût de vie",
      value: costOfLivingIndex,
      unit: "/100",
      description: "Par rapport à New York (base 100)",
      color: "text-brand-500 bg-brand-50 dark:bg-brand-500/15",
    },
    {
      icon: Home,
      label: "Indice loyer",
      value: averageRent,
      unit: "/100",
      description: "Coût moyen des loyers",
      color: "text-success-500 bg-success-50 dark:bg-success-500/15",
    },
    {
      icon: ShoppingCart,
      label: "Pouvoir d'achat",
      value: averageSalary,
      unit: "/100",
      description: "Capacité d'achat locale",
      color: "text-warning-500 bg-warning-50 dark:bg-warning-500/15",
    },
  ];

  return (
    <Card title="Coût de la vie" desc="Indices basés sur les données Numbeo">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
                  <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                    {metric.value.toFixed(1)}
                    <span className="text-sm font-normal text-gray-500">
                      {metric.unit}
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {metric.description}
                  </p>
                </>
              ) : (
                <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
                  Données non disponibles
                </p>
              )}
            </div>
          );
        })}
      </div>

      {costOfLivingIndex && (
        <div className="mt-6 rounded-xl bg-gray-50 p-4 dark:bg-gray-800/50">
          <div className="flex items-start gap-3">
            <Coffee className="mt-0.5 h-5 w-5 text-gray-500 dark:text-gray-400" />
            <div>
              <h5 className="font-medium text-gray-900 dark:text-white">
                Que signifient ces indices ?
              </h5>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Un indice de 70 signifie que le coût est 30% moins élevé qu'à
                New York. Un indice de 120 signifie qu'il est 20% plus élevé.
                Les données sont collectées auprès de milliers d'utilisateurs à
                travers le monde.
              </p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

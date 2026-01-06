import { Card } from "@/components/ui/Card";
import { DollarSign, Home, ShoppingCart } from "lucide-react";

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
      color: "text-brand-500 bg-brand-50",
    },
    {
      icon: Home,
      label: "Indice loyer",
      value: averageRent,
      unit: "/100",
      description: "Coût moyen des loyers",
      color: "text-success-500 bg-success-50",
    },
    {
      icon: ShoppingCart,
      label: "Pouvoir d'achat",
      value: averageSalary,
      unit: "/100",
      description: "Capacité d'achat locale",
      color: "text-warning-500 bg-warning-50",
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
                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {metric.value!.toFixed(1)}
                    <span className="text-sm font-normal text-gray-900">
                      {metric.unit}
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-gray-900">
                    {metric.description}
                  </p>
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

      <div className="mt-6 rounded-xl bg-white border border-gray-100 p-4">
        <div className="text-sm text-gray-900">
          <p className="font-medium text-gray-900">
            💡 Comprendre les indices de coût
          </p>
          <ul className="mt-2 space-y-1.5">
            <li>
              • <span className="font-medium">Référence NYC = 100 :</span> New York sert de base de comparaison.
              Un indice de 50 = 50% moins cher, un indice de 120 = 20% plus cher
            </li>
            <li>
              • <span className="font-medium">Indice coût de vie :</span> Prix moyens des biens et services du quotidien
              (alimentation, transport, loisirs)
            </li>
            <li>
              • <span className="font-medium">Indice loyer :</span> Coût des logements locatifs comparé à NYC
            </li>
            <li>
              • <span className="font-medium">Pouvoir d&apos;achat :</span> Capacité d&apos;achat locale en fonction des salaires moyens.
              Plus c&apos;est élevé, plus le salaire moyen permet d&apos;acheter de biens
            </li>
            <li>
              • <span className="font-medium">Source :</span> Données Numbeo.com mises à jour par des expatriés
            </li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

import { Badge } from "@/components/ui";
import { MapPin, Heart } from "lucide-react";

interface CountryHeaderProps {
  name: string;
  code: string;
  flag: string;
  continent: string;
  overallScore?: number;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export function CountryHeader({
  name,
  code,
  flag,
  continent,
  overallScore,
  isFavorite = false,
  onToggleFavorite,
}: CountryHeaderProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
      {/* Mobile : vertical layout */}
      <div className="flex flex-col gap-4 sm:hidden">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-4xl">
              {flag}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-900">
                  {name}
                </h1>
              </div>
              <Badge color="light" size="sm" className="mt-1">
                {code}
              </Badge>
            </div>
          </div>
          {onToggleFavorite && (
            <button
              onClick={onToggleFavorite}
              className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border-2 transition-colors ${
                isFavorite
                  ? "border-error-500 bg-error-50 text-error-500"
                  : "border-gray-200 text-gray-400 hover:border-error-300 hover:text-error-500"
              }`}
            >
              <Heart
                className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`}
              />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-900">
          <MapPin className="h-4 w-4" />
          <span>{continent}</span>
        </div>
        {overallScore !== undefined && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-900">
              Score de compatibilité :
            </span>
            <span className="text-xl font-bold text-brand-500">
              {overallScore}/100
            </span>
          </div>
        )}
      </div>

      {/* Desktop : horizontal layout */}
      <div className="hidden sm:flex sm:items-start sm:justify-between">
        <div className="flex items-center gap-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gray-100 text-6xl">
            {flag}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold text-gray-900">
                {name}
              </h1>
              <Badge color="light">{code}</Badge>
            </div>
            <div className="mt-2 flex items-center gap-2 text-gray-900">
              <MapPin className="h-4 w-4" />
              <span>{continent}</span>
            </div>
            {overallScore !== undefined && (
              <div className="mt-4 flex items-center gap-2">
                <span className="text-sm text-gray-900">
                  Score de compatibilité :
                </span>
                <span className="text-2xl font-bold text-brand-500">
                  {overallScore}/100
                </span>
              </div>
            )}
          </div>
        </div>

        {onToggleFavorite && (
          <button
            onClick={onToggleFavorite}
            className={`flex h-12 w-12 items-center justify-center rounded-xl border-2 transition-colors ${
              isFavorite
                ? "border-error-500 bg-error-50 text-error-500"
                : "border-gray-200 text-gray-400 hover:border-error-300 hover:text-error-500"
            }`}
          >
            <Heart className={`h-6 w-6 ${isFavorite ? "fill-current" : ""}`} />
          </button>
        )}
      </div>
    </div>
  );
}

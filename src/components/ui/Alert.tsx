import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  LucideIcon,
} from "lucide-react";

type AlertVariant = "success" | "error" | "warning" | "info";

interface AlertProps {
  variant: AlertVariant;
  title: string;
  message: string;
  showLink?: boolean;
  linkHref?: string;
  linkText?: string;
  className?: string;
}

const variantConfig: Record<
  AlertVariant,
  { container: string; icon: string; Icon: LucideIcon }
> = {
  success: {
    container:
      "border-success-500 bg-success-50 dark:border-success-500/30 dark:bg-success-500/15",
    icon: "text-success-500",
    Icon: CheckCircle,
  },
  error: {
    container:
      "border-error-500 bg-error-50 dark:border-error-500/30 dark:bg-error-500/15",
    icon: "text-error-500",
    Icon: XCircle,
  },
  warning: {
    container:
      "border-warning-500 bg-warning-50 dark:border-warning-500/30 dark:bg-warning-500/15",
    icon: "text-warning-500",
    Icon: AlertTriangle,
  },
  info: {
    container:
      "border-blue-light-500 bg-blue-light-50 dark:border-blue-light-500/30 dark:bg-blue-light-500/15",
    icon: "text-blue-light-500",
    Icon: Info,
  },
};

export function Alert({
  variant,
  title,
  message,
  showLink = false,
  linkHref = "#",
  linkText = "En savoir plus",
  className,
}: AlertProps) {
  const config = variantConfig[variant];
  const IconComponent = config.Icon;

  return (
    <div
      className={cn("rounded-xl border p-4", config.container, className)}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <div className={cn("-mt-0.5", config.icon)}>
          <IconComponent className="h-6 w-6" />
        </div>

        <div>
          <h4 className="mb-1 text-sm font-semibold text-gray-800 dark:text-white/90">
            {title}
          </h4>

          <p className="text-sm text-gray-500 dark:text-gray-400">{message}</p>

          {showLink && (
            <Link
              href={linkHref}
              className="mt-3 inline-block text-sm font-medium text-gray-500 underline dark:text-gray-400"
            >
              {linkText}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";

type BadgeVariant = "light" | "solid";
type BadgeSize = "sm" | "md";
type BadgeColor =
  | "primary"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "light"
  | "dark";

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  color?: BadgeColor;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const sizeStyles = {
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-2.5 py-0.5",
};

const variants = {
  light: {
    primary:
      "bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300",
    success:
      "bg-success-100 text-success-700 dark:bg-success-900/40 dark:text-success-300",
    error:
      "bg-error-100 text-error-700 dark:bg-error-900/40 dark:text-error-300",
    warning:
      "bg-warning-100 text-warning-700 dark:bg-warning-900/40 dark:text-warning-300",
    info: "bg-blue-light-100 text-blue-light-700 dark:bg-blue-light-900/40 dark:text-blue-light-300",
    light: "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
    dark: "bg-gray-700 text-gray-100 dark:bg-gray-300 dark:text-gray-900",
  },
  solid: {
    primary: "bg-brand-600 text-white dark:bg-brand-500",
    success: "bg-success-600 text-white dark:bg-success-500",
    error: "bg-error-600 text-white dark:bg-error-500",
    warning: "bg-warning-600 text-white dark:bg-warning-500",
    info: "bg-blue-light-600 text-white dark:bg-blue-light-500",
    light: "bg-gray-500 text-white dark:bg-gray-400",
    dark: "bg-gray-800 text-white dark:bg-gray-700",
  },
};

export function Badge({
  variant = "light",
  color = "primary",
  size = "md",
  startIcon,
  endIcon,
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center gap-1 rounded-full font-medium",
        sizeStyles[size],
        variants[variant][color],
        className,
      )}
    >
      {startIcon && <span className="mr-0.5">{startIcon}</span>}
      {children}
      {endIcon && <span className="ml-0.5">{endIcon}</span>}
    </span>
  );
}

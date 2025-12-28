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
    primary: "bg-brand-100 text-brand-700",
    success: "bg-success-100 text-success-700",
    error: "bg-error-100 text-error-700",
    warning: "bg-sunshine-100 text-sunshine-800",
    info: "bg-ocean-100 text-ocean-700",
    light: "bg-gray-200 text-gray-800",
    dark: "bg-gray-700 text-white",
  },
  solid: {
    primary: "bg-brand-500 text-white shadow-md",
    success: "bg-success-600 text-white shadow-md",
    error: "bg-error-600 text-white shadow-md",
    warning: "bg-sunshine-500 text-gray-900 shadow-md",
    info: "bg-ocean-500 text-white shadow-md",
    light: "bg-gray-500 text-white",
    dark: "bg-gray-800 text-white",
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

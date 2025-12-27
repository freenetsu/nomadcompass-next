"use client";

import { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "outline" | "ghost" | "danger";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  isLoading?: boolean;
}

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-sm",
  lg: "px-6 py-3.5 text-base",
};

const variantClasses = {
  primary:
    "bg-brand-600 text-white shadow-theme-xs hover:bg-brand-700 active:bg-brand-800 disabled:bg-brand-400 dark:bg-brand-500 dark:hover:bg-brand-600",
  outline:
    "bg-white text-gray-800 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 active:bg-white dark:bg-gray-800 dark:text-gray-100 dark:ring-gray-600 dark:hover:bg-gray-700 dark:active:bg-gray-600",
  ghost:
    "bg-transparent text-gray-800 hover:bg-gray-100 active:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-800 dark:active:bg-gray-700",
  danger:
    "bg-error-600 text-white shadow-theme-xs hover:bg-error-700 active:bg-error-800 disabled:bg-error-400",
};

export function Button({
  children,
  size = "md",
  variant = "primary",
  startIcon,
  endIcon,
  isLoading = false,
  className,
  disabled,
  type = "button", // Par défaut "button" pour éviter la soumission accidentelle
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2",
        sizeClasses[size],
        variantClasses[variant],
        (disabled || isLoading) && "cursor-not-allowed opacity-50",
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg
          className="h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        startIcon && (
          <span className="flex items-center" aria-hidden="true">
            {startIcon}
          </span>
        )
      )}
      {children}
      {endIcon && !isLoading && (
        <span className="flex items-center" aria-hidden="true">
          {endIcon}
        </span>
      )}
    </button>
  );
}

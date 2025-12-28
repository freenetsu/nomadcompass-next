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
    "bg-brand-500 text-white shadow-lg hover:bg-brand-600 hover:shadow-xl active:bg-brand-700 disabled:bg-brand-300 transition-all duration-200 hover:scale-105",
  outline:
    "bg-white text-brand-600 ring-2 ring-inset ring-brand-500 hover:bg-brand-50 active:bg-brand-100 transition-all duration-200",
  ghost:
    "bg-transparent text-gray-700 hover:bg-brand-50 active:bg-brand-100 transition-all duration-200",
  danger:
    "bg-error-600 text-white shadow-lg hover:bg-error-700 active:bg-error-800 disabled:bg-error-400 transition-all duration-200",
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

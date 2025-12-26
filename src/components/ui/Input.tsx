"use client";

import { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export function Input({
  label,
  error,
  startIcon,
  endIcon,
  className,
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <div className="relative">
        {startIcon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            {startIcon}
          </div>
        )}
        <input
          className={cn(
            "w-full rounded-lg border px-4 py-3 text-sm transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2",
            "placeholder:text-gray-400",
            "hover:border-gray-400",
            error
              ? "border-error-300 bg-error-50 dark:border-error-700 dark:bg-error-900/10"
              : "border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800",
            "dark:text-white dark:placeholder:text-gray-500",
            startIcon && "pl-10",
            endIcon && "pr-10",
            className,
          )}
          {...props}
        />
        {endIcon && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            {endIcon}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-error-500">{error}</p>}
    </div>
  );
}

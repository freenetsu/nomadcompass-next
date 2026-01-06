"use client";

import { SelectHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  endIcon?: ReactNode;
}

export function Select({
  label,
  error,
  options,
  className,
  endIcon,
  ...props
}: SelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          className={cn(
            "w-full appearance-none rounded-lg border px-4 py-3 pr-10 text-sm transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2",
            "hover:border-gray-400 cursor-pointer",
            error
              ? "border-error-300 bg-error-50"
              : "border-gray-300 bg-white",
            "text-gray-900",
            className,
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        {endIcon}
      </div>
      {error && <p className="mt-1 text-sm text-error-500">{error}</p>}
    </div>
  );
}

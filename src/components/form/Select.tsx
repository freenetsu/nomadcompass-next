"use client";

import { forwardRef, SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  placeholder?: string;
  error?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      placeholder = "Sélectionner une option",
      onChange,
      className,
      value,
      error,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={cn(
            "h-11 w-full appearance-none rounded-lg border px-4 py-2.5 pr-11 text-sm shadow-theme-xs focus:outline-none focus:ring",
            value
              ? "text-gray-900"
              : "text-gray-500",
            error
              ? "bg-white border-error-600 focus:border-error-500 focus:ring-error-500/20"
              : "bg-white border-gray-300 focus:border-brand-500 focus:ring-brand-500/10",
            disabled && "cursor-not-allowed opacity-50 bg-gray-100",
            className,
          )}
          {...props}
        >
          <option
            value=""
            disabled
            className="text-gray-900"
          >
            {placeholder}
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="text-gray-900"
            >
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
      </div>
    );
  },
);

Select.displayName = "Select";

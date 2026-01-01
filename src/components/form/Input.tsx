"use client";

import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  success?: boolean;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, success, hint, disabled, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          ref={ref}
          disabled={disabled}
          className={cn(
            "h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-500 focus:outline-none focus:ring",
            disabled &&
              "text-gray-500 border-gray-300 opacity-40 bg-gray-100 cursor-not-allowed",
            error &&
              !disabled &&
              "bg-white border-error-600 text-gray-900 focus:border-error-500 focus:ring-error-500/20",
            success &&
              !disabled &&
              "bg-white border-success-600 text-gray-900 focus:border-success-500 focus:ring-success-500/20",
            !error &&
              !success &&
              !disabled &&
              "bg-white text-gray-900 border-gray-300 focus:border-brand-500 focus:ring-brand-500/20",
            className,
          )}
          {...props}
        />

        {hint && (
          <p
            className={cn(
              "mt-1.5 text-xs",
              error && "text-error-600",
              success && !error && "text-success-600",
              !error && !success && "text-gray-600",
            )}
          >
            {hint}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

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
            "h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-500 focus:outline-none focus:ring dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-400",
            disabled &&
              "text-gray-500 border-gray-300 opacity-40 bg-gray-100 cursor-not-allowed dark:bg-gray-900 dark:text-gray-500 dark:border-gray-700",
            error &&
              !disabled &&
              "border-error-600 focus:border-error-500 focus:ring-error-500/20 dark:text-error-300 dark:border-error-500 dark:focus:border-error-400",
            success &&
              !disabled &&
              "border-success-600 focus:border-success-500 focus:ring-success-500/20 dark:text-success-300 dark:border-success-500 dark:focus:border-success-400",
            !error &&
              !success &&
              !disabled &&
              "bg-transparent text-gray-900 border-gray-300 focus:border-brand-500 focus:ring-brand-500/20 dark:border-gray-600 dark:text-gray-100 dark:focus:border-brand-400",
            className,
          )}
          {...props}
        />

        {hint && (
          <p
            className={cn(
              "mt-1.5 text-xs",
              error && "text-error-600 dark:text-error-400",
              success && !error && "text-success-600 dark:text-success-400",
              !error && !success && "text-gray-600 dark:text-gray-300",
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

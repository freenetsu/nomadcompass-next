"use client";

import { forwardRef, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  hint?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, error, hint, disabled, rows = 3, ...props }, ref) => {
    return (
      <div className="relative">
        <textarea
          ref={ref}
          rows={rows}
          disabled={disabled}
          className={cn(
            "w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs focus:outline-none focus:ring bg-white",
            disabled &&
              "bg-gray-100 opacity-50 text-gray-500 border-gray-300 cursor-not-allowed",
            error &&
              !disabled &&
              "bg-white border-error-500 focus:border-error-300 focus:ring-error-500/10",
            !error &&
              !disabled &&
              "bg-white text-gray-900 border-gray-300 focus:border-brand-300 focus:ring-brand-500/10",
            className,
          )}
          {...props}
        />
        {hint && (
          <p
            className={cn(
              "mt-2 text-sm",
              error ? "text-error-500" : "text-gray-500",
            )}
          >
            {hint}
          </p>
        )}
      </div>
    );
  },
);

TextArea.displayName = "TextArea";

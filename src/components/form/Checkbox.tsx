"use client";

import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, checked, onChange, disabled, className, id, ...props }, ref) => {
    return (
      <label
        className={cn(
          "flex items-center space-x-3 cursor-pointer text-gray-800",
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
      >
        <input
          ref={ref}
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className={cn(
            "h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-brand-500 focus:ring-offset-0 focus:outline-none",
          )}
          {...props}
        />
        {label && <span className="text-sm font-medium">{label}</span>}
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";

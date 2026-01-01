import { LabelHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  required?: boolean;
}

export function Label({ children, className, required, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        "mb-1.5 block text-sm font-medium text-gray-900",
        className,
      )}
      {...props}
    >
      {children}
      {required && <span className="ml-1 text-error-500">*</span>}
    </label>
  );
}

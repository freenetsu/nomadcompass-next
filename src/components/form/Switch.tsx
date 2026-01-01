"use client";

import { cn } from "@/lib/utils";

interface SwitchProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  color?: "blue" | "gray";
  className?: string;
}

export function Switch({
  label,
  checked,
  onChange,
  disabled = false,
  color = "blue",
  className,
}: SwitchProps) {
  const handleToggle = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  const backgroundColors = {
    blue: checked ? "bg-brand-500" : "bg-gray-200",
    gray: checked
      ? "bg-gray-800"
      : "bg-gray-200",
  };

  return (
    <label
      className={cn(
        "flex cursor-pointer select-none items-center gap-3 text-sm font-medium",
        disabled
          ? "cursor-not-allowed text-gray-400"
          : "text-gray-700",
        className,
      )}
      onClick={handleToggle}
    >
      <div className="relative">
        <div
          className={cn(
            "block h-6 w-11 rounded-full transition duration-150 ease-linear",
            disabled
              ? "pointer-events-none bg-white"
              : backgroundColors[color],
          )}
        />
        <div
          className={cn(
            "absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-theme-sm duration-150 ease-linear transform",
            checked ? "translate-x-full" : "translate-x-0",
          )}
        />
      </div>
      {label}
    </label>
  );
}

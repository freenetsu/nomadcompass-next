"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative inline-flex h-10 w-10 items-center justify-center rounded-lg",
        "border border-gray-200 bg-white text-gray-700",
        "transition-all duration-200",
        "hover:bg-gray-50 hover:scale-105 hover:shadow-lg",
        "active:scale-95",
        "dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300",
        "dark:hover:bg-gray-700",
      )}
      aria-label="Toggle theme"
    >
      <Sun
        className={cn(
          "absolute h-5 w-5 transition-all duration-300",
          theme === "light"
            ? "rotate-0 scale-100 opacity-100"
            : "rotate-90 scale-0 opacity-0",
        )}
      />
      <Moon
        className={cn(
          "absolute h-5 w-5 transition-all duration-300",
          theme === "dark"
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-0 opacity-0",
        )}
      />
    </button>
  );
}

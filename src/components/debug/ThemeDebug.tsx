"use client";

import { useTheme } from "@/context/ThemeContext";
import { useEffect, useState } from "react";

export function ThemeDebug() {
  const { theme, toggleTheme } = useTheme();
  const [htmlHasDark, setHtmlHasDark] = useState(false);
  const [foregroundVar, setForegroundVar] = useState("");

  useEffect(() => {
    // Small delay to ensure DOM has updated
    const timeout = setTimeout(() => {
      setHtmlHasDark(document.documentElement.classList.contains("dark"));
      const fg = getComputedStyle(document.documentElement).getPropertyValue(
        "--foreground",
      ).trim();
      setForegroundVar(fg);
    }, 50);

    return () => clearTimeout(timeout);
  }, [theme]);

  return (
    <div
      className="fixed bottom-4 right-4 z-50 rounded-lg border-2 p-4 text-xs"
      style={{
        backgroundColor: theme === "dark" ? "#1e293b" : "#f8fafc",
        borderColor: theme === "dark" ? "#475569" : "#cbd5e1",
        color: theme === "dark" ? "#f1f5f9" : "#0f172a",
      }}
    >
      <div className="font-bold mb-2">🔍 Theme Debug</div>
      <div>Context theme: <strong>{theme}</strong></div>
      <div>HTML has .dark: <strong>{htmlHasDark ? "✅ yes" : "❌ no"}</strong></div>
      <div>--foreground var: <strong>{foregroundVar}</strong></div>

      <button
        onClick={toggleTheme}
        className="mt-3 w-full rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
      >
        Toggle Theme (Test)
      </button>

      <div className="mt-3 space-y-1">
        <div className="text-gray-900 dark:text-gray-100">gray-900 / gray-100</div>
        <div className="text-gray-600 dark:text-gray-300">gray-600 / gray-300</div>
        <div className="text-gray-500 dark:text-gray-300">gray-500 / gray-300</div>
        <div className="text-gray-400 dark:text-gray-300">gray-400 / gray-300</div>
      </div>

      <div className="mt-2 text-[10px] opacity-70">
        Si le texte est invisible, il y a un problème de génération Tailwind
      </div>
    </div>
  );
}

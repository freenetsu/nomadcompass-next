"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  align?: "left" | "right";
}

export function Dropdown({
  isOpen,
  onClose,
  children,
  className,
  align = "right",
}: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(".dropdown-toggle")
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={cn(
        "absolute z-40 mt-2 min-w-48 rounded-xl border border-gray-200 bg-white py-2 shadow-theme-lg dark:border-gray-800 dark:bg-gray-900",
        align === "right" ? "right-0" : "left-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface DropdownItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  onItemClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  danger?: boolean;
  tag?: "button" | "a";
  href?: string;
}

export function DropdownItem({
  children,
  onClick,
  onItemClick,
  className,
  icon,
  danger = false,
  tag = "button",
  href,
}: DropdownItemProps) {
  const handleClick = (event: React.MouseEvent) => {
    if (onClick) onClick();
    if (onItemClick) onItemClick();
  };

  const combinedClassName = cn(
    "flex w-full items-center gap-3 px-4 py-2 text-left text-sm transition-colors",
    danger
      ? "text-error-600 hover:bg-error-50 dark:text-error-400 dark:hover:bg-error-500/10"
      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
    className,
  );

  if (tag === "a" && href) {
    const Link = require("next/link").default;
    return (
      <Link href={href} className={combinedClassName} onClick={handleClick}>
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </Link>
    );
  }

  return (
    <button onClick={handleClick} className={combinedClassName}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}

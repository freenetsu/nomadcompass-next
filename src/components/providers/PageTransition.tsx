"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Add fade-in class when route changes
    container.classList.add("animate-fade-in");

    const timer = setTimeout(() => {
      container.classList.remove("animate-fade-in");
    }, 150);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div ref={containerRef} className="animate-fade-in">
      {children}
    </div>
  );
}

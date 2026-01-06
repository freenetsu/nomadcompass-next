"use client";

import { useEffect } from "react";

/**
 * Component to unregister any existing service workers
 * This fixes issues with old PWA service workers interfering with OAuth
 */
export function UnregisterServiceWorker() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister();
          console.log("Service worker unregistered:", registration.scope);
        }
      });
    }
  }, []);

  return null;
}

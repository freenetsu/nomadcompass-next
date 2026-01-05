"use client";

import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { LogOut, User, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function UserDropdown() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  function handleSignOut() {
    signOut({ callbackUrl: "/" });
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Loading state
  if (status === "loading") {
    return (
      <div className="flex items-center gap-3">
        <span className="h-10 w-24 animate-pulse rounded-lg bg-gray-200"></span>
      </div>
    );
  }

  // Not authenticated - show login button
  if (!session?.user) {
    return (
      <Link href="/auth/signin">
        <Button size="sm" className="gap-2">
          Se connecter
        </Button>
      </Link>
    );
  }

  const userInitials = session.user.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : session.user.email?.[0].toUpperCase() || "U";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg border border-ocean-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 transition-all hover:border-ocean-300 hover:bg-ocean-50"
      >
        {session.user.image ? (
          <Image
            src={session.user.image}
            alt={session.user.name || "User"}
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover ring-2 ring-ocean-100"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-xs font-bold text-white ring-2 ring-ocean-100">
            {userInitials}
          </div>
        )}
        <span className="hidden sm:inline">
          {session.user.name?.split(" ")[0] || session.user.email}
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-64 rounded-lg border border-ocean-200 bg-white shadow-xl">
          <div className="border-b border-ocean-100 p-4">
            <div className="flex items-center gap-3">
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-ocean-200"
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-sm font-bold text-white ring-2 ring-ocean-200">
                  {userInitials}
                </div>
              )}
              <div className="flex-1 overflow-hidden">
                <p className="truncate font-medium text-gray-900">
                  {session.user.name || "Utilisateur"}
                </p>
                <p className="truncate text-xs text-gray-500">
                  {session.user.email}
                </p>
              </div>
            </div>
          </div>

          <div className="py-1">
            <Link
              href="/profile"
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-ocean-50"
              onClick={() => setIsOpen(false)}
            >
              <User className="h-4 w-4" />
              Mon profil
            </Link>
            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-error-600 transition-colors hover:bg-error-50"
            >
              <LogOut className="h-4 w-4" />
              Se déconnecter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

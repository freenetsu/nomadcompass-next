"use client";

import { useSession, signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function UserDropdown() {
  const { data: session, status } = useSession();

  function handleSignOut() {
    signOut({ callbackUrl: "/" });
  }

  // Loading state
  if (status === "loading") {
    return (
      <div className="flex items-center gap-3">
        <span className="h-10 w-24 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700"></span>
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

  return (
    <div className="flex items-center gap-3">
      <span className="hidden text-sm text-gray-600 dark:text-gray-300 sm:block">
        {session.user.name?.split(" ")[0] || session.user.email}
      </span>
      <Button
        onClick={handleSignOut}
        variant="outline"
        size="sm"
        className="gap-2"
      >
        <LogOut className="h-4 w-4" />
        <span className="hidden sm:inline">Déconnexion</span>
      </Button>
    </div>
  );
}

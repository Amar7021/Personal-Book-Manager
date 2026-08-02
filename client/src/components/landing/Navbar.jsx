"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <BookOpen className="size-6" />
          <span className="text-lg font-semibold">Personal Book Manager</span>
        </Link>

        <div className="flex items-center gap-3">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>

          <Button asChild>
            <Link href="/register">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

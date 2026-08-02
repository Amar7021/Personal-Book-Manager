"use client";

import { useSelector } from "react-redux";
import { BookOpen, BookMarked, CircleCheckBig } from "lucide-react";
import StatCard from "./_components/StatCard";

export default function DashboardPage() {
  const { user } = useSelector((state) => state.auth);
  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Welcome back, {user?.username} 👋
        </h1>
        <p className="mt-2 text-muted-foreground">
          Here's a quick overview of your library.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <StatCard title="Total Books" value={0} icon={BookOpen} />
        <StatCard title="Reading" value={0} icon={BookMarked} />
        <StatCard title="Completed" value={0} icon={CircleCheckBig} />
      </div>
    </section>
  );
}

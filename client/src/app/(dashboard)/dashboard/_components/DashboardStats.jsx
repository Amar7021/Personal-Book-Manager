"use client";

import { BookOpen, BookMarked, CircleCheckBig } from "lucide-react";

function StatCard({ title, value, icon: Icon }) {
    return (
        <div className="rounded-xl border bg-card p-6 transition-shadow hover:shadow-md">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-muted-foreground">
                        {title}
                    </p>
                    <h2 className="mt-2 text-3xl font-bold">
                        {value}
                    </h2>
                </div>
                <div className="rounded-lg bg-muted p-3">
                    <Icon className="size-6" />
                </div>
            </div>
        </div>
    );
}

export default function DashboardStats({ books = [] }) {
    const totalBooks = books.length;
    const readingBooks = books.filter(
        (book) => book.status === "Reading"
    ).length;
    const completedBooks = books.filter(
        (book) => book.status === "Completed"
    ).length;

    return (
        <section className="grid gap-6 md:grid-cols-3">
            <StatCard
                title="Total Books"
                value={totalBooks}
                icon={BookOpen}
            />
            <StatCard
                title="Reading"
                value={readingBooks}
                icon={BookMarked}
            />
            <StatCard
                title="Completed"
                value={completedBooks}
                icon={CircleCheckBig}
            />
        </section>
    );
}
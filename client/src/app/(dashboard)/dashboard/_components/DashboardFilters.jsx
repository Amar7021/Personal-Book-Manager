"use client";

import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function DashboardFilters({
    search,
    setSearch,
    status,
    setStatus,
    tag,
    setTag,
    onAddBook,
}) {
    return (
        <section className="flex flex-col gap-4 rounded-xl border bg-card p-4 lg:flex-row lg:items-center">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="Search by title or author..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                />
            </div>
            <Select
                value={status}
                onValueChange={setStatus}
            >
                <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="">All Status</SelectItem>
                    <SelectItem value="Want to Read">
                        Want to Read
                    </SelectItem>
                    <SelectItem value="Reading">
                        Reading
                    </SelectItem>
                    <SelectItem value="Completed">
                        Completed
                    </SelectItem>
                </SelectContent>
            </Select>
            <Input
                placeholder="Tag"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="lg:w-48"
            />
            <Button onClick={onAddBook}>
                <Plus className="mr-2 size-4" />
                Add Book
            </Button>
        </section>
    );
}
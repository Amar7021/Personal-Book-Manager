import { Skeleton } from "@/components/ui/skeleton";

export default function BookSkeleton() {
    return (
        <div className="rounded-xl border p-6">
            <Skeleton className="h-6 w-1/3" />

            <Skeleton className="mt-3 h-4 w-1/4" />

            <div className="mt-5 flex gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
            </div>

            <div className="mt-8 flex justify-end gap-3">
                <Skeleton className="h-9 w-20 rounded" />
                <Skeleton className="h-9 w-20 rounded" />
            </div>
        </div>
    );
}
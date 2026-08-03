"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPagination({
    pagination,
    onPageChange,
}) {
    if (!pagination || pagination.totalPages <= 1) {
        return null;
    }
    const { currentPage, totalPages } = pagination;

    return (
        <div className="mt-8 flex items-center justify-between">
            <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
            </Button>
            <div className="text-sm text-muted-foreground">
                Page{" "}
                <span className="font-medium text-foreground">
                    {currentPage}
                </span>{" "}
                of{" "}
                <span className="font-medium text-foreground">
                    {totalPages}
                </span>
            </div>
            <Button
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
        </div>
    );
}
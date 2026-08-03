"use client";

import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useUpdateBook } from "@/hooks/book";
import { formatDistanceToNow } from "date-fns";

export default function BookCard({
    book,
    onEdit,
    onDelete,
}) {
    const { mutate } = useUpdateBook();
    const handleStatusChange = (status) => {
        mutate({
            id: book._id,
            values: {
                status,
            },
        });
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            whileHover={{ y: -3 }}
            className="rounded-xl border bg-card p-6 shadow-sm"
        >
            <div className="flex items-start justify-between gap-6">
                <div className="flex-1 space-y-3">
                    <div>
                        <h3 className="max-w-[300px] truncate text-xl font-semibold">
                            {book.title}
                        </h3>
                        <p className="max-w-[300px] truncate text-muted-foreground">
                            {book.author}
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {book.tags?.map((tag, index) => (
                            <Badge
                                key={`books-${tag}-${index}`}
                                variant="secondary"
                            >
                                #{tag}
                            </Badge>
                        ))}
                    </div>
                </div>
                <Select
                    value={book.status}
                    onValueChange={handleStatusChange}
                >
                    <SelectTrigger className="w-40">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Want to Read">
                            📖 Want to Read
                        </SelectItem>
                        <SelectItem value="Reading">
                            📘 Reading
                        </SelectItem>
                        <SelectItem value="Completed">
                            ✅ Completed
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="mt-6 flex justify-between items-center gap-2">
                <p className="text-sm text-muted-foreground">
                    Added {formatDistanceToNow(new Date(book.createdAt), {
                        addSuffix: true,
                    })}
                </p>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(book)}
                    >
                        <Pencil className="mr-2 size-4" />
                        Edit
                    </Button>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => onDelete(book)}
                    >
                        <Trash2 className="mr-2 size-4" />
                        Delete
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
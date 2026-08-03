"use client";

import { AnimatePresence } from "framer-motion";
import BookCard from "./BookCard";

export default function BookList({
    books,
    onEdit,
    onDelete,
}) {
    if (!books.length) {
        return (
            <div className="rounded-xl border border-dashed py-20 text-center">
                <h3 className="text-lg font-semibold">
                    Your library is empty
                </h3>

                <p className="mt-2 text-muted-foreground">
                    Start by adding your first book.
                </p>
            </div>
        );
    }

    return (
        <AnimatePresence mode="popLayout">
            <div className="space-y-4">
                {books.map((book) => (
                    <BookCard
                        key={book._id}
                        book={book}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </AnimatePresence>
    );
}
"use client";

import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteBook } from "@/hooks/book";

export default function DeleteBookDialog({
    open,
    onOpen,
    book,
}) {
    const { mutate, isPending } = useDeleteBook(onOpen);

    const handleDelete = () => {
        mutate(book._id);
    };

    return (
        <AlertDialog
            open={open}
            onOpen={onOpen}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Delete Book
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete{" "}
                        <span className="inline-block align-bottom max-w-[180px] truncate font-semibold">
                            "{book?.title}"
                        </span>
                        ?
                        <br />
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending} onClick={() => onOpen(false)}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        disabled={isPending}
                        onClick={handleDelete}
                    >
                        {isPending ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
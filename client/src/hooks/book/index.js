"use client";

import { createBook, deleteBook, getBooks, updateBook } from "@/services/book.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useBooks = (params) => {
    console.log({ params })
    return useQuery({
        queryKey: ["books", params],
        queryFn: ({ signal }) => getBooks({ signal, ...params }),
    });
};

export const useCreateBook = (onOpenChange) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createBook,
        onSuccess: (data) => {
            console.log("successs", data)
            if (data.success) {
                onOpenChange(false)
                toast.success(data.message || "Book added")
                queryClient.invalidateQueries({
                    queryKey: ["books"],
                });
            }
        },
    });
};

export const useUpdateBook = (onOpenChange = () => { }) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateBook,
        onSuccess: (data) => {
            if (data.success) {
                toast.success(data.message || "Book updated")
                onOpenChange && onOpenChange(false)
                queryClient.invalidateQueries({
                    queryKey: ["books"],
                });
            }
        },
    });
};

export const useDeleteBook = (onOpen) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteBook,
        onSuccess: (data) => {
            console.log({ data })
            if (data.success) {
                onOpen(false)
                toast.success(data.message || "Book deleted")
                queryClient.invalidateQueries({
                    queryKey: ["books"],
                });
            }
        },
    });
};
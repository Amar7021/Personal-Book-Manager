"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Field,
    FieldContent,
    FieldError,
    FieldLabel,
} from "@/components/ui/field";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { bookSchema } from "../_validations";
import { useCreateBook, useUpdateBook } from "@/hooks/book";

export default function BookDialog({
    open,
    onOpenChange,
    book,
}) {
    const isEditing = Boolean(book);
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        clearErrors,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(bookSchema),
        defaultValues: {
            title: "",
            author: "",
            tags: "",
            status: "Want to Read",
        },
    });

    useEffect(() => {
        if (book) {
            reset({
                title: book.title,
                author: book.author,
                tags: book.tags?.join(", "),
                status: book.status,
            });
        } else {
            reset({
                title: "",
                author: "",
                tags: "",
                status: "Want to Read",
            });
        }

    }, [book, reset]);
    const { mutate: createBook, isPending: isCreating } =
        useCreateBook(onOpenChange);

    const { mutate: updateBook, isPending: isUpdating } =
        useUpdateBook(onOpenChange);

    const onSubmit = (values) => {
        console.log("payload", values)
        const payload = {
            ...values,
            tags: values.tags
                ? values.tags
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter(Boolean)
                : [],
        };
        if (isEditing) {
            updateBook({
                id: book._id,
                values: payload,
            });
            return;
        }
        createBook(payload);
    };

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? "Edit Book" : "Add Book"}
                    </DialogTitle>
                </DialogHeader>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >
                    <Field>
                        <FieldLabel>Title</FieldLabel>
                        <FieldContent>
                            <Input
                                placeholder="Enter Book Title"
                                {...register("title")}
                                className={
                                    errors.title
                                        ? "border-destructive focus-visible:ring-destructive"
                                        : ""
                                }
                            />
                            <FieldError>
                                {errors.title?.message}
                            </FieldError>
                        </FieldContent>
                    </Field>
                    <Field>
                        <FieldLabel>Author</FieldLabel>
                        <FieldContent>
                            <Input
                                placeholder="Enter Author Name"
                                {...register("author")}
                                className={
                                    errors.author
                                        ? "border-destructive focus-visible:ring-destructive"
                                        : ""
                                }
                            /><FieldError>
                                {errors.author?.message}
                            </FieldError>
                        </FieldContent>
                    </Field>
                    <Field>
                        <FieldLabel>Tags</FieldLabel><FieldContent>
                            <Input
                                placeholder="Enter Tags (eg. self help)"
                                {...register("tags")}
                            />
                            <FieldError>
                                {errors.tags?.message}
                            </FieldError>
                        </FieldContent>
                    </Field>
                    <Field>
                        <FieldLabel>Status</FieldLabel>
                        <FieldContent>
                            <Select
                                value={watch("status")}
                                onValueChange={(value) =>
                                    setValue("status", value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent><SelectItem value="Want to Read">
                                    Want to Read
                                </SelectItem><SelectItem value="Reading">
                                        Reading
                                    </SelectItem>
                                    <SelectItem value="Completed">
                                        Completed
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </FieldContent>
                    </Field>
                    <Button
                        className="w-full"
                        disabled={isCreating || isUpdating}
                    >
                        {isEditing
                            ? isUpdating
                                ? "Updating..."
                                : "Update Book"
                            : isCreating
                                ? "Adding..."
                                : "Add Book"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
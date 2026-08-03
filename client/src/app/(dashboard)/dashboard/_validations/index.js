import * as yup from "yup";

export const bookSchema = yup.object({
    title: yup
        .string()
        .trim()
        .required("Title is required"),
    author: yup
        .string()
        .trim()
        .required("Author is required"),
    tags: yup
        .string()
        .trim(),
    status: yup
        .string()
        .oneOf([
            "Want to Read",
            "Reading",
            "Completed",
        ])
        .required(),
});
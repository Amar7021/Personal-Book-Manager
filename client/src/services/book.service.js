import api from "@/lib/api";

export const getBooks = async ({ signal, ...params }) => {
    console.log("Fetching books...");
    const { data } = await api.get("/book/get-all", {
        params,
        signal
    });
    return data;
};

export const createBook = async (values) => {
    const { data } = await api.post("/book/create", values);
    return data;
};
export const updateBook = async ({ id, values }) => {
    console.log({ id, values })
    const { data } = await api.put(`/book/update/${id}`, values);
    return data;
};
export const deleteBook = async (id) => {
    const { data } = await api.delete(`/book/delete/${id}`);
    return data;
};
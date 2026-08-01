import BookModel from "../models/book.model.js";

export const createBook = async (req, res) => {
    try {
        const { title, author, tags, status } = req.body;

        const book = await BookModel.create({
            owner: req.user._id,
            title,
            author,
            tags,
            status,
        })

        res.status(201).json({
            success: true,
            book,
        })
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Something went wrong.",
        })
    }
}

export const getAllUsersBooks = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            status,
            tag,
            search,
        } = req.query
        const pageNumber = Number(page)
        const limitNumber = Number(limit)
        const skip = (pageNumber - 1) * limitNumber
        const filter = {
            owner: req.user._id,
        }
        if (status) {
            filter.status = status;
        }
        if (tag) {
            filter.tags = {
                $in: [tag],
            }
        }

        if (search) {
            filter.$or = [
                {
                    title: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    author: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ]
        }

        const books = await BookModel.find(filter)
            .sort({
                createdAt: -1,
            })
            .skip(skip)
            .limit(limitNumber)

        const totalBooks = await BookModel.countDocuments(filter)
        return res.status(200).json({
            success: true,
            paginationObj: {
                currentPage: pageNumber,
                totalPages: Math.ceil(
                    totalBooks / limitNumber
                ),
                totalBooks,
                limit: limitNumber,
            },
            books,
        })
    } catch (error) {
        console.error("Get books error:", error)
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        })
    }
}

export const getBookById = async (req, res) => {
    try {
        const { id } = req.params

        const book = await BookModel.findOne({
            _id: id,
            owner: req.user._id,
        })

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found.",
            });
        }
        return res.status(200).json({
            success: true,
            book,
        })
    } catch (error) {
        console.error("Get book error:", error)
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        })
    }
}

export const updateBook = async (req, res) => {
    try {
        const { id } = req.params
        const allowedFields = [
            "title",
            "author",
            "tags",
            "status",
        ]
        const updates = {}
        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        })
        const updatedBook = await BookModel.findOneAndUpdate(
            {
                _id: id,
                owner: req.user._id,
            },
            updates,
            {
                new: true,
                runValidators: true,
            }
        )
        if (!updatedBook) {
            return res.status(404).json({
                success: false,
                message: "Book not found.",
            })
        }
        return res.status(200).json({
            success: true,
            message: "Book updated successfully.",
            book: updatedBook,
        })
    } catch (error) {
        console.error("Update book error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        })
    }
}

export const deleteBook = async (req, res) => {
    try {
        const { id } = req.params
        const deletedBook = await BookModel.findOneAndDelete({
            _id: id,
            owner: req.user._id,
        })
        if (!deletedBook) {
            return res.status(404).json({
                success: false,
                message: "Book not found.",
            })
        }
        return res.status(200).json({
            success: true,
            message: "Book deleted successfully.",
        })
    } catch (error) {
        console.error("Delete book error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        })
    }
}
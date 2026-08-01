import mongoose from "mongoose"

const { Schema, model } = mongoose

const bookSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    tags: [
        {
            type: String,
            trim: true,
        },
    ],
    status: {
        type: String,
        enum: ["Want to Read", "Reading", "Completed"],
        default: "Want to Read",
    },
},
    {
        timestamps: true,
    }
)

const BookModel = model("Book", bookSchema)

export default BookModel
import express from "express"
import { createBook, getBookById, updateBook, deleteBook, getAllUsersBooks } from "../controllers/book.controllers..js"
import { authMiddleware } from "../middlewares/auth.middleware.js"

const bookRouter = express.Router()

bookRouter.use(authMiddleware)

bookRouter.route("/create").post(createBook)
bookRouter.route("/get-all").get(getAllUsersBooks)
bookRouter.route("/get-single/:id").post(getBookById)
bookRouter.route("/update/:id").patch(updateBook)
bookRouter.route("/delete/:id").delete(deleteBook)

export default bookRouter
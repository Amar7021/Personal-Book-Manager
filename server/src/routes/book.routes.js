import express from "express";
import {
  createBook,
  getBookById,
  updateBook,
  deleteBook,
  getAllUsersBooks,
} from "../controllers/book.controllers..js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.route("/book/create").post(createBook);
router.route("/book/get-all").get(getAllUsersBooks);
router.route("/book/get-single/:id").post(getBookById);
router.route("/book/update/:id").patch(updateBook);
router.route("/book/delete/:id").delete(deleteBook);

export default router;

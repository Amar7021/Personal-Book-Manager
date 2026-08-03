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

router.route("/create").post(createBook);
router.route("/get-all").get(getAllUsersBooks);
router.route("/get-single/:id").get(getBookById);
router.route("/update/:id").put(updateBook);
router.route("/delete/:id").delete(deleteBook);

export default router;

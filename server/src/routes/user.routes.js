import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
} from "../controllers/user.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(logoutUser);

userRouter.route("/user").get(authMiddleware, getUser);

export default userRouter;

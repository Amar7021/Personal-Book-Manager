import express from "express"
import { registerUser, loginUser, logoutUser } from "../controllers/user.controllers.js"

const userRouter = express.Router()

userRouter.route("/register").post(registerUser)
userRouter.route("/login").post(loginUser)
userRouter.route("/logout").post(logoutUser)

export default userRouter
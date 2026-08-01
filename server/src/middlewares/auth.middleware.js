import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
    try {
        // token getting from cookie
        const token = req.cookies?.accessToken
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthenticated user.",
            })
        }
        const decodedToken = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        )
        const user = await UserModel.findById(decodedToken._id).select(
            "-password"
        )
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid access token."
            })
        }

        req.user = user
        next()
    } catch (error) {
        console.error("Auth Middleware Error:", error)
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token.",
        })
    }
};
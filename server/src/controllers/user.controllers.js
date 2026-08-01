import UserModel from "../models/user.model.js";

export const registerUser = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        username = username.trim().toLowerCase()
        email = email.trim().toLowerCase()
        password = password.trim()
        // val;idate
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            })
        }
        // Check if user exists already
        const existingUser = await UserModel.findOne({
            $or: [{ username }, { email }],
        })
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Username or email already exists.",
            })
        }

        const user = await UserModel.create({
            username,
            email,
            password,
        })

        // Generate JWT
        const accessToken = user.generateAccessToken()
        const userResponse = user.toObject()
        delete userResponse.password
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000, //30
        }

        res
            .status(201)
            .cookie("accessToken", accessToken, cookieOptions)
            .json({
                success: true,
                message: "User registered successfully.",
                user: userResponse,
            })
    } catch (error) {
        console.error("Register user error:", error)

        res.status(500).json({
            success: false,
            message: "Internal server error.",
        })
    }
}

export const loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required.",
            })
        }
        email = email.trim().toLowerCase()
        password = password.trim()
        const user = await UserModel.findOne({ email })

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            })
        }
        const isPasswordValid = await user.isPasswordCorrect(password)
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            })
        }
        const accessToken = user.generateAccessToken()
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        }

        const userResponse = user.toObject()
        delete userResponse.password
        return res
            .status(200)
            .cookie("accessToken", accessToken, cookieOptions)
            .json({
                success: true,
                message: "Login successful.",
                user: userResponse,
            })
    } catch (error) {
        console.error("Login user error:", error)

        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        })
    }
}

export const logoutUser = async (req, res) => {
    try {
        return res
            .status(200)
            .clearCookie("accessToken", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            })
            .json({
                success: true,
                message: "Logged out successfully.",
            });
    } catch (error) {
        console.error("Logout user error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

import mongoose from "mongoose"

const connectToDB = async () => {
    try {
        const connect = await mongoose(process.env.MONGO_URI)
    } catch (error) {
        console.log("Error connecting to DB: ", error)
    }
}

export default connectToDB
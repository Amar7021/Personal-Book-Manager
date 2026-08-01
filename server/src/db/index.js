import mongoose from "mongoose"

const connectToDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log("DB Connected on Host: ", connect.connection.port)
    } catch (error) {
        console.log("Error connecting to DB: ", error)
        process.exit(1)
    }
}

export default connectToDB
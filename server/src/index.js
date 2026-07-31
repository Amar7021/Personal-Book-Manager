import express from "express"
import cors from "cors"
import connectToDB from "./db"

const app = express()

const PORT = process.env.PORT || 5000

app.use(cors({
    origin: '*',
    credentials: true,
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))

connectToDB()

app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`)
})
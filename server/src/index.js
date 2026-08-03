import express from "express";
import cors from "cors";
import connectToDB from "./db/index.js";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import bookRouter from "./routes/book.routes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    exposedHeaders: ["set-cookie"],
  }),
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

connectToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`The server is listening on:  http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error setting up server: ", error);
  });

// routes
app.get("/", (req, res) => {
  res.send("Hello Express Server!!");
});
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/book", bookRouter);

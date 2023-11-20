import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// these are config after created app

const app = express();
// jb hum middleware ke liye hum use krte hai
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
// cookies
app.use(cookieParser())

export { app };

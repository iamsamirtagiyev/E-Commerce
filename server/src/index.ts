import "dotenv/config";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { db } from "./config/db.config";
import authRouter from "./routes/auth.routes";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

db();

const port = process.env.PORT || 3000;

app.get("/", (_req: Request, res: any) => res.send("Hello Server"));

app.use("/api/auth", authRouter);

app.listen(port, () => console.log("Server is running on port -> " + port));

import express from "express";
import cors from "cors";
import expressvalidator from "express-validator";
import cookieParser from "cookie-parser";
require("dotenv").config();
import connectDB from "./src/config/db"
import { adminRouter } from "./src/api/routes";

const host = process.env.host;
const port = process.env.port;

const app = express();

//mide
app.use(express.json());
app.use(cors())
app.use(expressvalidator());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


app.use("/api/admin", adminRouter);

app.listen(port, () => {
  console.log(`Running on http://${host}:${port}`);
});
connectDB()

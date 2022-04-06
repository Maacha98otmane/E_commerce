import express from "express";
import cors from "cors";
import expressvalidator from "express-validator";
import cookieParser from "cookie-parser";
require("dotenv").config();
import connectDB from "./src/config/db";
import { 
          categoryRouter,
          adminRouter,
          shippingCompanyRouter,
          productRouter,
          sellerRouter 
        } from './src/api/routes/'
const host = process.env.host;
const port = process.env.port;

const app = express();

// //mid
app.use(express.json());
app.use(cors())
app.use(expressvalidator());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/admin", adminRouter);
app.use("/api/category", categoryRouter);
app.use("/api/shippingCompany", shippingCompanyRouter);
app.use("/api/product", productRouter);
app.use("/api/seller", sellerRouter);

app.listen(port, () => {
  console.log(`Running on http://${host}:${port}`);
});
connectDB()

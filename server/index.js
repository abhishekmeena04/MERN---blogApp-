import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import morgan from "morgan";
// image upload
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";

import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

connectDB();

const app = express();

app.use(morgan("dev"));
app.use(express.json()); // undefined in console because the data is in JSON formate
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());

import userRoutes from "./routes/userRoute.js";
import blogRoutes from "./routes/blogRoute.js";

app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);

// image upload - cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY, // Click 'View API Keys' above to copy your API secret
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is listening at ${PORT}`);
});

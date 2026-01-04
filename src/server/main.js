
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/database.js";
import sendMail from "./utils/sendMail.js";
import bookRoute from "./route/BookRoute.js";
import AdminRoute from "./route/AdminRoute.js";
import userRoute from "./route/UserRoute.js";
import contactRoute from "./route/ContactRoute.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const PORT = process.env.PORT || 8087;


app.use("/api/v1/book", bookRoute);
app.use("/api/v1/admin", AdminRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/user/contact", contactRoute);
app.get("/sendMail", sendMail);

app.use(express.static(path.join(__dirname, "../client/dist../client/dist")));


app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});



app.listen(PORT, "0.0.0.0", () => {
  connectDB();
  console.log(`Server is listening on port ${PORT}`);
});

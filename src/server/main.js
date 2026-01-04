import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import connectDB from "./config/database.js";
import sendMail from "./utils/sendMail.js";
import bookRoute from "./route/BookRoute.js";
import AdminRoute from "./route/AdminRoute.js";
import userRoute from "./route/UserRoute.js";
import contactRoute from "./route/ContactRoute.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const PORT = process.env.PORT || 8087;

app.use(express.json());
app.use(cookieParser());
app.use(cors(
  {
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }
));
app.options("*", cors());

app.use("/api/v1/book", bookRoute);
app.use("/api/v1/admin", AdminRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/users/contact", contactRoute);

app.get("/sendMail", sendMail);

const clientPath = path.join(__dirname, "../client/dist");

if (fs.existsSync(clientPath)) {
 
  app.use(express.static(clientPath));

  app.use((req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
  });
} 

app.listen(PORT, "0.0.0.0", async () => {
  await connectDB();
  console.log(` Server running on port ${PORT}`);
});

import express from "express";
import {createBook, getBooks, deleteBook, updateBook, getDashBoardData } from "../controller/BookNewController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
const router = express.Router();



router.post("/createBook", protect, isAdmin, createBook);
router.patch("/:id", protect, isAdmin, updateBook);
router.delete("/:id", protect, isAdmin, deleteBook);
router.get("/", getBooks);
router.get("/getDashboardData", getDashBoardData);

export default router;

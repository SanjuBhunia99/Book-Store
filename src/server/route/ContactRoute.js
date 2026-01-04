import express from "express";
import { sendMessage,
  getAllMessages,
  deleteMessage, } from "../controller/ContactController.js";
const router = express.Router();

router.post("/send", sendMessage);
router.get("/all", getAllMessages);      
router.delete("/:id", deleteMessage);      

export default router;

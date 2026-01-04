import express from "express";
import { login, logout, register, refreshToken } from "../controller/UserController.js";


const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/logout",logout);

router.post("/refresh-token", refreshToken)

export default router;

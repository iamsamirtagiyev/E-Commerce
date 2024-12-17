import { Router } from "express";
import { deleteUser, forgetPassword, login, logout, register, resetPassword, verifyOtp } from "../controllers/auth.controller";
import { hashPassword } from "../middlewares/hash-password";

const router = Router();

router.post("/register", hashPassword, register);
router.post("/login", login);
router.get("/logout", logout);
router.delete("/delete", deleteUser);
router.post("/forget-password", forgetPassword);
router.post("/verify-otp/:id", verifyOtp);
router.post("/reset-password/:id", hashPassword, resetPassword);

export default router;

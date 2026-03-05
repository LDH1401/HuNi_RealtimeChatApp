import express from "express";
import { signUp, signIn, signOut } from "../controllers/authControllers.js";

const router = express.Router(); // Tạo một router mới để định nghĩa các route liên quan đến xác thực

router.post("/signup", signUp) // Định nghĩa route POST /signup để xử lý đăng ký người dùng mới

router.post("/signin", signIn) // Định nghĩa route POST /signin để xử lý đăng nhập người dùng

router.post("/signout", signOut)

export default router;
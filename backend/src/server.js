import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoute from './routes/authRoute.js';
import userRoute from './routes/useRoute.js'
import cookieParser from 'cookie-parser'
import { protectedRoute } from "./middlewares/authMiddleware.js";
import cors from "cors"; 

dotenv.config(); // Load biến môi trường từ file .env

const app = express(); // Tạo một ứng dụng Express

const PORT = process.env.PORT || 5001; // APP nhận requets trên cổng 3000 hoặc cổng được chỉ định trong biến môi trường


app.use(express.json()); // Middleware để phân tích JSON trong body của yêu cầu
app.use(cookieParser())
app.use(cors({origin: process.env.CLIENT_URL, credentials: true}))

//public routes
app.use("/api/auth", authRoute); // Các request đến đường dẫn /api/auth sẽ được xử lý bởi router authRoute

//private route
app.use("/api/users", protectedRoute, userRoute )

connectDB().then(() => { // Kết nối đến MongoDB thành công, sau đó bắt đầu server
    app.listen(PORT, () => { // Mở cổng để lắng nghe request
        console.log(`Server is running on port ${PORT}`)
    })
})
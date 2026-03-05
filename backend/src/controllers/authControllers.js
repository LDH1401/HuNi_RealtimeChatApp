import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import Session from "../models/Session.js";
import crypto from "crypto";


const ACCESS_TOKEN_TTL = '30m' // Thời gian sống của access token, có thể được đặt trong file .env để dễ dàng quản lý và bảo mật hơn
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000 // Thời gian sống của refresh token, có thể được đặt trong file .env để dễ dàng quản lý và bảo mật hơn


export const signUp = async (req, res) => {
    try {
        // lấy thông tin từ req.body rồi kiểm tra xem có trùng tài khoản không
        const { username, password, email, firstname, lastname } = req.body;
        
        if(!username || !password || !email || !firstname || !lastname) {
            return res.status(400).json({ message: "Yêu cầu điền đầy đủ thông tin" })
        }

        const duplicate = await User.findOne({ username })
        if(duplicate) {
            return res.status(409).json({ message: "Tên tài khoản đã tồn tại" })
        }


        const hashPassword = await bcrypt.hash(password, 10) // Băm mật khẩu với salt rounds là 10

        await User.create({ // Tạo người dùng mới trong cơ sở dữ liệu với thông tin đã cung cấp
            username,
            hashPassword,
            email,
            displayname: `${firstname} ${lastname}`
        })

        return res.status(201).json({ message: "Đăng ký thành công" }) // Trả về phản hồi thành công sau khi tạo người dùng mới
    }catch (error) {
        console.error("Lỗi khi đăng ký:", error);
        return res.status(500).json({ message: "Lỗi máy chủ" }) // Trả về lỗi máy chủ nếu có lỗi xảy ra trong quá trình đăng ký
    }
}

export const signIn = async (req, res) => {
    try {
        const { username, password } = req.body; // Lấy thông tin từ request body

        if(!username || !password) {
            return res.status(400).json({ message: "Yêu cầu điền đầy đủ thông tin" }) // Kiểm tra nếu thiếu trường nào đó, trả về lỗi
        }

        const user = await User.findOne({ username }) // Tìm người dùng trong cơ sở dữ liệu theo username
        if(!user) {
            return res.status(404).json({ message: "username hoặc mật khẩu không đúng" }) // Nếu không tìm thấy người dùng, trả về lỗi
        }

        const passwordCorrect = await bcrypt.compare(password, user.hashPassword) // So sánh mật khẩu đã nhập với mật khẩu đã băm trong cơ sở dữ liệu
        if(!passwordCorrect) {
            return res.status(401).json({ message: "username hoặc mật khẩu không đúng" }) // Nếu mật khẩu không đúng, trả về lỗi
        }

        const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_TTL }) // Tạo access token với payload chứa id người dùng, sử dụng secret và thời gian sống đã định nghĩa

        const refreshToken = crypto.randomBytes(64).toString("hex") 

        await Session.create({ // Tạo 1 bản ghi trong DB
            userId: user._id,
            refreshToken,
            expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL)
        })
        
        res.cookie('refreshToken', refreshToken, { // Gửi cookie về trình duyệt 
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: REFRESH_TOKEN_TTL
        })

        return res.status(200).json({ message: "Đăng nhập thành công", accessToken })
    }catch (error) {
        console.error("Lỗi khi đăng nhập:", error);
        return res.status(500).json({ message: "Lỗi máy chủ" }) // Trả về lỗi máy chủ nếu có lỗi xảy ra trong quá trình đăng nhập
    }
}

export const signOut = async (req, res) => {
    try{
        // lấy refresh token từ cookie
        const token = req.cookies?.refreshToken

        if(token){
            // xóa refresh token trong Session
            await Session.deleteOne({refreshToken: token})
            // xóa cookie
            res.clearCookie("refreshToken")
        }
        return res.sendStatus(204)
    }catch(error){
        console.error("Lỗi đăng xuất", error)
        return res.status(500).json({message: "Lỗi hệ thống"})
    }
}
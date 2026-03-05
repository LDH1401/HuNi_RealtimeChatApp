import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
{
    username:{
        type: String,
        required: true, // Bắt buộc phải có username
        unique: true, // Đảm bảo username là duy nhất trong cơ sở dữ liệu
        trim: true,
        lowercase: true // Chuyển username thành chữ thường để tránh trùng lặp do khác biệt về chữ hoa/chữ thường
    },
    hashPassword:{ // Lưu trữ mật khẩu đã được băm (hash) để bảo mật
        type: String, 
        required: true // Bắt buộc phải có hashPassword
    },
    email: {
        type: String,
        required: true, // Bắt buộc phải có email
        unique: true, // Đảm bảo email là duy nhất trong cơ sở dữ liệu
        trim: true,
        lowercase: true
     },
     displayname: {
        type: String,
        required: true,
        trim: true
     },
     avatarUrl: {
        type: String // URL của ảnh đại diện, không bắt buộc
     },
     avatarId: {
        type: String // ID của ảnh đại diện trên dịch vụ lưu trữ, không bắt buộc
     },
     bio: {
        type: String,
        maxlength: 500
     },
     phone: {
        type: String,
        sparse: true // cho phép null nhưng không được trùng
     }
},
{
    timestamps: true // Tự động thêm trường createdAt và updatedAt
})

const User = mongoose.model("User", userSchema); // Tạo model User từ schema đã định nghĩa

export default User; // Xuất model User để sử dụng trong các phần khác của ứng dụng
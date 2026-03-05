import mongoose from "mongoose";

 export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGGODB_CONNECTIONSTRING)
        console.log("Connected to MongoDB successfully");
    }catch(error){
        console.log("Error connecting to MongoDB:", error);
        process.exit(1); // Thoát ứng dụng nếu lỗi kết nối đến MongoDB
        
    }
}

import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
    console.log("Kết Nối Với MONGODB Thành Công !!!!!!!");
  } catch (error) {
    console.log("Kết nối với MONGOODB thất bại");
    process.exit(1); // thoát ứng dụng nếu ko kết nối được
  }
};

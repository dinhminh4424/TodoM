import express from "express";
import routes from "./routes/index.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

// Middleware để phân tích JSON của body của yêu cầu
app.use(express.json());
app.use(
  cors({
    origin: [process.env.CLIENT_URL, "https://abc.com"],
    credentials: true,
  }),
); // cho phép link url client gọi được api

// đăng kí các api
app.use("/api", routes);

// kết nối cơ sở dữ liệu
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server đang chạy trên: http://localhost:${PORT}`);
  });
});

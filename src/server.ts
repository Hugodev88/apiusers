import express from "express";
// @ts-ignore: no declaration file for 'cors'
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes)
app.use('/users', userRoutes)

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
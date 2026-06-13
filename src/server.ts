import express from "express";
// @ts-ignore: no declaration file for 'cors'
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";

dotenv.config();

const app = express();

app.use(express.json());
app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/tasks', taskRoutes)

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
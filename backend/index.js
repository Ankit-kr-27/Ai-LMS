import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import cookieParser from 'cookie-parser';
dotenv.config();
import authRouter from './route/authRoute.js';
import cors from "cors"
import userRouter from './route/userRoute.js';

const PORT = process.env.PORT || 8000;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

await connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB
});
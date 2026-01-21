import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB
});
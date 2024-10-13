import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Database Connected'))
  .catch((error) => {
    console.error('Error connecting to the database:', error.message);
    process.exit(1);
  });

const app = express();

// Enable CORS with options
app.use(cors({
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    origin: '*' // Your frontend's origin
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Use authRoutes for your API
app.use('/', authRoutes);

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));


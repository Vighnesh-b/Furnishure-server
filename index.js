import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Database Connected'))
  .catch((error) => {
    console.error('Error connecting to the database:', error.message);
    process.exit(1);
  });

const app = express();

// Middleware
app.use(cors({ credentials: true, origin: 'https://furnishure.vercel.app' })); // Allow CORS from your front-end
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Test endpoint to verify server is running
app.get('/test', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// Auth routes
app.use('/', authRoutes);

// Default port
const port = process.env.PORT || 7000;

// Start the server
app.listen(port, () => console.log(`Server is running on port ${port}`));

export default app; // Export the app for testing or other purposes


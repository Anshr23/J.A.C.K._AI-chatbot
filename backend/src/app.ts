import express from 'express';
import { config } from 'dotenv';
import morgan from "morgan"
import appRouter from './routes/index.js'; // Import the appRouter from routes/index.js
import cookieParser from 'cookie-parser';
import cors from "cors";
config(); // Load environment variables from .env file
const app = express();

app.use(cors({origin: "http://localhost:5173", credentials: true }));

//middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(morgan('dev')); // HTTP request logger middleware

app.use("/api/v1", appRouter); // Use the appRouter for all routes under /api/v1

export default app; 
import 'dotenv/config';
import express from 'express';
import morgan from "morgan"
import appRouter from './routes/index.js'; // Import the appRouter from routes/index.js
import cookieParser from 'cookie-parser';
import cors from "cors";
const app = express();
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        // Allow non-browser requests (no Origin header) and known UI origins.
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
            return;
        }
        callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
}));

//middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(morgan('dev')); // HTTP request logger middleware

app.use("/api/v1", appRouter); // Use the appRouter for all routes under /api/v1

export default app; 
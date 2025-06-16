import express from "express";
import { config } from "dotenv";
import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
import userRoutes from "./routes/userRoute.js";
import chatRoutes from "./routes/chatRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config();
const PORT = process.env.PORT || 5001;

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

// app.post("/first", (req, res, next) => {
//   //getting info from static route 
//   console.log(req.body.name);
//   res.send('Hello, World!');
// }
// );

// app.post("/second/:id", (req, res, next) => {
//   //getting info from dynamic route 
//   console.log(req.params.id);
//   res.send('Hello, World!');
// }
// );

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// }
// );

//connections and listeners
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/chat", chatRoutes);

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT} and connected to the database.`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  }
  );  


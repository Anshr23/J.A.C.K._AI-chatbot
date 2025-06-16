import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
import { config } from "dotenv";

config();
const PORT = process.env.PORT || 5001;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT} and connected to the database.`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });  


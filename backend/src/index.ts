import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";

const PORT = process.env.PORT || 5001;


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


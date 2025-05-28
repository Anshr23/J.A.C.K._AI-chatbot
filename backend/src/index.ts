import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

//for reading and parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET - to get data
// POST - to create new data
// PUT - to update existing data
// DELETE - to delete data


const port = 5001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
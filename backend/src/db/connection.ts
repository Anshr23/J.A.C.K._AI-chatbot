import { connect , disconnect } from 'mongoose';

// This function connects to the MongoDB database using Mongoose.
async function connectToDatabase() {
  try {
    await connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

async function disconnectFromDatabase() {
  try {
    await disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
    throw error;
  }
}
export { connectToDatabase, disconnectFromDatabase };

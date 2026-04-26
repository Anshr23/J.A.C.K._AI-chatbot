import { connect , disconnect } from "mongoose";

async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL as string);
    } catch (error) {
        console.error("Error connecting to the database:", error);
        throw new Error("Database connection failed");
    }
}
//secure approach to disconnect from the database if any error occurs
async function disconnectFromDatabase() {
    try {
        await disconnect();
    } catch (error) {
        console.error("Error disconnecting from the database:", error);
        throw new Error("Database disconnection failed");
    }
}
export { connectToDatabase, disconnectFromDatabase };
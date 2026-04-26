import mongoose from 'mongoose';
import { randomUUID } from 'crypto';

const chatSchema = new mongoose.Schema({
    id: {
        type: String,
        default: () => randomUUID(),
    },
    role: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    chats: [chatSchema], // Array of chat objects
    conversations: [
        new mongoose.Schema({
            id: {
                type: String,
                default: () => randomUUID(),
            },
            title: {
                type: String,
                required: true,
            },
            chats: [chatSchema],
            createdAt: {
                type: Date,
                default: Date.now,
            },
            updatedAt: {
                type: Date,
                default: Date.now,
            },
        }, { _id: false })
    ],
});

export default mongoose.model('User', userSchema);

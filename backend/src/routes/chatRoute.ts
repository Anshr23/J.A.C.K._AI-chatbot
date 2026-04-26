import { Router } from "express";
import { verifyToken } from "../utils/tokenManager";
import { chatCompleteValidator, validate } from "../utils/validators";
import { createNewConversation, deleteChats, generateChatCompletion, getConversations, sendChatsToUser } from "../controllers/chatControllers";

//protected API
const chatRoutes = Router();
chatRoutes.get("/conversations", verifyToken, getConversations);
chatRoutes.post("/new-conversation", verifyToken, createNewConversation);
chatRoutes.post("/new", validate(chatCompleteValidator), verifyToken, generateChatCompletion);
chatRoutes.get("/all-chats", verifyToken, sendChatsToUser );
chatRoutes.delete("/delete", verifyToken, deleteChats );


export default chatRoutes;
import { Router } from "express";
import { verifyToken } from "../utils/tokenManager";
import { chatCompleteValidator, validate } from "../utils/validators";
import { deleteChats, generateChatCompletion, sendChatsToUser } from "../controllers/chatControllers";

//protected API
const chatRoutes = Router();
chatRoutes.post("/new", validate(chatCompleteValidator), verifyToken, generateChatCompletion);
chatRoutes.get("/all-chats", verifyToken, sendChatsToUser );
chatRoutes.delete("/delete", verifyToken, deleteChats );


export default chatRoutes;
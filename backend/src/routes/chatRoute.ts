import { Router } from "express";
import { verifyToken } from "../utils/tokenManager";
import { chatCompleteValidator, validate } from "../utils/validators";
import { generateChatCompletion } from "../controllers/chatControllers";

//protected API
const chatRoutes = Router();
chatRoutes.post("/new", validate(chatCompleteValidator),verifyToken,generateChatCompletion)

export default chatRoutes;
import { Router } from 'express';
import { getAllChats } from '../controllers/chatControls';

const chatsRouter = Router();
chatsRouter.get("/chats", getAllChats);

export default chatsRouter;
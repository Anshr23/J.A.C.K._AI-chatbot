import { Router } from 'express';
import userRouter from './userRoute';
import chatsRouter from './chatsRoute';

const appRouter = Router();



appRouter.get("/user", userRouter);  //domain/api/v1/user
appRouter.get("/chats", chatsRouter);  //domain/api/v1/chats




export default appRouter;
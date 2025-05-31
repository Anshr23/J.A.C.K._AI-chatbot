import { Router } from "express";
import userRouter from "./userRoute";
import chatRouter from "./chatRoutes";

const appRouter = Router();

appRouter.use("/user", userRouter); // Mount userRouter on /domain/api/v1/user path
appRouter.use("/chats", chatRouter); // Mount chatRouter on /domain/api/v1/chats path


export default appRouter;
import { Router } from "express";
import userRoutes from "./userRoute";
import chatRoutes from "./chatRoute";

const appRouter = Router();

appRouter.use("/user", userRoutes); // Mount userRouter on /domain/api/v1/user path
appRouter.use("/chats", chatRoutes); // Mount chatRouter on /domain/api/v1/chats path


export default appRouter;
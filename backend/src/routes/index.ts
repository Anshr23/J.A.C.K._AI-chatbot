import { Router } from "express";
import userRoutes from "./userRoute";
import chatRoutes from "./chatRoute";

const appRouter = Router();

appRouter.use("/user", userRoutes); // Mount userRouter on /domain/api/v1/user path
appRouter.use("/chat", chatRoutes); // Mount chatRouter on /domain/api/v1/chat path


export default appRouter;
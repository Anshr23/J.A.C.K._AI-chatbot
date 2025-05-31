import { Router } from "express";
import { getAllUsers } from "../controllers/userControllers";

const userRouter = Router();

console.log("getAllUsers is", getAllUsers);
userRouter.get("/", getAllUsers);

export default userRouter;
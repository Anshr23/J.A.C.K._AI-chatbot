import { Router } from 'express';
import { getAllUsers } from '../controllers/userControls';

const userRouter = Router();

userRouter.get("/", getAllUsers);

export default userRouter;
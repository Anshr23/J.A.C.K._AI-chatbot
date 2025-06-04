import { Router } from "express";
import { getAllUsers, userLogin, userSignup, verifyUser } from "../controllers/userControllers";
import { loginValidator , signupValidator, validate } from "../utils/validators";
import { verifyToken } from "../utils/tokenManager";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/sign-up", validate(signupValidator), userSignup);
userRoutes.post("/login", validate(loginValidator), userLogin );
userRoutes.get("/auth-status",verifyToken ,verifyUser );


export default userRoutes;
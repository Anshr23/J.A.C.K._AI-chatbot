import { Router } from "express";
import { getAllUsers, userLogin, userSignup } from "../controllers/userControllers";
import { loginValidator , signupValidator, validate } from "../utils/validators";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/sign-up", validate(signupValidator), userSignup);
userRoutes.post("/login", validate(loginValidator), userLogin );


export default userRoutes;
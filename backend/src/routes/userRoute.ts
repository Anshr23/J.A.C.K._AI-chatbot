import { Router } from "express";
import { getAllUsers, userSignup } from "../controllers/userControllers";
import { signupValidator, validate } from "../utils/validators";
import { body, ValidationChain, validationResult } from "express-validator";


const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/sign-up", validate(signupValidator), userSignup);

export default userRoutes;
import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { hash , compare } from 'bcrypt';
import { createToken } from '../utils/tokenManager';
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllUsers = async(req: Request, res: Response, next: NextFunction) => {
    try {
        //get all users from the database
        const users = await User.find();
        res.status(201).json({ message: "OK", users});
    } catch (error) {
        console.log(error);
        res.status(200).json({message: "ERROR", cause: error.message});
    }
};

export const userSignup = async(req: Request, res: Response, next: NextFunction) => {
    try {
        //user signup
        const {name, email, password} = req.body;
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            res.status(401).json({ message: "User already registered" });
        }
        const hashedPassword = await hash(password, 10);
        const user = new User({name , email, password: hashedPassword});
        await user.save();

        //create token and store cookie
        if (!COOKIE_NAME) {
            throw new Error("COOKIE_NAME is not defined in environment variables");
        }

        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: process.env.APP_DOMAIN,
            expires,
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        res.status(201).json({ message: "OK", name: user.name, email: user.email });
        
    } catch (error) {
        console.log(error);
        res.status(200).json({message: "ERROR", cause: error.message});
    }
};

export const userLogin = async(req: Request, res: Response, next: NextFunction) => {
    try {
        //user login
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user) {
            res.status(401).send("User not registered");
        }
        const isPasswordCorrect = await compare(password, user.password);
        if(!isPasswordCorrect){
            res.status(403).send("Incorrect Password !");
        }

        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: process.env.APP_DOMAIN,
            expires,
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });

        res.status(200).json({ message: "OK", name: user.name, email: user.email });
    } catch (error) {
        console.log(error);
        res.status(200).json({message: "ERROR", cause: error.message });
    }
};


export const verifyUser = async ( req: Request, res: Response, next: NextFunction ) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      res.status(401).send("Permissions didn't match");
    }
    res.status(200).json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const userSignout = async ( req: Request, res: Response, next: NextFunction ) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      res.status(401).send("Permissions didn't match");
    }

    res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: process.env.APP_DOMAIN,
            signed: true,
            path: "/",
            secure: true,
            sameSite: "none",
        });

    res.status(200).json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

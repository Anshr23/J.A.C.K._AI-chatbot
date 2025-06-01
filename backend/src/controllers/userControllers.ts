import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { hash , compare } from 'bcrypt';

export const getAllUsers = async(req: Request, res: Response, next: NextFunction) => {
    try {
        //get all users from the database
        const users = await User.find();
        res.status(201).json({ message: "OK", users});
    } catch (error) {
        console.log(error);
        res.status(200).json({message: "ERROR", cause: (error as Error).message});
    }
};

export const userSignup = async(req: Request, res: Response, next: NextFunction) => {
    try {
        //user signup
        const {name, email, password} = req.body;
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            res.status(401).send("User already registered");
        }
        const hashedPassword = await hash(password, 10);
        const user = new User({name , email, password: hashedPassword});
        await user.save();
        res.status(201).json({ message: "OK", id: user._id.toString() });
    } catch (error) {
        console.log(error);
        res.status(200).json({message: "ERROR", cause: (error as Error).message});
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
        res.status(200).json({ message: "OK", id: user._id.toString() });
    } catch (error) {
        console.log(error);
        res.status(200).json({message: "ERROR", cause: error.message });
    }
};
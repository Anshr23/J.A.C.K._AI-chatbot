import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

export const getAllUsers = async(req: Request, res: Response, next: NextFunction) => {
    try {
        //get all users from the database
        const users = await User.find();
        res.status(200).json({ message: "OK", users});
    } catch (error) {
        console.log(error);
        res.status(200).json({message: "ERROR", cause: (error as Error).message});
    }
};
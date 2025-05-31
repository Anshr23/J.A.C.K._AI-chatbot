import { NextFunction, Response, Request } from 'express';
import user from '../models/users';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await user.find();
        res.status(200).json({Message: "Users fetched successfully", users: users});
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({Message: "ERROR", error: error.message});
    }
};
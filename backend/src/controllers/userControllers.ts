import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { hash, compare } from 'bcrypt';
import { createToken } from '../utils/tokenManager';
import { clearAuthCookie, setAuthCookie, COOKIE_NAME } from '../utils/authCookie';

const createTokenAndSetCookie = (res: Response, user: any) => {
    const token = createToken(user._id.toString(), user.email, '7d');
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    setAuthCookie(res, token, expires);
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //get all users from the database
        const users = await User.find();
        res.status(200).json({ message: 'OK', users });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: 'ERROR', cause: error.message });
    }
};

export const userSignup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(409).json({ message: 'User already registered' });
            return;
        }

        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        createTokenAndSetCookie(res, user);
        res.status(201).json({ message: 'OK', name: user.name, email: user.email });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: 'ERROR', cause: error.message });
    }
};

export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).send('User not registered');
            return;
        }

        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
            res.status(403).send('Incorrect Password !');
            return;
        }

        createTokenAndSetCookie(res, user);
        res.status(200).json({ message: 'OK', name: user.name, email: user.email });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: 'ERROR', cause: error.message });
    }
};

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            res.status(401).send('User not registered OR Token malfunctioned');
            return;
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            res.status(401).send("Permissions didn't match");
            return;
        }

        // Prevent caching of auth status
        res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.set('Pragma', 'no-cache');
        res.set('Expires', '0');

        res.status(200).json({ message: 'OK', name: user.name, email: user.email });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: 'ERROR', cause: error.message });
    }
};

export const userSignout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            res.status(401).send('User not registered OR Token malfunctioned');
            return;
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            res.status(401).send("Permissions didn't match");
            return;
        }

        clearAuthCookie(res);

        // Prevent caching of signout response
        res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.set('Pragma', 'no-cache');
        res.set('Expires', '0');

        res.status(200).json({ message: 'OK', name: user.name, email: user.email });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: 'ERROR', cause: error.message });
    }
};
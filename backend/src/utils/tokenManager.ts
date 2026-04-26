import { NextFunction , Request, Response } from "express";
import jwt, { Secret, SignOptions } from "jsonwebtoken";

export const createToken = (id: string, email: string, expiresIn: string | number) => {
    const payload = { id, email };
    const secret: Secret = process.env.JWT_SECRET as Secret;
    const options = { expiresIn: expiresIn as SignOptions['expiresIn'] };
    const token = jwt.sign(payload, secret, options);
    return token;
};

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.signedCookies[`${process.env.COOKIE_NAME}`];
    if (!token || typeof token !== "string" || token.trim() === "") {
        res.status(401).json({ message: "Token Not Received" });
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
        if (err) {
            res.status(401).json({ message: "Token Expired" });
            return;
        }

        res.locals.jwtData = decoded;
        next();
    });
};


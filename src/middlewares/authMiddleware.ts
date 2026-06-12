import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

type AuthPayload = {
    userId: string;
};

type AuthRequest = Request & {
    auth?: AuthPayload;
};

export const authMiddleware = (req: AuthRequest,res: Response,next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Token not provided" });
    }

    const [, token] = authHeader.split(" ");

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as AuthPayload;

        req.auth = decoded;

        return next();
    } catch {
        return res.status(401).json({ message: "Invalid token" });
    }
};
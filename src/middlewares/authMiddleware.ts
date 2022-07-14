import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Sessions } from "@prisma/client";

import * as sessionRepository from "../repositories/sessionRepository.js";

dotenv.config();

export async function validateToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authorization: string = req.headers.authorization;

    const token = authorization?.replace("Bearer ", "").trim();
    
    try {
        const secret = process.env.JWT_SECRET_KEY;
        const tokenData = jwt.verify(token, secret);
        const session: Sessions = await sessionRepository.get(token);

        if (!token || !session || !tokenData) {
            throwUnauthorizedError();
        }

        res.locals.tokenData = tokenData;
        next();
    } catch {
        console.log("deu ruim!");
        throwUnauthorizedError();
    }
}

function throwUnauthorizedError() {
    throw {
        type: "unauthorized",
        message: "Invalid token",
    };
}

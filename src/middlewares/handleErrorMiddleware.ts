import { NextFunction, Request, Response } from "express";

export function handleError(
    error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log(error);
    if (error.type) {
        res.status(errorTypeToStatusCode(error.type)).send(error.message);
    } else {
        res.sendStatus(500);
    }
}

function errorTypeToStatusCode(type: string) {
    if (type === "unauthorized") return 401;
    if (type === "notFound") return 404;
    if (type === "conflict") return 409;
}

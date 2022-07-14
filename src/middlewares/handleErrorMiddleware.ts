import { NextFunction, Request, Response } from "express";

export function handleError(
    error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log(error);

    res.status(errorTypeToStatusCode(error.type)).send(error.message);
}

function errorTypeToStatusCode(type: string) {
    if (type === "conflict") return 409;
}

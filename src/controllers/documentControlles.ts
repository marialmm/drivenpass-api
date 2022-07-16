import { Request, Response } from "express";
import { Documents } from "@prisma/client";

import * as documentServices from "../services/documentServices.js";

type CreateDocumentBody = Omit<Documents, "id" | "userId">;

export async function create(req: Request, res: Response) {
    const documentBody: CreateDocumentBody = req.body;
    const userId: number = parseInt(res.locals.tokenData.userId);

    await documentServices.create({ ...documentBody, userId });

    res.sendStatus(201);
}

export async function get(req: Request, res: Response) {
    const userId: number = parseInt(res.locals.tokenData.userId);

    const documents = await documentServices.get(userId);

    res.send(documents);
}

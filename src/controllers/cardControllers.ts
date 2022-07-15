import { Cards } from "@prisma/client";
import { Request, response, Response } from "express";

import * as cardServices from "../services/cardServices.js";

type CreateCardBody = Omit<Cards, "id" | "userId">

export async function create(req: Request, res: Response) {
    const cardData: CreateCardBody = req.body;
    const userId: number = res.locals.tokenData.userId;

    await cardServices.create({...cardData, userId});

    res.sendStatus(201);
}
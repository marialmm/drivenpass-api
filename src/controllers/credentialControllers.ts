import { Request, Response } from "express";

import { CreateCredentialData } from "../repositories/credentialRepository";
import * as credentialServices from "../services/credentialServices.js";

type CreateCredentialBody = Omit<CreateCredentialData, "userId">;

export async function create(req: Request, res: Response) {
    const credentialBody: CreateCredentialBody = req.body;

    const { tokenData } = res.locals;
    const userId: number = tokenData.userId;

    const credentialData: CreateCredentialData = { ...credentialBody, userId };

    await credentialServices.create(credentialData);

    res.sendStatus(201);
}

export async function get(req: Request, res: Response) {
    const { userId } = res.locals.tokenData;
    const credentials = await credentialServices.get(userId);

    res.send(credentials);
}

export async function getById(req: Request, res: Response) {
    const userId: number = res.locals.tokenData.userId;
    const id: number = parseInt(req.params.id);

    const credential = await credentialServices.getById(userId, id);

    res.send(credential);
}

export async function deleteById(req: Request, res: Response) {
    const userId: number = res.locals.tokenData.userId;
    const id: number = parseInt(req.params.id);

    await credentialServices.deleteById(userId, id);

    res.sendStatus(200);
}

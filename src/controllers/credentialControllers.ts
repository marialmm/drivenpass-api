import { Request, Response } from "express";

import { CreateCredentialData } from "../repositories/credentialRepository";
import * as credentialServices from "../services/credentialServices.js";

type CreateCredentialBody = Omit<CreateCredentialData, "userId">

export async function create(req: Request, res: Response){
    const credentialBody: CreateCredentialBody = req.body;

    const {tokenData} = res.locals;
    const userId: number = tokenData.userId;

    const credentialData: CreateCredentialData = {...credentialBody, userId}

    await credentialServices.create(credentialData);

    res.sendStatus(201);
}
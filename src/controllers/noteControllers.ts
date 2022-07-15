import { Request, Response } from "express";

import { CreateSecureNoteData } from "../repositories/noteRepository";
import * as noteServices from "../services/noteServices.js";

type CreateSecureNoteBody = Omit<CreateSecureNoteData, "userId">

export async function create(req: Request, res: Response) {
    const userId: number = res.locals.tokenData.userId;

    const secureNoteData: CreateSecureNoteBody = req.body;

    await noteServices.create({...secureNoteData, userId});

    res.sendStatus(201);
}

export async function get(req: Request, res: Response) {
    const userId: number = res.locals.tokenData.userId;

    const notes = await noteServices.get(userId);

    res.send(notes);
}

export async function getById(req: Request, res: Response) {
    const userId: number = res.locals.tokenData.userId;
    const id: number = parseInt(req.params.id);

    const note = await noteServices.getById(userId, id);

    res.send(note);
}

export async function deleteById(req: Request, res: Response) {
    const userId: number = res.locals.tokenData.userId;
    const id: number = parseInt(req.params.id);

    await noteServices.deleteById(userId, id);

    res.sendStatus(200);
}
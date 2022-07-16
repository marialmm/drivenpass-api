import { Wifi } from "@prisma/client";
import { Request, Response } from "express";

import * as wifiServices from "../services/wifiServices.js";

type CreateWifiBody = Omit<Wifi, "id" | "userId">;

export async function create(req: Request, res: Response) {
    const wifiData: CreateWifiBody = req.body;
    const userId: number = res.locals.tokenData.userId;

    await wifiServices.create({ ...wifiData, userId });

    res.sendStatus(201);
}

export async function get(req: Request, res: Response) {
    const userId: number = res.locals.tokenData.userId;

    const wifi = await wifiServices.get(userId);

    res.send(wifi);
}

export async function getById(req: Request, res: Response) {
    const userId: number = res.locals.tokenData.userId;
    const id: number = parseInt(req.params.id);

    const wifi = await wifiServices.getById(userId, id);

    res.send(wifi);
}

import { Request, Response } from "express";
import { UserData } from "../repositories/userRepository.js";
import * as userServices from "../services/userServices.js";

export async function signup(req: Request, res: Response) {
    const user: UserData = req.body;

    await userServices.signup(user);

    res.sendStatus(201);
}

export async function signin(req: Request, res: Response) {
    const user: UserData = req.body;

    const token = await userServices.signin(user);

    res.send(token);
}

export async function getUserInfo(req: Request, res: Response) {
    const id: number = res.locals.tokenData.userId;

    const userInfo = await userServices.getUserInfo(id);

    res.send(userInfo);
}
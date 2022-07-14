import { Request, Response } from "express";
import { UserData } from "../repositories/userRepository.js";
import * as userServices from "../services/userServices.js";

export async function signup(req: Request, res: Response) {
    const user: UserData = req.body;

    await userServices.signup(user);

    res.sendStatus(201);
}

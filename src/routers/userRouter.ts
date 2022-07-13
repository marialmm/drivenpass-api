import {Router} from "express";

import * as userControllers from "../controllers/userControllers.js"

export const userRouter = Router();

userRouter.post("/signup", userControllers.signup);
import {Router} from "express";
import { userRouter } from "./userRouter.js";

export const router = Router();

router.use(userRouter);

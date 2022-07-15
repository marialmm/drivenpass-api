import {Router} from "express";
import { credentialRouter } from "./credentialRouter.js";
import { noteRouter } from "./noteRouter.js";
import { userRouter } from "./userRouter.js";

export const router = Router();

router.use(userRouter);
router.use(credentialRouter);
router.use(noteRouter);

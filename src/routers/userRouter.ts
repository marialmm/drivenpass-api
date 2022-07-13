import { Router } from "express";

import * as userControllers from "../controllers/userControllers.js";
import { validateJoi } from "../middlewares/joiValidationMiddleware.js";
import { signupSchema } from "../schemas/userSchemas.js";

export const userRouter = Router();

userRouter.post("/signup", validateJoi(signupSchema), userControllers.signup);

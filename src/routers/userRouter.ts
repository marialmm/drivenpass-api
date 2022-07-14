import { Router } from "express";

import * as userControllers from "../controllers/userControllers.js";
import { validateJoi } from "../middlewares/joiValidationMiddleware.js";
import { userSchema } from "../schemas/userSchemas.js";

export const userRouter = Router();

userRouter.post("/signup", validateJoi(userSchema), userControllers.signup);
userRouter.post("/signin", validateJoi(userSchema), userControllers.signin);

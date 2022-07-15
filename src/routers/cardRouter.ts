import { Router } from "express";
import { validateJoi } from "../middlewares/joiValidationMiddleware.js";
import { cardSchema } from "../schemas/cardSchema.js";

export const cardRouter = Router();

cardRouter.post("/card", validateJoi(cardSchema))
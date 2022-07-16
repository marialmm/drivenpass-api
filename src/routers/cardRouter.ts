import { Router } from "express";

import { validateJoi } from "../middlewares/joiValidationMiddleware.js";
import { cardSchema } from "../schemas/cardSchemas.js";
import * as cardControllers from "../controllers/cardControllers.js";

export const cardRouter = Router();

cardRouter.post("/card", validateJoi(cardSchema), cardControllers.create);
cardRouter.get("/cards", cardControllers.get);
cardRouter.get("/card/:id", cardControllers.getById);
cardRouter.delete("/card/:id", cardControllers.deleteById);
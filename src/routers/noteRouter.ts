import { Router } from "express";

import { validateJoi } from "../middlewares/joiValidationMiddleware.js";
import { noteSchema } from "../schemas/noteSchemas.js";
import * as noteControllers from "../controllers/noteControllers.js"

export const noteRouter = Router();

noteRouter.post("/securenote", validateJoi(noteSchema), noteControllers.create);
noteRouter.get("/securenotes", noteControllers.get);
noteRouter.get("/securenote/:id", noteControllers.getById);
noteRouter.delete("/securenote/:id", noteControllers.deleteById);
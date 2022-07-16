import { Router } from "express";

import * as documentControllers from "../controllers/documentControlles.js";
import { validateJoi } from "../middlewares/joiValidationMiddleware.js";
import { documentSchema } from "../schemas/documentSchemas.js";

export const documentRouter = Router();

documentRouter.post(
    "/document",
    validateJoi(documentSchema),
    documentControllers.create
);
documentRouter.get("/documents", documentControllers.get);
documentRouter.get("/document/:id", documentControllers.getById);

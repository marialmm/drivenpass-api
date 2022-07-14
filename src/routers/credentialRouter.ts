import { Router } from "express";
import { validateToken } from "../middlewares/authMiddleware.js";
import { validateJoi } from "../middlewares/joiValidationMiddleware.js";
import { credentialSchema } from "../schemas/credentialSchemas.js";
import * as credentialControllers from "../controllers/credentialControllers.js";

export const credentialRouter = Router();

credentialRouter.use(validateToken);

credentialRouter.post(
    "/credential",
    validateJoi(credentialSchema),
    credentialControllers.create
);

credentialRouter.get("/credentials", credentialControllers.get);

credentialRouter.get("/credential/:id", credentialControllers.getById);

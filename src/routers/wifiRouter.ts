import { Router } from "express";

import { validateJoi } from "../middlewares/joiValidationMiddleware.js";
import { wifiSchema } from "../schemas/wifiSchema.js";
import * as wifiControllers from "../controllers/wifiControllers.js";

export const wifiRouter = Router();

wifiRouter.post("/wifi", validateJoi(wifiSchema), wifiControllers.create);
wifiRouter.get("/wifi", wifiControllers.get);
wifiRouter.get("/wifi/:id", wifiControllers.getById);
wifiRouter.delete("/wifi/:id", wifiControllers.deleteById);

import { Wifi } from "@prisma/client";
import joi from "joi";

export const wifiSchema = joi.object<Wifi>({
    title: joi.string().required(),
    name: joi.string().required(),
    password: joi.string().required(),
});

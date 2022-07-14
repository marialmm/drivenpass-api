import { Credentials } from "@prisma/client";
import joi from "joi";

export const credentialSchema = joi.object<Credentials>({
    password: joi.string().required(),
    title: joi.string().required(),
    username: joi.string().required(),
    url: joi.string().uri().required()
})
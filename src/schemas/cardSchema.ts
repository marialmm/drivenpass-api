import { Cards } from "@prisma/client";
import joi from "joi";

export const cardSchema = joi.object<Cards>({
    number: joi
        .string()
        .pattern(/^[0-9]+$/)
        .required(),
    name: joi.string().required(),
    cvv: joi
        .string()
        .length(3)
        .pattern(/[0-9]{3}/)
        .required(),
    expirationDate: joi
        .string()
        .pattern(/^[0-9]{2}\/[0-9]{2}$/)
        .required(),
    password: joi.string().required(),
    isVirtual: joi.boolean().required(),
    type: joi.string().valid("credit", "debit", "both").required(),
    title: joi.string().required(),
});

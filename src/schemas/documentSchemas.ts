import { Documents } from "@prisma/client";
import joi from "joi";

export const documentSchema = joi.object<Documents>({
    fullName: joi.string().required(),
    emissionDate: joi.string().required(),
    issuingAgency: joi.string().required(),
    number: joi.string().required(),
    type: joi.string().valid("rg", "cnh").required(),
    title: joi.string().required(),
    validateDate: joi.string().required(),
});

import joi from "joi";
import { SecureNotes } from "@prisma/client";

export const noteSchema = joi.object<SecureNotes>({
    title: joi.string().max(50).required(),
    note: joi.string().max(1000).required(),
});

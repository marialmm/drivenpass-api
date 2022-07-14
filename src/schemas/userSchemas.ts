import joi from "joi";
import { Users } from "@prisma/client";

export const userSchema = joi.object<Users>({
    email: joi.string().email().required(),
    password: joi.string().min(10).required()
});
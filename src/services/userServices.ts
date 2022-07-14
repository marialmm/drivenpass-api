import bcrypt from "bcrypt";
import dotenv from "dotenv";

import * as userRepository from "../repositories/userRepository.js";

dotenv.config();

export async function signup(userData: userRepository.UserData) {
    const { email, password } = userData;

    await checkEmailIsAlreadyRegistered(email);

    const encryptedPassword = encryptPassword(password);

    await userRepository.create({ email, password: encryptedPassword });
}

async function checkEmailIsAlreadyRegistered(email: string) {
    const user = await userRepository.getByEmail(email);

    if (user) {
        throw {
            type: "conflict",
            message: "Email is already registered",
        };
    }
}

function encryptPassword(password: string) {
    const encryptedPassword = bcrypt.hashSync(password, +process.env.SALT);
    return encryptedPassword;
}

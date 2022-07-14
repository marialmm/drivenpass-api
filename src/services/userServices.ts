import * as userRepository from "../repositories/userRepositories";

export async function signup(userData: userRepository.UserData){
    await checkEmailIsAlreadyRegistered(userData.email);

    await userRepository.create(userData);
}

async function checkEmailIsAlreadyRegistered(email: string){
    const user = await userRepository.getByEmail(email);

    if(user){
        throw{
            type: "conflict",
            message: "Email is already registered"
        }
    }
}
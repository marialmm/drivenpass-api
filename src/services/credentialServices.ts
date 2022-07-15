import { Credentials } from "@prisma/client";
import * as credentialRepository from "../repositories/credentialRepository.js";
import * as dataUtils from "../utils/dataUtils.js";

export async function create(
    credentialData: credentialRepository.CreateCredentialData
) {
    const { title, password } = credentialData;

    await checkCredentialTitleExists(title);

    const encryptedPassword = dataUtils.encrypt(password);
    credentialData.password = encryptedPassword;

    await credentialRepository.create(credentialData);
}

async function checkCredentialTitleExists(title: string) {
    const credential = await credentialRepository.getByTitle(title);

    if (credential) {
        throw {
            type: "conflict",
            message: "Title already exists",
        };
    }
}

export async function get(userId: number) {
    const credentials = await credentialRepository.get(userId);

    return credentials;
}

export async function getById(userId: number, id: number) {
    const credential = await credentialRepository.getById(id);

    if(!credential){
        throw{
            type: "notFound",
            message: "Credential does not exist"
        }
    }

    dataUtils.checkIfDataBelongsToUser(credential.userId, userId, "Credential");

    credential.password = dataUtils.decrypt(credential.password);

    delete credential.userId;

    return credential;
}


export async function deleteById(userId: number, id: number) {
    const credential = await credentialRepository.getById(id);

    if(!credential){
        throw{
            type: "notFound",
            message: "Credential does not exist"
        }
    }

    dataUtils.checkIfDataBelongsToUser(credential.userId, userId, "Credential");

    await credentialRepository.deleteById(id);
}

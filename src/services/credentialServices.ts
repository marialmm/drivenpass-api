import * as credentialRepository from "../repositories/credentialRepository.js";
import * as dataUtils from "../utils/dataUtils.js";

export async function create(
    credentialData: credentialRepository.CreateCredentialData
) {
    const { title, password } = credentialData;

    await checkTitleExists(title);

    const encryptedPassword = dataUtils.encrypt(password);
    credentialData.password = encryptedPassword;

    await credentialRepository.create(credentialData);
}

async function checkTitleExists(title: string) {
    const credential = await credentialRepository.getByTitle(title);

    if (credential) {
        throw {
            type: "conflict",
            message: "Title already exists",
        };
    }
}

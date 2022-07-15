import * as noteRepository from "../repositories/noteRepository.js";

export async function create(
    secureNoteData: noteRepository.CreateSecureNoteData
) {
    const { title } = secureNoteData;

    await checkNoteTitleExists(title);

    await noteRepository.create(secureNoteData);
}

async function checkNoteTitleExists(title: string) {
    const credential = await noteRepository.getByTitle(title);

    if (credential) {
        throw {
            type: "conflict",
            message: "Title already exists",
        };
    }
}

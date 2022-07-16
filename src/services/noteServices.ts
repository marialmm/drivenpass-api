import * as noteRepository from "../repositories/noteRepository.js";
import * as dataUtils from "../utils/dataUtils.js";

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

export async function get(userId: number) {
    const notes = await noteRepository.get(userId);

    return notes;
}

export async function getById(userId: number, id: number) {
    const note = await noteRepository.getById(id);

    if (!note) {
        throw {
            type: "notFound",
            message: "Secure note not found",
        };
    }

    dataUtils.checkIfDataBelongsToUser(note.userId, userId, "Secure note");

    delete note.userId;

    return note;
}

export async function deleteById(userId: number, id: number) {
    const note = await noteRepository.getById(id);

    if (!note) {
        throw {
            type: "notFound",
            message: "Note not found",
        };
    }

    dataUtils.checkIfDataBelongsToUser(note.userId, userId, "Secure note");

    await noteRepository.deleteById(id);
}

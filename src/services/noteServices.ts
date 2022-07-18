import * as noteRepository from "../repositories/noteRepository.js";
import * as dataUtils from "../utils/dataUtils.js";

export async function create(
    secureNoteData: noteRepository.CreateSecureNoteData
) {
    const { title, userId } = secureNoteData;

    await checkNoteTitleExists(title, userId);

    await noteRepository.create(secureNoteData);
}

async function checkNoteTitleExists(title: string, userId: number) {
    const note = await noteRepository.getByTitle(title);

    if (note && note.userId === userId) {
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

import { SecureNotes } from "@prisma/client";

import { prisma } from "../config/database.js";

export type CreateSecureNoteData = Omit<SecureNotes, "id">;

export async function create(secureNoteData: CreateSecureNoteData) {
    await prisma.secureNotes.create({
        data: secureNoteData,
    });
}

export async function getByTitle(title: string) {
    const secureNote = await prisma.secureNotes.findFirst({
        where: { title },
    });

    return secureNote;
}

export async function get(userId: number) {
    const notes = await prisma.secureNotes.findMany({
        where: { userId },
        select: {
            id: true,
            title: true,
        },
    });

    return notes;
}

export async function getById(id: number) {
    const note = await prisma.secureNotes.findFirst({
        where: { id },
        // select: {
        //     id: true,
        //     title: true,
        //     note: true,
        //     userId: true
        // }
    });

    return note;
}

export async function deleteById(id: number) {
    await prisma.secureNotes.delete({
        where: {id}
    });
}

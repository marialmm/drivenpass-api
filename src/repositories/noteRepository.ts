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

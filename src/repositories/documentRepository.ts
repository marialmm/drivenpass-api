import { Documents } from "@prisma/client";
import { prisma } from "../config/database.js";

export type CreateDocumentData = Omit<Documents, "id">;

export async function create(documentData: CreateDocumentData) {
    await prisma.documents.create({
        data: documentData,
    });
}

export async function getByTitle(title: string) {
    const document = await prisma.documents.findFirst({
        where: { title },
    });

    return document
}

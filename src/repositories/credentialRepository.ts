import { Credentials } from "@prisma/client";

import { prisma } from "../config/database.js";

export type CreateCredentialData = Omit<Credentials, "id">;

export async function create(credentialData: CreateCredentialData) {
    await prisma.credentials.create({
        data: credentialData
    })
}

export async function getByTitle(title: string) {
    const credential = await prisma.credentials.findFirst({
        where: { title },
    });

    return credential;
}

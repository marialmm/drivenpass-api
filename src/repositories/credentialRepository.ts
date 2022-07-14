import { Credentials } from "@prisma/client";

import { prisma } from "../config/database.js";

export type CreateCredentialData = Omit<Credentials, "id">;

export async function create(credentialData: CreateCredentialData) {
    await prisma.credentials.create({
        data: credentialData,
    });
}

export async function getByTitle(title: string) {
    const credential = await prisma.credentials.findFirst({
        where: { title },
    });

    return credential;
}

export async function get(userId: number) {
    const credentials = await prisma.credentials.findMany({
        where: { userId },
        select: { id: true, title: true },
    });
    return credentials;
}

export async function getById(id: number) {
    const credential = await prisma.credentials.findFirst({
        where: { id },
        select: {
            id: true,
            password: true,
            title: true,
            url: true,
            username: true,
            userId: true
        },
    });

    return credential;
}

export async function deleteById(id: number) {
    await prisma.credentials.delete({
        where: {id}
    })
}

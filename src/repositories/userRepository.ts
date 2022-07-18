import { Users } from "@prisma/client";
import { prisma } from "../config/database.js";

export type UserData = Omit<Users, "id">;

export async function create(userData: UserData) {
    await prisma.users.create({
        data: userData,
    });
}

export async function getByEmail(email: string) {
    const user = await prisma.users.findFirst({
        where: { email },
    });

    return user;
}

export async function getById(id: number) {
    const user = await prisma.users.findUnique({
        where: { id },
    });

    return user;
}

export async function getInfo(id: number) {
    const userInfo = await prisma.users.findFirst({
        where: { id },
        include: {
            _count: {
                select: {
                    cards: true,
                    credentials: true,
                    documents: true,
                    secureNotes: true,
                    wifi: true,
                },
            },
        },
    });

    return userInfo;
}

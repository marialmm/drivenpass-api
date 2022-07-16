import { Wifi } from "@prisma/client";

import { prisma } from "../config/database.js";

export type CreateWifiData = Omit<Wifi, "id">;

export async function create(wifiData: CreateWifiData) {
    await prisma.wifi.create({
        data: wifiData,
    });
}

export async function getByTitle(title: string) {
    const wifi = await prisma.wifi.findFirst({
        where: { title },
    });

    return wifi;
}

export async function get(userId: number) {
    const wifi = await prisma.wifi.findMany({
        where: { userId },
        select: {
            id: true,
            title: true,
        },
    });

    return wifi;
}

export async function getById(id: number) {
    const wifi = await prisma.wifi.findFirst({
        where: {id}
    });

    return wifi;
}
import { Wifi } from "@prisma/client";

import { prisma } from "../config/database.js";

export type CreateWifiData = Omit<Wifi, "id">;

export async function create(wifiData: CreateWifiData) {
    await prisma.wifi.create({
        data: wifiData,
    });
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
        where: { id },
    });

    return wifi;
}

export async function deleteById(id: number) {
    await prisma.wifi.delete({
        where: { id },
    });
}

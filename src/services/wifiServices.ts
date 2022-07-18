import * as wifiRepository from "../repositories/wifiRepository.js";
import * as dataUtils from "../utils/dataUtils.js";

export async function create(wifiData: wifiRepository.CreateWifiData) {
    wifiData.password = dataUtils.encrypt(wifiData.password);

    await wifiRepository.create(wifiData);
}

export async function get(userId: number) {
    const wifi = await wifiRepository.get(userId);

    return wifi;
}

export async function getById(userId: number, id: number) {
    const wifi = await wifiRepository.getById(id);

    if (!wifi) {
        throw {
            type: "notFound",
            message: "Wifi not found",
        };
    }

    dataUtils.checkIfDataBelongsToUser(wifi.userId, userId, "Wifi");
    wifi.password = dataUtils.decrypt(wifi.password);

    return wifi;
}

export async function deleteById(userId: number, id: number) {
    const wifi = await wifiRepository.getById(id);

    if (!wifi) {
        throw {
            type: "notFound",
            message: "Wifi not found",
        };
    }

    dataUtils.checkIfDataBelongsToUser(wifi.userId, userId, "Wifi");

    await wifiRepository.deleteById(id);
}

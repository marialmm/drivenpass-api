import * as wifiRepository from "../repositories/wifiRepository.js";
import * as dataUtils from "../utils/dataUtils.js";

export async function create(wifiData: wifiRepository.CreateWifiData) {
    const { title } = wifiData;

    await checkWifiTitleExists(title);

    wifiData.password = dataUtils.encrypt(wifiData.password);

    await wifiRepository.create(wifiData);
}

async function checkWifiTitleExists(title: string) {
    const wifi = await wifiRepository.getByTitle(title);

    if (wifi) {
        throw {
            type: "conflict",
            message: "Title already exists",
        };
    }
}
import * as cardRepository from "../repositories/cardRespository.js";
import * as dataUtils from "../utils/dataUtils.js"

export async function create(cardData: cardRepository.CreateCardData){
    const {title, password, cvv} = cardData;

    await checkCardTitleExists(title);

    cardData.password = dataUtils.encrypt(password);
    cardData.cvv = dataUtils.encrypt(cvv);

    await cardRepository.create(cardData);
}

async function checkCardTitleExists(title: string) {
    const card = await cardRepository.getByTitle(title);

    if(card){
        throw {
            type: "conflict",
            message: "Title already exists"
        }
    }
}

export async function get(userId: number){
    const cards = await cardRepository.get(userId);

    return cards
}
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

export async function getById(userId: number, id: number){
    const card = await cardRepository.getById(id);

    if(!card){
        throw {
            type: "notFound",
            message: "Card not found"
        }
    }

    dataUtils.checkIfDataBelongsToUser(card.userId, userId, "Card");

    card.password = dataUtils.decrypt(card.password);
    card.cvv = dataUtils.decrypt(card.cvv);

    delete card.userId;

    return card;
}
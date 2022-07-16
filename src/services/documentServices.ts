import * as documentRepository from "../repositories/documentRepository.js";
import * as dataUtils from "../utils/dataUtils.js";

export async function create(
    documentData: documentRepository.CreateDocumentData
) {
    const { title } = documentData;

    await checkDocumentTitleExists(title);

    await documentRepository.create(documentData);
}

async function checkDocumentTitleExists(title: string) {
    const document = await documentRepository.getByTitle(title);

    if (document) {
        throw {
            type: "conflict",
            message: "Title already exists",
        };
    }
}

export async function get(userId: number) {
    const documents = await documentRepository.get(userId);

    return documents;
}

export async function getById(userId: number, id: number) {
    const document = await documentRepository.getById(id);

    if (!document) {
        throw {
            type: "notFound",
            message: "Document not found",
        };
    }

    dataUtils.checkIfDataBelongsToUser(document.userId, userId, "Document");

    delete document.userId;

    return document;
}

export async function deleteById(userId: number, id: number) {
    const document = await documentRepository.getById(id);

    if (!document) {
        throw {
            type: "notFound",
            message: "Document not found",
        };
    }

    dataUtils.checkIfDataBelongsToUser(document.userId, userId, "Document");

    await documentRepository.deleteById(id);
}

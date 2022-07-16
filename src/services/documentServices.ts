import * as documentRepository from "../repositories/documentRepository.js";

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

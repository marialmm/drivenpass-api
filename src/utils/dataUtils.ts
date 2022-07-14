import Crypt from "cryptr";
import dotenv from "dotenv";

dotenv.config();

export function encrypt(data: string){
    const secret = process.env.CRYPTR_SECRET_KEY;
    const cryptr = new Crypt(secret);
    
    const encryptedData = cryptr.encrypt(data);
    return encryptedData;
}

export function decrypt(data: string){
    const secret = process.env.CRYPTR_SECRET_KEY;
    const cryptr = new Crypt(secret);

    const decryptedData = cryptr.decrypt(data);
    return decryptedData;
}
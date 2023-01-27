import { AES } from "crypto-js";

async function encryptPasswordForFullIn(plainPassword: string, requestKey: string) {
    const encrypted = AES.encrypt(plainPassword, requestKey);
    return encrypted.toString();
}

export { encryptPasswordForFullIn };

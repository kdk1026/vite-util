import CryptoJS from "crypto-js";

const secretKey = import.meta.env.VITE_AES_SECRET_KEY;
const iv = import.meta.env.VITE_AES_IV;

/**
 * @param {string} text 
 * @returns 
 */
export const encrypt = (text) => {
    const cipher = CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(secretKey), {
        iv: CryptoJS.enc.Utf8.parse(iv),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC,
    });
    return cipher.toString();
}

/**
 * @param {string} encryptedText 
 * @returns 
 */
export const decrypt = (encryptedText) => {
    const decipher = CryptoJS.AES.decrypt(encryptedText, CryptoJS.enc.Utf8.parse(secretKey), {
        iv: CryptoJS.enc.Utf8.parse(iv),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC,
    })
    return decipher.toString(CryptoJS.enc.Utf8);
}
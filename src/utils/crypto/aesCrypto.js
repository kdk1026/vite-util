import CryptoJS from "crypto-js";

const secretKey = import.meta.env.VITE_AES_SECRET_KEY;

/**
 * AES 암호화
 * @param {string} text 
 * @returns {{encryptedText: string, iv: string}} - 암호화된 텍스트와 IV (모두 Base64 인코딩)
 */
export const encrypt = (text) => {
    if ( !text || !text.trim() ) {
        console.warn("암호화할 텍스트가 비어 있습니다.");
        return {};
    } else if ( typeof text !== 'string' ) {
        console.error("암호화할 텍스트는 문자열이어야 합니다.");
        return {};
    }

    const iv = CryptoJS.lib.WordArray.random(16);

    const cipher = CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(secretKey), {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC,
    });
    return {
        encryptedText: cipher.toString(),
        iv: iv.toString(CryptoJS.enc.Base64)
    }
}

/**
 * AES 복호화
 * @param {string} encryptedText 
 * @param {string} ivStringBase64
 * @returns 
 */
export const decrypt = (encryptedText, ivStringBase64) => {
    if ( !encryptedText?.trim() ) {
        console.warn("복호화할 암호문이 비어 있습니다.");
        return "";
    } else if ( typeof encryptedText !== 'string' ) {
        console.error("복호화할 암호문은 문자열이어야 합니다.");
        return "";
    }

    if ( !ivStringBase64?.trim() ) {
        console.warn("복호화할 IV가 비어 있습니다.");
        return "";
    } else if ( typeof ivStringBase64 !== 'string' ) {
        console.error("복호화할 IV는 문자열이어야 합니다.");
        return "";
    }

    const iv = CryptoJS.enc.Base64.parse(ivStringBase64);

    const decipher = CryptoJS.AES.decrypt(encryptedText, CryptoJS.enc.Utf8.parse(secretKey), {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC,
    })
    return decipher.toString(CryptoJS.enc.Utf8);
}
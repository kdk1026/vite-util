import CryptoJS from "crypto-js";

/**
 * MD5 해싱 함수
 * @param {string} text 
 * @returns 
 */
export const hashMd5 = (text) => {
    if ( typeof text !== "string" || !text?.trim() ) {
        console.warn("유효한 텍스트가 제공되지 않았습니다.");   
        return null;
    }

    const hashed = CryptoJS.MD5(text);
    return hashed.toString(CryptoJS.enc.Hex);
};

/**
 * MD5 해싱 함수 (Salt 포함)
 * @param {string} text 
 * @param {string} salt 
 * @returns 
 */
export const hashMd5WithSalt = (text, salt = '') => {
    if ( typeof text !== "string" || !text?.trim() ) {
        console.warn("유효한 텍스트가 제공되지 않았습니다.");
        return null;
    }

    if ( typeof salt !== "string" ) {
        console.error("제공된 Salt는 문자열이 아닙니다.");
        return null;
    }

    const textWithSalt = text + salt; // 또는 salt + text;

    const hashed = CryptoJS.MD5(textWithSalt);
    return hashed.toString(CryptoJS.enc.Hex);
};

/**
 * SHA-256 해싱 함수
 * @param {string} text 
 * @returns 
 */
export const hashSha256 = (text) => {
    if ( typeof text !== "string" || !text?.trim() ) {
        console.warn("유효한 텍스트가 제공되지 않았습니다.");   
        return null;
    }

    const hashed = CryptoJS.SHA256(text);
    return hashed.toString(CryptoJS.enc.Hex);
};

/**
 * SHA-256 해싱 함수 (Salt 포함)
 * @param {string} text 
 * @param {string} salt 
 * @returns 
 */
export const hashSha256WithSalt = (text, salt = '') => {
    if ( typeof text !== "string" || !text?.trim() ) {
        console.warn("유효한 텍스트가 제공되지 않았습니다.");
        return null;
    }

    if ( typeof salt !== "string" ) {
        console.error("제공된 Salt는 문자열이 아닙니다.");
        return null;
    }

    const textWithSalt = text + salt; // 또는 salt + text;

    const hashed = CryptoJS.SHA256(textWithSalt);
    return hashed.toString(CryptoJS.enc.Hex);
};

/**
 * SHA-512 해싱 함수
 * @param {string} text 
 * @returns 
 */
export const hashSha512 = (text) => {
    if ( typeof text !== "string" || !text?.trim() ) {
        console.warn("유효한 텍스트가 제공되지 않았습니다.");   
        return null;
    }

    const hashed = CryptoJS.SHA512(text);
    return hashed.toString(CryptoJS.enc.Hex);
};

/**
 * SHA-512 해싱 함수 (Salt 포함)
 * @param {string} text 
 * @param {string} salt 
 * @returns 
 */
export const hashSha512WithSalt = (text, salt = '') => {
    if ( typeof text !== "string" || !text?.trim() ) {
        console.warn("유효한 텍스트가 제공되지 않았습니다.");
        return null;
    }

    if ( typeof salt !== "string" ) {
        console.error("제공된 Salt는 문자열이 아닙니다.");
        return null;
    }

    const textWithSalt = text + salt; // 또는 salt + text;

    const hashed = CryptoJS.SHA512(textWithSalt);
    return hashed.toString(CryptoJS.enc.Hex);
};
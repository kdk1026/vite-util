import CryptoJS from "crypto-js";

/**
 * @param {string} text 
 * @returns 
 */
export const hashMd5 = (text) => {
    return CryptoJS.MD5(text);
};
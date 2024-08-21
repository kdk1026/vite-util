import CryptoJS from "crypto-js";

export const hashMd5 = (text) => {
    return CryptoJS.MD5(text);
};
/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.02.28
 * @version 1.0
 */

import CryptoJS from "crypto-js";

const rawKey = sessionStorage.getItem('dataKey');
const secretKey = rawKey ? rawKey.substring(18) : null;

const rawIv = sessionStorage.getItem('dataParam');
const iv = rawIv ? rawIv.substring(18) : null;

/**
 * AES 암호화
 * @param {string} text 
 * @returns {{encryptedText: string, iv: string}} - 암호화된 텍스트와 IV (모두 Base64 인코딩)
 */
export const encrypt = (text) => {
    if ( typeof text !== 'string' || !text?.trim() ) {
        console.error("암호화할 텍스트는 유효한 문자열이어야 합니다.");
        return { encryptedText: '', iv: '' };
    }

    const ivParam = iv || CryptoJS.lib.WordArray.random(16);

    const cipher = CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(secretKey), {
        iv: ivParam,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC,
    });
    return {
        encryptedText: cipher.toString(),
        iv: ivParam.toString(CryptoJS.enc.Base64)
    }
}

/**
 * AES 복호화
 * @param {string} encryptedText 
 * @param {null|string} ivStr
 * @param {boolean} isBase64Iv
 * @returns 
 */
export const decrypt = (encryptedText, ivStr, isBase64Iv) => {
    if ( typeof encryptedText !== 'string' || !encryptedText?.trim() ) {
        console.error("복호화할 암호문은 유효한 문자열이어야 합니다.");
        return '';
    }

    let ivParam;
    if ( ivStr && typeof ivStr === 'string' && ivStr.trim() && isBase64Iv ) {
        ivParam = CryptoJS.enc.Base64.parse(ivStr);
    } else {
        ivParam = iv;
    }

    const decipher = CryptoJS.AES.decrypt(encryptedText, CryptoJS.enc.Utf8.parse(secretKey), {
        iv: ivParam,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC,
    })

    try {
        return decipher.toString(CryptoJS.enc.Utf8);
    } catch (e) {
        console.error("복호화에 실패했습니다.", e);
        return '';
    }
}
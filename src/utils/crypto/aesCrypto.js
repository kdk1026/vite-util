/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.02.28
 * @version 1.2
 * @description 매개변수 3개부터는 RORO 패턴 적용
 * @description iv 고정 제거
 * @description 과거 권장, 현재 비권장
 */

import CryptoJS from "crypto-js";

const validateString = (value, name) => {
    if ( typeof value !== 'string' || !value?.trim() ) {
        console.error(`${name}는 유효한 문자열이어야 합니다.`);
        return false;
    }
    return true;
};

/**
 * AES 암호화
 * @param {string} plaintext
 * @param {string} b64Key
 * @returns {{cipherText: string, iv: string}} - 암호화된 텍스트와 IV (모두 Base64 인코딩)
 */
export const encrypt = (plaintext, b64Key) => {
    if ( !validateString(plaintext, 'plaintext') ) return '';

    const ivWordArray = CryptoJS.lib.WordArray.random(16);

    const cipher = CryptoJS.AES.encrypt(plaintext, CryptoJS.enc.Utf8.parse(b64Key), {
        iv: ivWordArray,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC,
    });
    
    return {
        cipherText: cipher.toString(),
        iv: CryptoJS.enc.Base64.stringify(ivWordArray)
    }
}

/**
 * AES 복호화
 * * @param {object} options
 * @param {string} options.b64Key
 * @param {string} options.b64Iv
 * @param {string} options.b64CipherText
 * @returns 
 */
export const decrypt = ({b64Key, b64Iv, b64CipherText} = {}) => {
    if ( !validateString(b64Key, 'b64Key') ) return '';
    if ( !validateString(b64Iv, 'b64Iv') ) return '';
    if ( !validateString(b64CipherText, 'b64CipherText') ) return '';

    let iv;
    if ( b64Iv && typeof ivStr === 'string' && b64Iv.trim() ) {
        iv = CryptoJS.enc.Base64.parse(b64Iv).toString(CryptoJS.enc.Utf8);
    }

    const ivWordArray = CryptoJS.enc.Utf8.parse(iv);

    const decipher = CryptoJS.AES.decrypt(b64CipherText, CryptoJS.enc.Utf8.parse(b64Key), {
        iv: ivWordArray,
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
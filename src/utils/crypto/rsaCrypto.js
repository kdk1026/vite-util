import JSEncrypt from "jsencrypt";

const base64PublicKey = import.meta.env.VITE_RSA_BASE64_PUBLIC_KEY;

const crypt = new JSEncrypt({ default_key_size: 2048 });

/**
 * RSA 암호화
 * @param {string} text 
 * @returns 
 */
export const rsaEncrypt = (text) => {
    if ( typeof text !== 'string' || !text?.trim() ) {
        console.error("암호화할 텍스트는 유효한 문자열이어야 합니다.");
        return '';
    }

    crypt.setPublicKey(base64PublicKey);
    return crypt.encrypt(text);
};

// Front 에서는 암호화만 해서 전송만 한다.
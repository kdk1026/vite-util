import JSEncrypt from "jsencrypt";

const base64PublicKey = import.meta.env.VITE_RSA_BASE64_PUBLIC_KEY;

const crypt = new JSEncrypt({ default_key_size: 2048 });

/**
 * RSA 암호화
 * @param {string} text 
 * @returns 
 */
export const rsaEncrypt = (text) => {
    if ( !text || !text.trim() ) {
        console.warn("rsaEncrypt: text is empty or undefined");
        return null;
    } else if (typeof text !== "string") {
        console.warn("rsaEncrypt: text must be a string");
        return null;
    }

    crypt.setPublicKey(base64PublicKey);
    return crypt.encrypt(text);
};

// Front 에서는 암호화만 해서 전송만 한다.
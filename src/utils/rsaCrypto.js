import JSEncrypt from "jsencrypt";

const base64PublicKey = import.meta.env.VITE_RSA_BASE64_PUBLIC_KEY;

const crypt = new JSEncrypt({ default_key_size: 2048 });

/**
 * @param {*} text 
 * @returns 
 */
export const rsaEncrypt = (text) => {
    crypt.setPublicKey(base64PublicKey);
    return crypt.encrypt(text);
};

// Front 에서는 암호화만 해서 전송만 한다.
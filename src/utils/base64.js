/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.05.30
 * @version 1.0
 */

/**
 * 순수 아스키 문자열 Base64 인코딩
 * @param {string} str 
 * @returns 
 */
export const encodeBase64 = (str) => {
    if ( typeof str !== 'string' || !str?.trim() ) {
        return '';
    }

    return btoa(str);
};

/**
 * 순수 아스키 문자열 Base64 디코딩
 * @param {string} str 
 * @returns 
 */
export const decodeBase64 = (str) => {
    if ( typeof str !== 'string' || !str?.trim() ) {
        return '';
    }

    return atob(str);        
};

/**
 * 유니코드 (한글 포함) Base64 인코딩
 * @param {string} str 
 * @returns 
 */
export const encodeUnicodeBase64 = (str) => {
    if ( typeof str !== 'string' || !str?.trim() ) {
        return '';
    }

    // 유니코드를 UTF-8 URL 인코딩 (퍼센트 인코딩) -> 이스케이프 시퀀스 -> 이진 문자열 -> Base64
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(p1) {
            return String.fromCharCode('0x' + p1);
        }));
};

/**
 * 유니코드 (한글 포함) Base64 디코딩
 * @param {string} str 
 */
export const decodeUnicodeBase64 = (str) => {
    if ( typeof str !== 'string' || !str?.trim() ) {
        return '';
    }

    // Base64 -> 이진 문자열 -> 이스케이프 시퀀스 -> UTF-8 URL 디코딩 -> 유니코드
    return decodeURIComponent(atob(str).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
};

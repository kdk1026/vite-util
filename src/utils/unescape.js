/*
    html-entities 설치
    - decode 사용
    - 설치 불가능할 경우, 케이스 추가해서 사용
*/

const regex = /&(quot|amp|lt|gt|#39);/g;
const chars = {
    '&quot;': '"',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&#39;': "'",
}

/**
 * @param {string} str 
 * @returns 
 */
export const unescapeHtml = (str) => {
    if ( !str || !str.trim() ) {
        console.warn('unescapeHtml: str is empty');
        return null;
    } else if (typeof str !== 'string') {
        console.warn('unescapeHtml: str is not a string');
        return null;
    }

    if ( regex.test(str) ) {
        return str.replace(regex, (matched) => chars[matched] || matched);
    }
};
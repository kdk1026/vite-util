/*
    html-entities 설치
    - decode 사용
    - 설치 불가능할 경우, 케이스 추가해서 사용
*/

const regex = /&(quot|amp|lt|gt|#39);/g;
const chars = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#x27;': "'",
    '&#39;': "'",
    '&#x2F;': '/'
}

/**
 * @param {string} str 
 * @returns 
 */
export const unescapeHtml = (str) => {
    if (typeof val !== 'string') {
        return '';
    }

    if ( regex.test(str) ) {
        return str.replace(regex, (matched) => chars[matched] || matched);
    }
};
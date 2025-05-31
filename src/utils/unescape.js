/*
    html-entities 설치
    - decode 사용
    - 설치 불가능할 경우, 케이스 추가해서 사용
*/

const replacements = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#x27;': "'",
    '&#39;': "'",
    '&#x2F;': '/'
}

/**
 * HTML Unescape 처리
 * @param {string} val 
 * @returns 
 */
export const unescapeHtml = (val) => {
    if (typeof val !== 'string') {
        return '';
    }

    return val.replace(/&amp;|&lt;|&gt;|&quot;|&#x27;|&#39;|&#x2F;/g, (entity) => replacements[entity]);
};
/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.02.28
 * @version 1.0
 * @description
 * - html-entities 설치하여 decode 사용 권장
 * - 설치 불가능할 경우, 케이스 추가해서 사용
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
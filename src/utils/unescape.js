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
export const unescapeHtml = (str) => {
    if ( regex.test(str) ) {
        return str.replace(regex, (matched) => chars[matched] || matched);
    }
};
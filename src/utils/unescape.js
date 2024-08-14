// https://buly.kr/AlipToT

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
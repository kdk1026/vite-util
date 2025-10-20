/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.02.28
 * @version 1.0
 */

import dayjs from "dayjs";

/**
 * null 체크
 * - ( !val ) 으로 체크 가능
 * @param {*} val 
 * @returns 
 */
export const isNull = (val) => {
    return typeof val == 'undefined' || val === null || val === '';
};

/**
 * 공백, 빈 문자열 체크
 * - ( val.trim() ) 으로 체크 가능
 * @param {*} val 
 * @returns 
 */
export const isBlank = (val) => {
    return (val && val.replace(/ /gi, '') === '');
};

/**
 * undefined 체크 ('undefined' 포함)
 * @param {*} val 
 * @returns 
 */
export const isUndefined = (val) => {
    return (typeof val === 'undefined' || val === null || val === '');
};

/**
 * 숫자 체크
 * @param {*} val 
 * @returns 
 */
export const isNumber = (val) => {
    if (val === null || typeof val === 'undefined') {
        return false;
    }

    if (typeof val === 'number') {
        return !isNaN(val) && isFinite(val);
    } else if (typeof val === 'string') {
        return /^\d+$/.test(val);
    } else {
        return false;
    }
};

/**
 * 영문 체크
 * @param {*} val 
 * @returns 
 */
export const isEnglish = (val) => {
    if ( typeof val !== 'string' || !val?.trim() ) {
        console.error('val is empty or null.');
        return false;
    }

    return /^[a-zA-Z]+$/.test(val);
};

/**
 * 영문, 공백 체크
 * @param {string} val 
 * @returns 
 */
export const isEngBlank = (val) => {
    if ( typeof val !== 'string' || !val?.trim() ) {
        console.error('val is empty or null.');
        return false;
    }

    return /^[a-zA-Z\s]+$/.test(val);
};

/**
 * 영문, 숫자 체크
 * @param {string} val 
 * @returns 
 */
export const isEngNum = (val) => {
    if ( typeof val !== 'string' || !val?.trim() ) {
        console.error('val is empty or null.');
        return false;
    }

    return /^[a-zA-Z0-9]+$/.test(val);
};

/**
 * 한글 체크
 * @param {string} val 
 */
export const isHangul = (val) => {
    if ( typeof val !== 'string' || !val?.trim() ) {
        console.error('val is empty or null.');
        return false;
    }

    return /^[가-힣]+$/.test(val);
};

/**
 * 한글, 공백 체크
 * @param {string} val 
 * @returns 
 */
export const isHanBlank = (val) => {
    if ( typeof val !== 'string' || !val?.trim() ) {
        console.error('val is empty or null.');
        return false;
    }

    return /^[가-힣\s]+$/.test(val);
};

/**
 * 한글, 영문 체크
 * @param {string} val 
 * @returns 
 */
export const isHanEng = (val) => {
    if ( typeof val !== 'string' || !val?.trim() ) {
        console.error('val is empty or null.');
        return false;
    }

    return /^[가-힣a-zA-Z]+$/.test(val);
};

/**
 * 문자열에 특수문자(알파벳, 숫자, 언더스코어(_)를 제외한 문자)가 포함되어 있는지 체크
 * @param {string} val 
 * @returns 
 */
export const isSpecial = (val) => {
    if ( typeof val !== 'string' || !val?.trim() ) {
        console.error('val is empty or null.');
        return false;
    }

    return /\W+$/.test(val);
};

/**
 * 공백 체크
 * @param {string} val 
 * @returns 
 */
export const checkSpace = (val) => {
    if ( typeof val !== 'string' || !val?.trim() ) {
        console.error('val is empty or null.');
        return false;
    }

    return /\s/.test(val);
};

/**
 * 한글이 전혀 포함되어 있지 않은지 체크
 * @param {string} val 
 * @returns 
 */
export const isNotHangul = (val) => {
    if ( typeof val !== 'string' || !val?.trim() ) {
        console.error('val is empty or null.');
        return false;
    }

    return /^[^가-힣]+$/.test(val);
};

/**
 * 문자열 길이 최소/최대 길이 준수 여부
 * @param {string} val 
 * @param {number} minLen 
 * @param {number} maxLen 
 * @returns 
 */
export const isLengthOver = (val, minLen, maxLen) => {
    if ( typeof val !== 'string' || !val?.trim() ) {
        console.error('val is empty or null.');
        return false;
    }

    if ( typeof minLen !== 'number' || typeof maxLen !== 'number' ) {
        console.error('minLen or maxLen is not a number.');
        return false;
    }

    if ( minLen < 0 || maxLen < 0 || minLen > maxLen ) {
        console.error('minLen or maxLen is invalid.');
    }

    const valLen = val.length;
    return (valLen < minLen || valLen > maxLen);
};

/**
 * Object가 비어있는지 체크
 * @param {Object} param 
 * @returns 
 */
export const isEmptyObject = (param) => {
    return Object.keys(param).length === 0 && param.constructor === Object;
};

/**
 * Array가 비어있는지 체크
 * @param {Array} param 
 * @returns 
 */
export const isEmptyArray = (param) => {
    return Object.keys(param).length === 0 && param.constructor === Array;
};

/**
 * URL 체크
 * @param {string} val 
 * @returns 
 */
export const isSafeUrl = (val) => {
    try {
        // 절대 URL 검사
        const url = new URL(val);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (e) {
        console.error('Not an absolute URL, checking for relative path.', e);
        // 상대 경로 검사
        return val === '/' || val.startsWith('/');
    }
};

/**
 * 이메일 형식 체크
 * @param {string} val 
 * @returns 
 */
export const isEmail = (val) => {
    if ( typeof val !== 'string' || !val?.trim() ) {
        console.error('val is empty or null.');
        return false;
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    return emailRegex.test(val);
};

/**
 * 전화번호 형식 체크 (휴대폰 번호 제외)
 * @param {string} val 
 * @returns 
 */
export const isPhoneNum = (val) => {
    if ( typeof val !== 'string' || !val?.trim() ) {
        console.error('val is empty or null.');
        return false;
    }

    const phoneRegex = /^(02|03[1-3]|04[1-4]|05[1-5]|06[1-4])-?(\d{3,4})-?(\d{4})|^(070|050[2-7])-?(\d{4})-?(\d{4})|^(15|16|18)\d{2}-?(\d{4})$/;

    return phoneRegex.test(val);
};

/**
 * 휴대폰 번호 형식 체크
 * @param {string} val 
 * @returns 
 */
export const isCellPhoneNum = (val) => {
    if ( typeof val !== 'string' || !val?.trim() ) {
        console.error('val is empty or null.');
        return false;
    }

    const cellPhoneRegex = /^010-?\d{4}-?\d{4}$/;

    return cellPhoneRegex.test(val);
};

/**
 * 사업자 등록번호 형식 체크 (대한민국 3-2-5 또는 10자리 숫자 형식)
 * 하이픈(-) 유무에 관계없이 유효성을 검사합니다.
 * 예: "123-45-67890", "1234567890" 모두 유효합니다.
 * 
 * @param {string} val 
 * @returns 
 */
export const isCompanyRegNum = (val) => {
    if ( typeof val !== 'string' || !val?.trim() ) {
        console.error('val is empty or null.');
        return false;
    }

    const companyRegNumRegex = /^\d{3}-?\d{2}-?\d{5}$/;

    return companyRegNumRegex.test(val);
};

/**
 * YYYYMMDD 형식 체크
 *  - 윤년이나 월별 일수를 모두 고려하여 정확하게 날짜를 파싱하고 검증
 * @param {string} val 
 * @returns 
 */
export const isYYYYMMDD = (val) => {
    if ( typeof val !== 'string' || !val?.trim() ) {
        console.error('val is empty or null.');
        return false;
    }

    const dateRegex = /^(\d{8}|\d{4}-\d{2}-\d{2})$/;

    if ( !dateRegex.test(val) ) {
        return false;
    }

    let format = '';

    if ( val.includes('-') ) {
        // YYYY-MM-DD 형식
        format = 'YYYY-MM-DD';
    } else {
        // YYYYMMDD 형식
        format = 'YYYYMMDD';
    }

    const date = dayjs(val, format, true);

    return date.isValid();
};

/**
 * HHmm 형식 체크
 *  - HH:mm 형식 체크 = /^([01]\d|2[0-3]):[0-5]\d$/;
 * @param {string} val 
 * @returns 
 */
export const isHHmm = (val) => {
    if ( typeof val !== 'string' || !val?.trim() ) {
        console.error('val is empty or null.');
        return false;
    }

    const timeRegex = /^([01]\d|2[0-3])[0-5]\d$/;

    return timeRegex.test(val);
};

/**
 * HHmmss 형식 체크
 *  - HH:mm:ss 형식 체크 = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
 * @param {string} val 
 * @returns 
 */
export const isHHmmss = (val) => {
    if ( typeof val !== 'string' || !val?.trim() ) {
        console.error('val is empty or null.');
        return false;
    }

    const timeWithSecondsRegex = /^(?:[01]\d|2[0-3])[0-5]\d[0-5]\d$/;

    return timeWithSecondsRegex.test(val);
};

/**
 * Y/N 형식 체크
 * @param {string} val 
 * @returns 
 */
export const isYN = (val) => {
    if ( typeof val !== 'string' || !val?.trim() ) {
        console.error('val is empty or null.');
        return false;
    }

    return /^[YN]$/.test(val);
};
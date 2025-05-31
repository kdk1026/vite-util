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
 * @param {*} val 
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
 * @param {*} val 
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
 * @param {*} val 
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
 * @param {*} val 
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
 * @param {*} val 
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
 * @param {*} val 
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
 * @param {*} val 
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
 * @param {*} val 
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
 * @param {*} val 
 * @param {*} minLen 
 * @param {*} maxLen 
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
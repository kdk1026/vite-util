/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.02.28
 * @version 1.0
 */

import dayjs from "dayjs";

/**
 * null, undefined, 빈 문자열 모두 체크
 * - ( !val ) 으로 체크 가능 (권장)
 * @param {*} val 
 * @returns 
 */
export const isEmpty = (val) => {
    return (typeof val === 'undefined' || val === null || val === '');
};

/**
 * null, undefined, 빈 문자열, 공백 모두 체크
 * @param {*} val 
 * @returns 
 */
export const isBlank = (val) => {
    return (
		typeof val === 'undefined' || 
		val === null || 
		val === '' || 
		(typeof val === 'string' && val.replace(/ /gi, '') === '')
	);
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

export const Type = {
    /**
     * 숫자 체크
     * @param {*} val 
     * @returns 
     */
    isNumber : (val) => {
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
    },

    /**
     * 영문 체크
     * @param {*} val 
     * @returns 
     */
    isEnglish : (val) => {
        if ( typeof val !== 'string' || !val?.trim() ) {
            console.error('val is empty or null.');
            return false;
        }

        return /^[a-zA-Z]+$/.test(val);
    },

    /**
     * 영문, 공백 체크
     * @param {string} val 
     * @returns 
     */
    isEngBlank : (val) => {
        if ( typeof val !== 'string' || !val?.trim() ) {
            console.error('val is empty or null.');
            return false;
        }

        return /^[a-zA-Z\s]+$/.test(val);
    },

    /**
     * 영문, 숫자 체크
     * @param {string} val 
     * @returns 
     */
    isEngNum : (val) => {
        if ( typeof val !== 'string' || !val?.trim() ) {
            console.error('val is empty or null.');
            return false;
        }

        return /^[a-zA-Z0-9]+$/.test(val);
    },

    /**
     * 한글 체크
     * @param {string} val 
     */
    isHangul : (val) => {
        if ( typeof val !== 'string' || !val?.trim() ) {
            console.error('val is empty or null.');
            return false;
        }

        return /^[가-힣]+$/.test(val);
    },

    /**
     * 한글, 공백 체크
     * @param {string} val 
     * @returns 
     */
    isHanBlank : (val) => {
        if ( typeof val !== 'string' || !val?.trim() ) {
            console.error('val is empty or null.');
            return false;
        }

        return /^[가-힣\s]+$/.test(val);
    },

    /**
     * 한글, 영문 체크
     * @param {string} val 
     * @returns 
     */
    isHanEng : (val) => {
        if ( typeof val !== 'string' || !val?.trim() ) {
            console.error('val is empty or null.');
            return false;
        }

        return /^[가-힣a-zA-Z]+$/.test(val);
    },

    /**
     * 문자열에 특수문자(알파벳, 숫자, 언더스코어(_), 공백을 제외한 문자)가 포함되어 있는지 체크
     * @param {string} val 
     * @returns 
     */
    isSpecial : (val) => {
        if ( typeof val !== 'string' || !val?.trim() ) {
            console.error('val is empty or null.');
            return false;
        }

        return /[^\w\s]/.test(val);
    },

    /**
     * 공백 체크
     * @param {string} val 
     * @returns 
     */
    isSpace : (val) => {
        if ( typeof val !== 'string' || !val?.trim() ) {
            console.error('val is empty or null.');
            return false;
        }

        return /\s/.test(val);
    },

    /**
     * 한글을 제외한 문자로만 이루어져 있는지 체크
     * @param {string} val 
     * @returns 
     */
    isNotHangul : (val) => {
        if ( typeof val !== 'string' || !val?.trim() ) {
            console.error('val is empty or null.');
            return false;
        }

        return /^[^가-힣]+$/.test(val);
    }
}

export const Format = {
    /**
     * 이메일 형식 체크
     * @param {string} val 
     * @returns 
     */
    isEmail : (val) => {
        if ( typeof val !== 'string' || !val?.trim() ) {
            console.error('val is empty or null.');
            return false;
        }

        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        return emailRegex.test(val);
    },

    /**
     * 전화번호 형식 체크 (휴대폰 번호 제외)
     * @param {string} val 
     * @returns 
     */
    isPhoneNum : (val) => {
        if ( typeof val !== 'string' || !val?.trim() ) {
            console.error('val is empty or null.');
            return false;
        }

        const phoneRegex = /^(02|03[1-3]|04[1-4]|05[1-5]|06[1-4])-?(\d{3,4})-?(\d{4})|^(070|050[2-7])-?(\d{4})-?(\d{4})|^(15|16|18)\d{2}-?(\d{4})$/;

        return phoneRegex.test(val);
    },

    /**
     * 휴대폰 번호 형식 체크
     * @param {string} val 
     * @returns 
     */
    isCellPhoneNum : (val) => {
        if ( typeof val !== 'string' || !val?.trim() ) {
            console.error('val is empty or null.');
            return false;
        }

        const cellPhoneRegex = /^010-?\d{4}-?\d{4}$/;

        return cellPhoneRegex.test(val);
    },

    /**
     * 사업자 등록번호 형식 체크 (대한민국 3-2-5 또는 10자리 숫자 형식)
     * 하이픈(-) 유무에 관계없이 유효성을 검사합니다.
     * 예: "123-45-67890", "1234567890" 모두 유효합니다.
     * 
     * @param {string} val 
     * @returns 
     */
    isCompanyRegNum : (val) => {
        if ( typeof val !== 'string' || !val?.trim() ) {
            console.error('val is empty or null.');
            return false;
        }

        const companyRegNumRegex = /^\d{3}-?\d{2}-?\d{5}$/;

        return companyRegNumRegex.test(val);
    },
	
    /**
     * IPv4 형식 체크
     * @param {string} val 
     */
	isIPv4 : (val) => {
        if ( typeof val !== 'string' || !val?.trim() ) {
            console.error('val is empty or null.');
            return false;
        }

        const ipv4OctetRegex = "(?:25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]\\d|\\d)";

        const ipv4Regex = new RegExp(
            "^" +
            ipv4OctetRegex + "\\." +
            ipv4OctetRegex + "\\." +
            ipv4OctetRegex + "\\." +
            ipv4OctetRegex + "$"
        );

        return ipv4Regex.test(val);
	},

    /**
     * YYYYMMDD 형식 체크
     *  - 윤년이나 월별 일수를 모두 고려하여 정확하게 날짜를 파싱하고 검증
     * @param {string} val 
     * @returns 
     */
    isYYYYMMDD : (val) => {
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
    },

    /**
     * HHmm 형식 체크
     *  - HH:mm 형식 체크 = /^([01]\d|2[0-3]):[0-5]\d$/;
     * @param {string} val 
     * @returns 
     */
    isHHmm : (val) => {
        if ( typeof val !== 'string' || !val?.trim() ) {
            console.error('val is empty or null.');
            return false;
        }

        const timeRegex = /^([01]\d|2[0-3])[0-5]\d$/;

        return timeRegex.test(val);
    },

    /**
     * HHmmss 형식 체크
     *  - HH:mm:ss 형식 체크 = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
     * @param {string} val 
     * @returns 
     */
    isHHmmss : (val) => {
        if ( typeof val !== 'string' || !val?.trim() ) {
            console.error('val is empty or null.');
            return false;
        }

        const timeWithSecondsRegex = /^(?:[01]\d|2[0-3])[0-5]\d[0-5]\d$/;

        return timeWithSecondsRegex.test(val);
    },

    /**
     * Y/N 형식 체크
     * @param {string} val 
     * @returns 
     */
    isYN : (val) => {
        if ( typeof val !== 'string' || !val?.trim() ) {
            console.error('val is empty or null.');
            return false;
        }

        return /^[YN]$/.test(val);
    }
};

export const Account = {
    /**
     * 아이디 형식 체크
     * 1. 첫 글자 영문
     * 2. 7자 이상 30자 이내
     * @param {string} val 
     * @returns 
     */
    isId : (val) => {
        if ( typeof val !== 'string' || !val?.trim() ) {
            console.error('val is empty or null.');
            return false;
        }

        const pattern = /^[a-zA-Z][a-zA-Z0-9]{6,29}$/;

        return pattern.test(val);
    },

    /**
     * 비밀번호 형식 체크
     * 1. 첫 글자 영문
     * 2. 첫 글자 이후 영문, 숫자, 특수문자 조합
     *  - 영문, 숫자, 특수문자 중 2가지 조합: 최소 10자 이상
     *  - 영문, 숫자, 특수문자 중 3가지 조합: 최소 8자 이상
     *  - 1가지 이하 조합은 유효하지 않음.
     * @param {string} val 
     * @returns 
     */
    isPassword : (val) => {
        if ( typeof val !== 'string' || !val?.trim() ) {
            console.error('val is empty or null.');
            return false;
        }

        // 1. 첫 글자 영문 확인
        if (!/^[a-zA-Z]/.test(val)) {
            return false;
        }

        // 2. 조합 개수 확인
        const hasLetter = /[a-zA-Z]/.test(val);	// 영문 포함 여부
        const hasDigit = /\d/.test(val);		// 숫자 포함 여부
        
        // 특수문자 확인: 영문, 숫자, 공백을 제외한 문자가 있는지 확인
        const hasSpecialChar = /[^a-zA-Z\d\s]/.test(val);

        let combinationCount = 0;
        if (hasLetter) combinationCount++;
        if (hasDigit) combinationCount++;
        if (hasSpecialChar) combinationCount++;

        // 3. 길이 조건 최종 확인
        if (combinationCount === 2) {
            return val.length >= 10;
        } else if (combinationCount >= 3) {
            return val.length >= 8;
        } else {
            return false;
        }
    }
};
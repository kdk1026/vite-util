/**
 * 날짜 형식 체크 (YYYYMMDD, YYYY-MM-DD)
 * @param {string} val 
 * @returns 
 */
export const isDate = (val) => {
    const regExp = /^\d{4}-?(0[1-9]|1[012])-?(0[1-9]|[12]\d|3[01])$/;
    if ( !regExp.test(val) ) {
        return false;
    }

    const dateStr = val.replace(/-/g, '');
    const year = parseInt(dateStr.substring(0, 4), 10);
    const month = parseInt(dateStr.substring(4, 6), 10);
    const day = parseInt(dateStr.substring(6, 8), 10);

    const date = new Date(year, month - 1, day);

    return date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day;
};

/**
 * 시간 형식 체크 (HH24MI, HH24:MI, HH24MISS, HH24:MI:SS)
 * @param {string} val 
 * @returns 
 */
export const isTime = (val) => {
    const regExp = /^(0\d|1\d|2[0-3]):?([0-5]\d)(:?([0-5]\d))?$/;
    return regExp.test(val);
};

/**
 * 이메일 형식 체크
 * @param {string} val1 
 * @param {(undefined|null|string)} val2 
 * @returns 
 */
export const isEmail = (val1, val2) => {
    let val = val1;
    if (val2) {
        val = val1 + '@' + val2;
    }
    const regExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return regExp.test(val);
};

/**
 * 전화번호 형식 체크
 * @param {string} val1
 * @param {(undefined|null|string)} val2
 * @param {(undefined|null|string)} val3
 * @returns 
 */
export const isPhoneNumber = (val1, val2, val3) => {
    let val = val1;
    if ( val2 && val3 ) {
        val = val1 + '-' + val2 + '-' + val3;
    }
    /*
        02-서울
        031-경기, 032-인천, 033-강원
        041-충남, 042-대전, 043-충복, 044-세종
        051-부산, 052-울산, 053-대구, 054-경북, 055-경남
        061-전남, 062-광주, 063-전북, 064-제주
        070-인터넷 전화
        0502~0507-가상 전화번호
    */
    const regExp = /^(0(2|3[1-3]|4[1-4]|5[1-5]|6[1-4]|70|50[2-7])|01[016-9])-?(\d{3,4})-?(\d{4})$/;
    return regExp.test(val);
};

/**
 * 휴대폰 번호 형식 체크
 * @param {string} val1 
 * @param {(undefined|null|string)} val2 
 * @param {(undefined|null|string)} val3 
 * @returns 
 */
export const isCellPhoneNumber = (val1, val2, val3) => {
    let val = val1;
    if ( val2 && val3 ) {
        val = val1 + '-' + val2 + '-' + val3;
    }
    const regExp = /^(01[016789])-?(\d{3, 4})-?(\d{4})+$/;
    return regExp.test(val);
};

/**
 * 사업자등록번호 형식 체크 (대한민국 3-2-5 또는 10자리 숫자 형식)
 * @param {string} val1 
 * @param {(undefined|null|string)} val2 
 * @param {(undefined|null|string)} val3 
 */
export const isBusinessRegNumber = (val1, val2, val3) => {
    let val = val1;
    if ( val2 && val3 ) {
        val = val1 + '-' + val2 + '-' + val3;
    }

    const regExp = /^[(\d{3})-?(\d{2})-?(\d{5})+$]/;
    return regExp.test(val);
};

/**
 * 아이디 형식 체크 (첫 글자 영문, 7자 이상 30자 이내)
 * @param {string} val 
 */
export const isId = (val) => {
    const regExp = /^[a-zA-Z][a-zA-Z0-9]{6,29}$/;
    return regExp.test(val);
};

/**
 * 비밀번호 형식 체크
 * - 첫 글자 영문
 * - 첫 글자 이후 영문, 숫자, 특수문자 조합
 * - 영문/숫자/특수문자 중 2가지 조합 시, 10자리 이상
 * - 영문/숫자/특수문자 중 3가지 조합 시, 8자리 이상
 * @param {string} val 
 * @returns 
 */
export const isPassword = (val) => {
    // 1. 첫 글자 영문 확인 및 허용 문자 검증
    const allowedCharsRegExp = /^[a-zA-Z][a-zA-Z0-9\W]*$/;
    if ( !allowedCharsRegExp.test(val) ) {
        return false;
    }

    // 2. 조합 개수 확인
    const hasLetter = /[a-zA-Z]/.test(val);      // 영문 포함 여부
    const hasDigit = /\d/.test(val);             // 숫자 포함 여부

    // 특수문자 확인: 영문, 숫자, 언더스코어(`_`), 공백을 제외한 문자가 있는지 확인
    const hasSpecialChar = /[^a-zA-Z0-9\s]/.test(val);

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
        // 조합이 2가지 미만인 경우 (0 또는 1가지)
        return false;
    }
};

/**
 * URL 형식 체크
 * @param {string} val 
 * @returns 
 */
export const isUrl = (val) => {
    const regExp = /^(https?:\/\/)([\w-]+(\.[\w-]+)+)(:\d+)?(\/\S*)?$/;
    return regExp.test(val);
};

/**
 * 안전한 URL인지 체크 (상대 경로, https://, http:// 만 허용)
 *  - 상대 경로는 '/'로 시작하는 경우
 * @param {string} val 
 */
export const isSafeUrl = (val) => {
    const regExp = /^(\/[\w-]+(\/[\w-]*)*|https?:\/\/[\w-]+(\.[\w-]+)+(:\d+)?(\/\S*)?)$/;
    return regExp.test(val);
};
/**
 * @param {*} val 
 * @returns 
 */
export const isNull = (val) => {
    return typeof val == 'undefined' || val == null || val == '';
};

/**
 * @param {*} val 
 * @returns 
 */
export const isBlank = (val) => {
    return (val == null || val.replace(/ /gi, '') == '');
};

/**
 * @param {*} val 
 * @returns 
 */
export const isUndefined = (val) => {
    return (val == undefined || val === 'undefined');
};

/**
 * @param {*} val 
 * @returns 
 */
export const isNumber = (val) => {
    const _re = /^[0-9]+$/;
    return _re.test(val);
};

/**
 * @param {*} val 
 * @returns 
 */
export const isSpecial = (val) => {
    const _re = /[`~!@#$%^&*()\-_=+{}|;:'",.<>/?[\]]+$/;
    return _re.test(val);
};

/**
 * @param {string} val 
 * @returns 
 */
export const checkSpace = (val) => {
    if ( val.search(/\s/) != -1 ) {
        return true;
    } else {
        return false;
    }
};

/**
 * @param {string} val 
 * @returns 
 */
export const isNotHangul = (val) => {
    const _re = /[a-zA-Z0-9]|[ [\]{}()<>/?|`~!@#$%^&*-_+=,.;:"'\\]/g;
    return _re.test(val);
};

/**
 * @param {Object} param 
 * @returns 
 */
export const isEmptyObject = (param) => {
    return Object.keys(param).length === 0;
};

/**
 * @param {Array} param 
 * @returns 
 */
export const isEmptyArray = (param) => {
    return Array.isArray(param) && param.length === 0;
};

/**
 * @param {string} val 
 * @returns 
 */
export const isDate = (val) => {
    const _re = /^[0-9]{4}-?(0[1-9]|1[012])-?(0[1-9]|1[0-9]|2[0-9]|3[01])+$/;
    return _re.test(val);
};

/**
 * @param {string} val 
 * @returns 
 */
export const isTime = (val) => {
    const _re = /^([1-9]|[01][0-9]|2[0-3]):?([0-5][0-9])?(:?([0-5][0-9]))+$/;
    return _re.test(val);
};

/**
 * @param {string} val1 
 * @param {(undefined|null|string)} val2 
 * @returns 
 */
export const isEmail = (val1, val2) => {
    let _val = val1;
    if ( val2 ) {
        _val = val1 + '@' + val2;
    }
    const _re = /^[_A-Za-z0-9-]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})+$/;
    return _re.test(_val);
};

/**
 * @param {string} val1 
 * @param {(undefined|null|string)} val2 
 * @param {(undefined|null|string)} val3 
 * @returns 
 */
export const isCellPhoneNumber = (val1, val2, val3) => {
    let _val = val1;
    if ( val2 && val3 ) {
        _val = val1 + '-' + val2 + '-' + val3;
    }
    // const _re = /^(01[016789])-?(\d{3,4})-?(\d{4})+$/;
    const _re = /^(01[0])-?(\d{4})-?(\d{4})+$/;
    return _re.test(_val);
};

export const isPhoneNumber = (val1, val2, val3) => {
    let _val = val1;
    if ( val2 && val3 ) {
        _val = val1 + '-' + val2 + '-' + val3;
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
    const _re = /^(0(2|3[1-3]|4[1-4]|5[1-5]|6[1-4]|70|502|503|504|505|506|507))-?(\d{3,4})-?(\d{4})$/;
    return _re.test(_val);
};

/**
 * @param {*} val 
 * @returns 
 */
export const isUrl = (val) => {
    const _re = /^(https?:\/\/)([\w-]+(\.[\w-]+)+)(:\d+)?(\/\S*)?$/;
    return _re.test(val);
};

/**
 * 안전한 URL인지 체크 (상대 경로, https://, http:// 만 허용)
 *  - 상대 경로는 '/'로 시작하는 경우
 * @param {*} val 
 */
export const isSafeUrl = (val) => {
    const _re = /^(\/[\w-]+(\/[\w-]*)*|https?:\/\/[\w-]+(\.[\w-]+)+(:\d+)?(\/\S*)?)$/;
    return _re.test(val);
};
/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.05.23
 * @version 1.0
 */

/**
 * JSON String을 Object로 변환
 * @param {string} jsonStr 
 * @returns 
 */
export const jsonToObject = (jsonStr) => {
    if ( typeof jsonStr !== 'string' || !jsonStr?.trim() ) {
        console.error("유효하지 않은 JSON 문자열:", jsonStr);  
        return null;
    }

    try {
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error("JSON 파싱 실패:", error);  
    }
};

/**
 * Object를 JSON String으로 변환
 * @param {object} obj 
 * @returns 
 */
export const objectToJsonString = (obj) => {
    if ( !obj || typeof obj !== 'object' ) {
        console.error("유효하지 않은 객체:", obj);  
        return null;
    }

    try {
        return JSON.stringify(obj);
    } catch (error) {
        console.error("JSON 문자열 변환 실패:", error);  
    }
};

/**
 * Object를 Tree 구조의 JSON String으로 변환
 * @param {object} obj 
 * @returns 
 */
export const objectToJsonStringPretty = (obj) => {
    if ( !obj || typeof obj !== 'object' ) {
        console.error("유효하지 않은 객체:", obj);  
        return null;
    }

    try {
        return JSON.stringify(obj, null, 2);
    } catch (error) {
        console.error("JSON 문자열 변환 실패:", error);  
    }
};
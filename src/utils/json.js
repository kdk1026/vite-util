export const jsonToObject = (jsonStr) => {
    if ( !jsonStr?.trim() ) {
        console.error("유효하지 않은 JSON 문자열:", jsonStr);  
        return null;
    } else if (typeof jsonStr !== 'string') {
        console.error("JSON 문자열이 아닌 값:", jsonStr);
        return null;
    }

    try {
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error("JSON 파싱 실패:", error);  
    }
};

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
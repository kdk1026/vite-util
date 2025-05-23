export const jsonToObject = (jsonStr) => {
    try {
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error("JSON 파싱 실패:", error);  
    }
};

export const objectToJsonString = (obj) => {
    try {
        return JSON.stringify(obj);
    } catch (error) {
        console.error("JSON 문자열 변환 실패:", error);  
    }
};

export const objectToJsonStringPretty = (obj) => {
    try {
        return JSON.stringify(obj, null, 2);
    } catch (error) {
        console.error("JSON 문자열 변환 실패:", error);  
    }
};
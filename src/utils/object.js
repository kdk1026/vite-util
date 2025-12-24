/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.11.05
 * @version 1.1
 */

/**
 * 객체나 배열을 얕은 복사
 * - 값 자체가 복사되는 것이 아니라 해당 값을 가리키는 참조 값이 복사
 * @param {object} source 
 * @param {object} target 
 * @returns 
 */
export const shallowCopy = (source, target = {}) => {
    if ( typeof source !== 'object' || source === null ) {
        console.warn('Source must be an object (excluding null)');
        return {};
    }

    return Object.assign(target, source);
};

/**
 * 객체나 배열을 깊은 복사
 * @param {object} source 
 */
export const deepCopy = (source) => {
    if ( typeof source !== 'object' || source === null ) {
        console.warn('Source must be an object (excluding null)');
        return {};
    }

    const target = Array.isArray(source) ? [] : {};

    for (const key in source) {
        if ( Object.hasOwn(source, key) ) {
            target[key] = deepCopy(source[key]);
        }
    }

    return target;
};

/**
 * 두 객체를 병합
 * - source 객체의 속성을 target 객체에 깊게 병합
 * @param {object} target 
 * @param {object} source
 * @returns 
 */
export const deepMerge = (target, source) => {
    const isObject = (obj) => typeof obj === 'object' && obj !== null && !Array.isArray(obj);

    if (!isObject(source)) return source;

    const output = target;

    for (const key in source) {
        if ( Object.hasOwn(source, key) ) {
            const sourceValue = source[key];
            const targetValue = target[key];

            if ( isObject(sourceValue) ) {
                output[key] = deepMerge(isObject(targetValue) ? targetValue : {}, sourceValue);
            }  else if ( Array.isArray(sourceValue) ) {
                output[key] = sourceValue.map(item => {
                    if (Array.isArray(item)) return deepMerge([], item); // 배열 처리 대응 필요 시
                    if (isObject(item)) return deepMerge({}, item);
                    return item;
                });
            } else {
                output[key] = sourceValue;
            }
        }
    }
    
    return output;
};
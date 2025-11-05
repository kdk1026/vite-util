/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.11.05
 * @version 1.0
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

    if ( !isObject(target) || !isObject(source) ) {
        console.warn('Target or Source must be an object (excluding null and arrays)');
        return {};
    }

    for (const key in source) {
        if ( Object.hasOwn(source, key) ) {
            const sourceValue = source[key];
            const targetValue = target[key];

            if ( isObject(sourceValue) ) {
                const newTarget = isObject(targetValue) ? targetValue : {};
                target[key] = deepMerge(newTarget, sourceValue);
            }  else if ( Array.isArray(sourceValue) ) {
                target[key] = sourceValue.map(item => {
                    if ( typeof item === 'object' && item !== null ) {
                        const initialTarget = Array.isArray(item) ? [] : {};
                        return deepMerge(initialTarget, item);
                    }
                    return item;
                });
            } else {
                target[key] = sourceValue;
            }
        }
    }
    
    return target;
};
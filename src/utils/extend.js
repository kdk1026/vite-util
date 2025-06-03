/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.02.28
 * @version 1.0
 */

/**
 * $.extend(true, target, source) 의 Vanilla JS 로 구현
 * @param {Object} target 
 * @param {Object} source
 * @returns 
 */
export const deepCopy = (target, source) => {
    if ( typeof target !== 'object' || target === null ) {
        console.warn('Target must be an object');
        return {};
    }

    if ( typeof source !== 'object' || source === null ) {
        console.warn('Source must be an object');
        return {};
    }

    for (const key in source) {
        if (Object.hasOwn(source, key)) {
            if (typeof source[key] === 'object') {
                target[key] = deepCopy({}, source[key]);
            } else {
                target[key] = source[key];
            }
        }
    }
    return target;
};
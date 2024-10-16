/**
 * $.extend(true, target, source) 의 Vanilla JS 로 구현
 * @param {Object} target 
 * @param {Object} source
 * @returns 
 */
export const deepCopy = (target, source) => {
    for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            if (typeof source[key] === 'object') {
                target[key] = deepCopy({}, source[key]);
            } else {
                target[key] = source[key];
            }
        }
    }
    return target;
};
/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.11.05
 * @version 1.1
 */

/**
 * 객체나 배열을 얕은 복사
 * - target 에 복사 및 병합
 * @param {object} source 
 * @param {undefined|null|object} target 
 * @returns 
 */
export const shallowCopy = (source, target) => {
    if ( typeof source !== 'object' || source === null ) {
        console.warn('Source must be an object (excluding null)');
        return {};
    }

    if ( target !== undefined && target !== null ) {
        if ( typeof target !== 'object' ) {
            console.warn('Target must be an object if provided');
            return {};
        }
    }

    if ( !target ) {
        return { ...source };
    }

    return Object.assign(target, source);
};

/**
 * 객체나 배열을 얕은 복사하여 새로운 객체 생성
 * - key가 중복될 경우, 가장 마지막에 쓴 값이 이전 값을 덮어씀
 * - 전통적인 방식과 동일
 *      Object.assign({}, source, target);
 * @param {object} source 
 * @param {undefined|null|object} source2 
 * @returns 
 */
export const shallowClone = (source, source2 = {}) => {
    if ( typeof source !== 'object' || source === null 
            || typeof source2 !== 'object' || source2 === null ) {
        console.warn('Source or source2 must be an object (excluding null)');
        return {};
    }

    return {...source, ...source2};
};

/**
 * 객체나 배열을 깊은 복사
 * - 전통적인 방식의 단점을 개선
 * - 전통적인 방식의 단점 : 객체 내부에 함수(Function), Symbol, undefined가 
 *      포함되어 있으면 복사되지 않고 누락되며 성능도 느림
 *      JSON.parse(JSON.stringify(original));
 * @param {object} source 
 */
export const deepCopy = (source) => {
    if ( typeof source !== 'object' || source === null ) {
        console.warn('Source must be an object (excluding null)');
        return {};
    }

    return structuredClone(source);
};

/**
 * 두 객체를 병합
 * - source 객체의 속성을 target 객체에 깊게 병합
 * - target 객체의 내부를 비움
 * @param {object} source
 * @param {object} target 
 * @returns 
 */
export const deepClone = (source, target) => {
    if ( typeof source !== 'object' || source === null 
            || typeof target !== 'object' || target === null ) {
        console.warn('Both source and target must be objects (excluding null)');
        return target;
    }

    for ( const key in target ) {
        if ( Object.hasOwn(target, key) ) {
            delete target[key];
        }
    }

    const clonedSource = structuredClone(source);
    Object.assign(target, clonedSource);

    return target;
};

/**
 * 두 객체를 병합
 * - source 객체의 속성을 target 객체에 깊게 병합
 * - target 객체의 내부 유지
 * @param {object} source
 * @param {object} target 
 * @returns 
 */
export const deepCloneKeeping = (source, target) => {
    if ( typeof source !== 'object' || source === null 
            || typeof target !== 'object' || target === null ) {
        console.warn('Both source and target must be objects (excluding null)');
        return target;
    }

    for ( const key in source ) {
        if ( Object.hasOwn(source, key) ) {
            if ( typeof source[key] === 'object' && source[key] !== null ) {
                // source[key]가 객체인 경우, 재귀적으로 깊은 복사 진행
                if ( !target[key] || typeof target[key] !== 'object' ) {
                    // target에 해당 키가 없거나 객체가 아니라면 새 객체/배열 생성
                    target[key] = Array.isArray(source[key]) ? [] : {};
                }
                deepCloneKeeping(source[key], target[key]);
            } else {
                target[key] = source[key];
            }
        }
    }

    return target;
};
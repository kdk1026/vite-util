/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.11.05
 * @version 1.1
 */

/*
    <script type="module">
        import {setCookie, removeCookie, getCookie} from './js/cookie.js';

        setCookie("mode", "test", 1, "local");

        const mode = getCookie('mode');
        console.log(mode);

        removeCookie('mode', 'local');
    </script>
*/

/**
 * 쿠키 생성
 * @param {string} name 
 * @param {string} value 
 * @param {number} days 
 * @param {string} profile 
 * @param {undefined|null|string} path 
 * @param {undefined|null|string} domain 
 */
export const setCookie = (name, value, days, profile, path, domain) => {
    if ( typeof name !== 'string' || !name.trim() ) {
        console.error('name is empty or null.');
        return;
    }

    if ( days > 0 ) {
        if ( typeof value !== 'string' || !value.trim() ) {
            console.error('value is empty or null.');
            return;
        }
    }

    if ( typeof days !== 'number' ) {
        console.error('days is not number.');
        return;
    }

    if ( typeof profile !== 'string' || !profile.trim() ) {
        console.error('profile is empty or null.');
        return;
    }

    let cookieStr = `${name}=${encodeURIComponent(value) || ''}`;

    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        cookieStr += `; expires=${date.toUTCString()}`;
    }

    if ( profile !== 'local' ) {
        cookieStr += `; secure`;
    }

    if (path) {
        if ( typeof path !== 'string' || !path.trim() ) {
            console.error('path is empty or null.');
            return;
        }

        cookieStr += `; path=${path}`;
    } else {
        cookieStr += `; path=/`;
    }

    if (domain) {
        if ( typeof domain !== 'string' || !domain.trim() ) {
            console.error('domain is empty or null.');
            return;
        }

        cookieStr += `; domain=${domain}`;
    }

    document.cookie = cookieStr;
};

/**
 * 쿠키 삭제
 * @param {string} name
 * @param {string} profile
 * @param {undefined|null|string} path 
 * @param {undefined|null|string} domain 
 */
export const removeCookie = (name, profile, path, domain) => {
    setCookie(name, '', -1, profile, path, domain);
};

/**
 * 쿠키 가져오기
 * @param {string} name
 */
export const getCookie = (name) => {
    if ( typeof name !== 'string' || !name.trim() ) {
        console.error('name is empty or null.');
        return;
    }

    const nameEQ = name + "=";

    const ca = document.cookie.split(';');

    for(let c_raw of ca) {
        let c = c_raw;

        while ( c.startsWith(' ') ) {
            c = c.substring(1, c.length);
        }

        if ( c.startsWith(nameEQ) ) {
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
    }

    return null;
};

/**
 * Object 쿠키 생성
 * @param {string} name 
 * @param {object} value 
 * @param {number} days 
 * @param {string} profile 
 * @param {undefined|null|string} path 
 * @param {undefined|null|string} domain 
 */
export const setCookieObject = (name, value, days, profile, path, domain) => {
    if ( typeof value !== 'object' ) {
        console.error('value is not object.');
        return;
    }

    if ( Object.keys(value).length === 0 && value.constructor === Object ) {
        console.error('value is empty.');
        return;
    }

    try {
        const cookieValue = JSON.stringify(value);
        setCookie(name, cookieValue, days, profile, path, domain);
    } catch (error) {
        console.error("JSON 문자열 변환 실패:", error);  
    }
};

/**
 * Array 쿠키 생성
 * @param {string} name 
 * @param {Array<*>} value 
 * @param {number} days 
 * @param {string} profile 
 * @param {undefined|null|string} path 
 * @param {undefined|null|string} domain 
 */
export const setCookieArray = (name, value, days, profile, path, domain) => {
    if ( !Array.isArray(value) ) {
        console.error('value is not array.');
        return;        
    }

    if ( Object.keys(value).length === 0 && value.constructor === Array ) {
        console.error('value is empty.');
        return;
    }

    try {
        const cookieValue = JSON.stringify(value);
        setCookie(name, cookieValue, days, profile, path, domain);
    } catch (error) {
        console.error("JSON 문자열 변환 실패:", error);  
    }
};

/**
 * Object, Array 쿠키 가져오기
 * @param {string} name 
 * @returns 
 */
export const getCookieData = (name) => {
    const cookieValue = getCookie(name);

    try {
        if ( cookieValue ) {
            return JSON.parse(cookieValue);
        }
    } catch (error) {
        console.error("JSON 파싱 실패:", error);  
    }

    return null;
};
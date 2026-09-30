/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.02.28
 * @version 1.0
 */

/**
 * 동적으로 외부 JS 파일을 로드하는 함수
 * @param {string} url 
 * @param {undefined|Function} callback 
 */
export const loadExternalJs = (url, callback) => {
    if ( typeof url !== 'string' || !url?.trim() ) {
        console.warn('Invalid input url');
        return null;
    }

    if ( callback && typeof callback !== 'function' ) {
        console.error('`callback` must be a valid function.');
        return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${url}"]`);

    if (!existingScript) {
        const script = document.createElement('script');
        script.src = url;
        script.type = 'text/javascript';
        script.async = true;

        if (callback) {
            script.onload = callback;
        }

        document.head.appendChild(script);
    } else if (callback) {
        callback();
    }
};
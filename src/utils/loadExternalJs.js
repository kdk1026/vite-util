/**
 * 동적으로 추가해야 할 경우
 */
export const loadExternalJs = () => {
    const scriptJquery = document.createElement('script');
    scriptJquery.src = `https://code.jquery.com/jquery-1.12.4.min.js`;
    scriptJquery.async = true;

    document.body.appendChild(scriptJquery);
};
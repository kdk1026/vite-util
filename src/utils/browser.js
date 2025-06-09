/**
 * UserAgent에서 브라우저 식별
 * @returns 
 */
export const getBrowser = () => {
    const userAgent = navigator.userAgent.toLowerCase();

    if (userAgent == null) {
        return "Unknown";
    }

    if (userAgent.contains("samsungbrowser")) {
        return "Samsung Internet";
    } else if (userAgent.contains("whale")) {
        return "Whale";
    } else if (userAgent.contains("edge")) {
        return "Microsoft Edge";
    } else if (userAgent.contains("opr") || userAgent.contains("opera")) {
        return "Opera";
    } else if (userAgent.contains("chrome")) {
        return "Chrome";
    } else if (userAgent.contains("firefox")) {
        return "Firefox";
    } else if (userAgent.contains("safari") && !userAgent.contains("chrome")) {
        return "Safari";
    } else if (userAgent.contains("msie") || userAgent.contains("trident")) {
        return "Internet Explorer";
    } else {
        return "Other";
    }    
};
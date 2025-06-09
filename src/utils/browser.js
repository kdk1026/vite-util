/**
 * UserAgent에서 브라우저 식별
 * @returns 
 */
export const getBrowser = () => {
    const userAgent = navigator.userAgent.toLowerCase();

    if (userAgent == null) {
        return "Unknown";
    }

    if (userAgent.includes("samsungbrowser")) {
        return "Samsung Internet";
    } else if (userAgent.includes("whale")) {
        return "Whale";
    } else if (userAgent.includes("edge")) {
        return "Microsoft Edge";
    } else if (userAgent.includes("opr") || userAgent.includes("opera")) {
        return "Opera";
    } else if (userAgent.includes("chrome")) {
        return "Chrome";
    } else if (userAgent.includes("firefox")) {
        return "Firefox";
    } else if (userAgent.includes("safari") && !userAgent.includes("chrome")) {
        return "Safari";
    } else if (userAgent.includes("msie") || userAgent.includes("trident")) {
        return "Internet Explorer";
    } else {
        return "Other";
    }    
};
import { Convert, GetTimeInterval } from "./date/dayDate";

/**
 * 액세스 토큰의 만료가 임박했는지 확인 (예: 5분 이내)
 * @param {number} exp 
 * @param {number} thresholdMinutes 
 * @returns 
 */
export const isTokenExpiringSoon = (exp, thresholdMinutes = 5) => {
    if ( typeof exp !== 'number' ) {
        console.error("exp is not number");
        return;
    }

    if ( typeof thresholdMinutes !== 'number' ) {
        console.error("thresholdMinutes is not number");
        return;
    }

    if (exp == 0) return true;

    const expDate = new Date(exp * 1000);
    const expString = Convert.getDateToFormattedString(expDate, "YYYYMMDDHHmmss");
    const diffMinute = GetTimeInterval.intervalMinutes(expString);
    return diffMinute <= thresholdMinutes;
};
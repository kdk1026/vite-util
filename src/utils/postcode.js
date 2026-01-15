/**
 * 다음 주소 API
 * @returns
 * @example
 * const result = await openDaumPostcode();
 */
export const openDaumPostcode = () => {
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
        new window.daum.Postcode({
            oncomplete: function(data) {
                const result = {}
                result.zonecode = data.zonecode;
                result.roadAddress = data.roadAddress;
                result.jibunAddress = data.jibunAddress;
                resolve(result);
            }
        }).open();
    });
}
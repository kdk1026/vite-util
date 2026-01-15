/**
 * 다음 주소 API
 * @returns
 * @example
 * const result = await openDaumPostcode();
 * 
 * @description
 * react는 react-daum-postcode 사용해야 함
 */
export const openDaumPostcode = () => {
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
        new window.daum.Postcode({
            oncomplete: function(data) {
                resolve({
                    zonecode: data.zonecode,
                    roadAddress: data.roadAddress,
                    jibunAddress: data.jibunAddress,
                });
            }
        }).open();
    });
}
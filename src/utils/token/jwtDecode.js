import { jwtDecode } from "jwt-decode";

export const jwtDecodeUtil = {
    /**
     * JWT 토큰에서 페이로드를 추출
     * @param {string} token 
     * @returns 
     */
    getPayload: (token) => {
        if ( typeof token !== 'string' || !token.trim() ) {
            console.error('token is empty or null.');
            return null;
        }

        try {
            return jwtDecode(token);
        } catch (error) {
            console.error("JWT 디코딩 실패:", error);
            return null;
        }
    }
};
/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.02.28
 * @version 1.0
 */

import { jwtDecode } from "jwt-decode";

/**
 * localStorage 에서 accessToken 가져옴
 * @returns 
 */
export const getToken = () => {
    return localStorage.getItem('accessToken');
};

/**
 * accessToken 만료 여부
 * @param {*} accessToken 
 * @returns 
 */
export const isTokenExpired = (accessToken) => {
    if ( !accessToken ) {
        return true;
    }

    try {
        const decodedToken = jwtDecode(accessToken);
        const currentTime = Date.now() / 1000;

        return decodedToken.exp < currentTime;
    } catch (error) {
        console.error('Error decoding token:', error);
        return true;
    }
};

/**
 * localStorage 에서 accessToken 삭제
 * @returns 
 */
export const removeToken = () => {
    return localStorage.removeItem('accessToken');
}
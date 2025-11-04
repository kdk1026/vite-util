/**
 * @author 김대광 <daekwang1026@gmail.com>
 * @since 2025.02.28
 * @version 1.1
 */

import { jwtDecode } from "jwt-decode";

const ACCESS_TOKEN = 'accessToken';

/**
 * sessionStorage 에서 accessToken 가져옴
 * @returns 
 */
export const getToken = () => {
    return sessionStorage.getItem(ACCESS_TOKEN);
};

/**
 * accessToken 만료 여부
 * @param {string} accessToken 
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
 * sessionStorage 에서 accessToken 삭제
 * @returns 
 */
export const removeToken = () => {
    return sessionStorage.removeItem(ACCESS_TOKEN);
};

/**
 * sessionStorage 에서 accessToken 저장
 * @param {string} accessToken 
 * @returns 
 */
export const setToken = (accessToken) => {
    return sessionStorage.setItem(ACCESS_TOKEN, accessToken);
};
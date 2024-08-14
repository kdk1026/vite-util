import { jwtDecode } from "jwt-decode";

export const getToken = () => {
    return localStorage.getItem('accessToken');
};

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

export const removeToken = () => {
    return localStorage.removeItem('accessToken');
}
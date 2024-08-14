import axios from "axios";
import { getToken, isTokenExpired } from "./token";
import { refreshToken } from "../apis/auth";

const setApiUrl = () => {
    const profile = import.meta.env.VITE_PROFILE;
    
    if ( profile === 'local' ) {
        const hostname = window.location.hostname;
        if ( hostname !== 'localhost' ) {
            return (import.meta.env.VITE_API_URL).replace('localhost', hostname);
        } else {
            return import.meta.env.VITE_API_URL;    
        }
    } else {
        return import.meta.env.VITE_API_URL;
    }
};

const apiUrl = setApiUrl();

const instance = axios.create({
    baseURL: apiUrl,
    withCredentials: true,
    timeout: 5000
});

instance.interceptors.request.use(
    (config) => {
        const accessToken = getToken();

        if ( accessToken ) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        
        if ( error.response?.status === 401 ) {
            if ( isTokenExpired() ) {
                await refreshToken();
            }

            const accessToken = getToken();

            error.config.headers = {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`
			};

            const response = await axios.request(error.config);
			return response;
        } else {
            onErrorCase(error);
        }

        return Promise.reject(error);
    }
);

const onErrorCase = (error) => {
    if ( error.code === 'ERR_NETWORK' ) {
        onError(999, `에러가 발생했습니다. ${error.message}`);
    }

    if ( error.code === 'ECONNABORTED' ) {
        onError(998, `요청이 만료되었습니다. ${error.message}`);
    }

    const { status, statusText } = error.response;

	switch (status) {
		case 400:
			onError(status, "잘못된 요청입니다.");
			break;
		case 401:
			onError(status, "인증 실패입니다.");
			break;
		case 403:
			onError(status, "권한이 없습니다.");
			break;
		case 404:
			onError(status, "찾을 수 없는 URL 입니다.");
			break;
		case 500:
			onError(status, "서버 오류입니다.");
			break;
		default:
			onError(status, `에러가 발생했습니다. ${error.message}`);
	}
};

const onError = (status, message) => {
    const error = { status, message };
    throw error;
};

export default instance;
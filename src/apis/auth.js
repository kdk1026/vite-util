import axios from "axios";

export const refreshToken = (accessToken) => {
    const url = `${import.meta.env.VITE_API_URL}/login/token`;

    axios.post(url, {
        accessToken
    }, {
        withCredentials: true
    })
    .then((res) => {
        localStorage.setItem('accessToken', res.data.accessToken);
    })
    .catch((err) => {
        console.error(err);
    });
    
};
export const refreshToken = async (accessToken) => {
    const url = `${import.meta.env.VITE_API_URL}/login/token`;

    try {
        await axios.post(url, {
            accessToken
        }, {
            withCredentials: true
        });
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }

    refreshToken();
};
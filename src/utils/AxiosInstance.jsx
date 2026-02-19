import axios from 'axios';

// Check Token
const checkExpiredToken = (key) => {
    const itemStr = localStorage.getItem(key);
    if (itemStr) {
        const item = JSON.parse(itemStr);
        const now = new Date();

        if (now.getTime() > item.expiry) {
            localStorage.removeItem(key);
            return null;
        }

        return item.value;
    } else {
        return null;
    }
}

// Function Helper Axios

const ENV = import.meta.env.VITE_ENV || "local";

const axiosInstance = (additionalConfig = {}) => {
    const token = checkExpiredToken("token");

    const baseURL = import.meta.env[`VITE_BASE_URL_${ENV}`];
    if (!baseURL) {
        throw new Error(`BASE_URL not found for env "${ENV}"`);
    }

    return axios.create({
        baseURL,
        withCredentials: true, // DEFAULT TRUE
        // headers: {
        //     Accept: "application/json",
        //     ...(token && { Authorization: `Bearer ${token}` }),
        // },
        ...additionalConfig, // ⬅️ ini bisa override
    });
};


export default axiosInstance;
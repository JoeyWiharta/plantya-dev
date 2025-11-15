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

const ENV = import.meta.env.VITE_ENV; 

const BASE_URL = {
    local: import.meta.env.VITE_BASE_URL_LOCAL,
    dev: import.meta.env.VITE_BASE_URL_DEV,
    prod: import.meta.env.VITE_BASE_URL_PROD
};

const axiosInstance = (additionalConfig = {}) => {
    debugger
    const token = checkExpiredToken("token");

    return axios.create({
        baseURL: BASE_URL[ENV],
        headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
            "Content-Type": "application/json",
        },
        ...additionalConfig,
    });
};

export default axiosInstance;
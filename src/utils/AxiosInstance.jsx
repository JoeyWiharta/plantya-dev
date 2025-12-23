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

const BASE_URL = {
    local: {
        auth: import.meta.env.VITE_BASE_URL_LOCAL,
        management: import.meta.env.VITE_BASE_URL_LOCAL2,
    },
    dev: import.meta.env.VITE_BASE_URL_DEV,
    prod: import.meta.env.VITE_BASE_URL_PROD
};

const axiosInstance = (service, additionalConfig = {}) => {
    const token = checkExpiredToken("token");

    const baseURL = typeof BASE_URL[ENV] === "object" ? BASE_URL[ENV][service] : BASE_URL[ENV];

    const serviceHeaders = {
        auth: {
            "Content-Type": "application/json",
        },
        management: {
            "Accept": "application/json",
        },
    };

    return axios.create({
        baseURL,
        withCredentials: true,
        headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
            ...(serviceHeaders[service] || {}),
        },
        ...additionalConfig,
    });
};

export default axiosInstance;
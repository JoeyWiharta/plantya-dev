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
const SERVICE_HEADERS = {
    auth: {
        "Content-Type": "application/json",
    },
    iot: {
        Accept: "application/json",
    },
    users: {
        Accept: "application/json",
    },
};

const axiosInstance = (service, additionalConfig = {}) => {
    const token = checkExpiredToken("token");

    const baseURL = import.meta.env[`VITE_BASE_URL_${ENV}_${service}`];
    if (!baseURL) {
        throw new Error(
            `BASE_URL not found for service "${service}" in env "${ENV}"`
        );
    }

    return axios.create({
        baseURL,
        withCredentials: true,
        headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
            ...(SERVICE_HEADERS[service] || {}),
        },
        ...additionalConfig,
    });
};

export default axiosInstance;
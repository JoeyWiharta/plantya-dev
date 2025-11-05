import axios from 'axios';

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

const BASE_URL = {
    local: "http://localhost:8080/",
    dev: "https://dev.api.example.com/",
    prod: "https://api.example.com/"
}

const axiosInstance = (additionalConfig = {}) => {
    debugger
    const token = checkExpiredToken("token");

    return axios.create({
        baseURL: BASE_URL.local,
        headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
            "Content-Type": "application/json",
        },
        ...additionalConfig,
    });
};

export default axiosInstance;
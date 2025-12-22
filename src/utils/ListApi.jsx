import axiosInstance from "./AxiosInstance";

// Login and Register
export const loginApi = (res) => axiosInstance("auth").post("/api/auth/login", res, { withCredentials: true });
export const registerApi = (res) => axiosInstance("auth").post("/api/auth/register", res, { withCredentials: true });
// export const logoutApi = (res) => "/api/auth/logout";

// app002 - Master User
export const getUser = (params, config = {}) => axiosInstance("management").get("/api/users", { params, ...config });
export const addUser = (res) => axiosInstance("management").post("/api/users", res, { withCredentials: true })

import axiosInstance from "./AxiosInstance";

// Login and Register
export const loginApi = (res) => axiosInstance("auth").post("/api/auth/login", res);
export const registerApi = (res) => axiosInstance("auth").post("/api/auth/register", res);
// export const logoutApi = (res) => "/api/auth/logout";

// app002 - Master User
export const getUser = (params, config = {}) => axiosInstance("management").get("/api/users", { params, ...config });
export const addUser = (res) => axiosInstance("management").post("/api/users", res)
export const editUser = (userId, res, config = {}) => axiosInstance("management").patch(`/api/users/${userId}`, res, config)


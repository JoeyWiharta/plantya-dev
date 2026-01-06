import axiosInstance from "./AxiosInstance";

// Login and Register
export const loginApi = (res) => axiosInstance("auth").post("/api/auth/login", res);
export const registerApi = (res) => axiosInstance("auth").post("/api/auth/register", res);
// export const logoutApi = (res) => "/api/auth/logout";

// app002 - Master User
export const getUser = (params, config = {}) => axiosInstance("user").get("/api/users", { params, ...config });
export const getUserDeleted = (params, config = {}) => axiosInstance("user").get("/api/users/deleted", { params, ...config });
export const addUser = (res) => axiosInstance("user").post("/api/users", res)
export const editUser = (userId, res, config = {}) => axiosInstance("user").patch(`/api/users/${userId}`, res, config)
export const deleteUser = (userId) => axiosInstance("user").delete(`/api/users/${userId}`)
export const restoreUser = (userId) => axiosInstance("user").post(`/api/users/deleted/${userId}/restore`)

// app003 - Master Cluster
export const getCluster = (params, config = {}) => axiosInstance("iot").get("/api/clusters", { params, ...config });


// app004 - Master Device
export const getDevice = (params, config = {}) => axiosInstance("iot").get("/api/devices", { params, ...config });

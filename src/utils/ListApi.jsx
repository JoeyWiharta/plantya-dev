import axiosInstance from "./AxiosInstance";

// Login and Register
export const loginApi = (res) => axiosInstance({ withCredentials: false }).post("/auth/login", res);
export const registerApi = (res) => axiosInstance({ withCredentials: false }).post("/auth/register", res);
export const logoutApi = (res) => axiosInstance({ withCredentials: false }).post("/auth/logout", res);

// app002 - Master User
export const getUser = (params, config = {}) => axiosInstance().get("/users", { params, ...config });
export const getUserDeleted = (params, config = {}) => axiosInstance("user").get("/users/deleted", { params, ...config });
export const addUser = (res) => axiosInstance().post("/users", res)
export const editUser = (userId, res, config = {}) => axiosInstance("user").patch(`/users/${userId}`, res, config)
export const deleteUser = (userId) => axiosInstance().delete(`/users/${userId}`)
export const restoreUser = (userId) => axiosInstance().post(`/users/deleted/${userId}/restore`)

// app003 - Master Cluster
export const getCluster = (params, config = {}) => axiosInstance().get("/clusters", { params, ...config });
export const addCluster = (res) => axiosInstance().post("/clusters", res)
export const editCluster = (clusterId, res, config = {}) => axiosInstance().patch(`/clusters/${clusterId}`, res, config)
export const deleteCluster = (clusterId) => axiosInstance().delete(`/clusters/${clusterId}`)





// app004 - Master Device
export const getDevice = (params, config = {}) => axiosInstance().get("/devices", { params, ...config });
export const addDevice = (res) => axiosInstance().post("/devices", res)
export const editDevice = (deviceId, res, config = {}) => axiosInstance().patch(`/devices/${deviceId}`, res, config)
export const deleteDevice = (deviceId) => axiosInstance().delete(`/devices/${deviceId}`)

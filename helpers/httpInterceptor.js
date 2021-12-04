import axios from "axios";

const customAxios = (token) => {

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
    config.headers['Authorization'] = `Bearer ${token}`;
    return config;
}, function (error) {
    console.log(error)
    return Promise.reject(error);
});
   return axiosInstance;
};

export default customAxios;
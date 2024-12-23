import axios from "axios";
import { refreshToken } from "../services/userService";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout: 10000
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if(token){
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if(error.response.status === 401 && (error.response.data.code === 'token_not_valid' || error.response.data.detail == 'Authentication credentials were not provided.')){
            localStorage.removeItem('access_token');
            if(localStorage.getItem('refresh_token')){
                const new_access_token = await refreshToken(localStorage.getItem('refresh_token'));
                if(new_access_token.status === 200) {
                    localStorage.setItem('access_token', new_access_token.data.access);
                    error.config.headers['Authorization'] = `Bearer ${new_access_token.data.access}`;
                    return axiosInstance(error.config);
                }
            }
            else{
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);


export default axiosInstance;
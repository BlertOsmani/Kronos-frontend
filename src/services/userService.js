import axiosInstance from "../utils/axiosInstance"

export async function registerUser(data){
    try{
        const request = await axiosInstance.post('users/', data);
        return request;
    } catch(error){
        return error.response;
    }
};

export async function auth(username, password){
    try{
        const request = await axiosInstance.post('auth/token/', {
            username: username,
            password: password
        })
        return request;
    }catch(error){
        return error.response;
    }
}
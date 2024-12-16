import axiosInstance from "../utils/axiosConfig"

export async function registerUser(data){
    try{
        const request = await axiosInstance.post('users/', data);
        //localStorage.setItem('token', request.data.access)
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
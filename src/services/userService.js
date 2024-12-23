import axiosInstance from "../utils/axiosInstance"

export async function registerUser(data){
    try{
        const request = await axiosInstance.post('register/', data);
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

export async function refreshToken(refresh){
    try{
        const request = axiosInstance.post('auth/token/refresh/', {
            refresh:refresh
        })
        return request;
    }catch(error){
        return error.response;
    }
}

export async function logout(){
    try{
        const request = await axiosInstance.post('auth/token/blacklist/', {
            refresh: localStorage.getItem('refresh_token')
        });
        if(request.status === 200){
            localStorage.removeItem('access_token');
            localStorage.removeItem('user');
            localStorage.removeItem('refresh_token');
            window.location.href = '/login';
        }
    }catch(error){
        return error.response;
    }
}

export async function updateProfile(id, data){
    try{
        const request = await axiosInstance.put(`users/${id}/`, data);
        return request;
    }catch(error){
        return error.response;
    }
}
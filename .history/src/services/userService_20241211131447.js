import axiosInstance from "../utils/axiosConfig"

async function registerUser(data){
    try{
        const request = await axiosInstance.post('users/', data);
        return request;
    } catch(error){
        return error.response;
    }
};

export default registerUser;
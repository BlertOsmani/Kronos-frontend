import axiosInstance from "../utils/axiosConfig"

async function registerUser(data){
    try{
        const request = await axiosInstance.post('users/', data);
        return request.response;
    } catch(error){
        return error;
    }
};

export default registerUser;
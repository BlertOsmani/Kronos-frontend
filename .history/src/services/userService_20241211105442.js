import axiosInstance from "../utils/axiosConfig"

async function registerUser(data){
    try{
        return await axiosInstance.post('users/', data).response;
    } catch(error){
        return error.response;
    }
};

export default registerUser;
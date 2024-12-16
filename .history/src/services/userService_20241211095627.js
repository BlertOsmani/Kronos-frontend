import axiosInstance from "../utils/axiosConfig"

async function registerUser(data){
    try{
        const response = await axiosInstance.post('users/', data);
        return response.status;
    } catch(error){
        throw new Error(error);
    }
};

export default registerUser;
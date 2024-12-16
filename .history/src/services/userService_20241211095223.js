import axiosInstance from "../utils/axiosConfig"

const registerUser = async (data) => {
    try{
        const response = await axiosInstance.post('users/', data);
        return response.status;
    } catch(error){
        return error;
    }
}

export default registerUser;
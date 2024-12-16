import axiosInstance from "../utils/axiosConfig"

const register = async (data) => {
    try{
        const response = await axiosInstance.post('users/', data)
        return response.status
    } catch(error){
        return error.message;
    }
}

export default register;
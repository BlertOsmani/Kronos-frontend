import axiosInstance from "../utils/axiosConfig"

async function registerUser(data){
    try{
        const request = await axiosInstance.post('users/', data);
        return request.response;
    } catch(error){
        console.log("Error", error);
        return error.response;
    }
};

export default registerUser;
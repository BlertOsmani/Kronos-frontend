import axiosInstance from "../utils/axiosConfig"

async function registerUser(data){
    try{
        const request = await axiosInstance.post('users/', data);
        console.log(request);
        return request.response;
    } catch(error){
        return error.response;
    }
};

export default registerUser;
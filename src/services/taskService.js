import axiosInstance from "../utils/axiosInstance";

export async function getTasks(){
    try{
        const request = await axiosInstance.get('tasks/');
        return request;
    }catch(error){
        return error.response;
    }
}

export async function createTask(data){
    try{
        const request = await axiosInstance.post('tasks/', data);
        return request;
    }catch(error){
        return error.response;
    }
}

export async function updateTask(id, data){
    try{
        const request = await axiosInstance.put(`tasks/${id}/`, data);
        console.log(request);
        return request;
    }catch(error){
        console.log(error);
        return error.response;
    }
}
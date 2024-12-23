import axiosInstance from "../utils/axiosInstance";

export async function getTasks(filters = {}) {
        const request = await axiosInstance.get('tasks/', {
            params: {
                search: filters.search || "",
                due_date: filters.due_date || "",  // Default to empty string if due_date is missing
                priority: filters.priority?.join(',') || "", // Default to empty string if priority is missing
                created_at_after: filters.created_at_after || "", // Default to empty string if created_at_after is missing
                created_at_before: filters.created_at_before || "" // Default to empty string if created_at_before is missing
            }
        });
        return request;
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
        return request;
    }catch(error){
        return error.response;
    }
}

export async function deleteTask(id){
    try{
        const request = await axiosInstance.delete(`tasks/${id}/`);
        console.log(request);
        return request;
    }catch(error){
        return error.response;
    }
}
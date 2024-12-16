import { createContext, useContext, useEffect, useState } from "react";
import { createTask, getTasks, updateTask } from "../services/taskService";
import PropTypes from 'prop-types';

const TaskContext = createContext();

export default function TaskProvider({children}){
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, [])

    async function fetchTasks(){
        try{
            const response = await getTasks();
            setTasks(response.data);
        }catch(error){
            console.error(error);
        }
    }

    async function addTask(data){
        try{
           const response = await createTask(data);
            if(response.status === 201){
                fetchTasks();
                return {success: true}; 
            }
        }catch(error){
            console.error("Error adding task: ", error);
            return {success: false, message: error};
        }
    };

    async function editTask(id, data){
        try{
            const response = await updateTask(id, data);
            if(response.status === 200){
                fetchTasks();
                return {success: true};
            }
        }catch(error){
            console.error("Error updating task: ", error);
            return {success: false, message: error};
        }
    }

    return(
        <TaskContext.Provider value={{tasks, addTask, editTask}}>
            {children}
        </TaskContext.Provider>
    )
}

TaskProvider.propTypes = {
    children: PropTypes.node
}

export const useTasks = () => useContext(TaskContext);
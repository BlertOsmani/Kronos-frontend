import { Plus } from "lucide-react";
import TaskBoard from "../../components/task/TaskBoard";
import TaskFilters from "../../components/task/TaskFilters";
import Button from "../../components/ui/Button";
import Dialog from "../../components/ui/Dialog";
import { useDialog } from "../../contexts/DialogProvider";
import TaskForm from "../../components/task/TaskForm";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import { createTask, deleteTask, getTasks, updateTask } from "../../services/taskService";
import { useEffect, useState } from "react";

export default function Tasks() {
  const {dialog, closeDialog, openDialog} = useDialog();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks(filters = {}){
    try{
      const response = await getTasks(filters);
      setTasks(response.data);
    }catch(error){
      console.error(error);
    }
  }
  async function addTask(data) {
    try {
      const response = await createTask(data);
      if (response.status === 201) {
        fetchTasks();
        closeDialog();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function editTask(id, data) {
    try {
      const response = await updateTask(id, data);
      if (response.status === 200) {
        fetchTasks();
        closeDialog();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function removeTask(id){
    try{
      const response = await deleteTask(id);
      if(response.status === 204){
        fetchTasks();
        closeDialog();
      }
    }catch(error){
      console.error(error);
    }
  }

  return (
    <div className="container relative m-auto my-20">
      <div className="flex justify-between items-center gap-1">
        <TaskFilters onSubmit={(filters) => fetchTasks(filters)}/>
        <Button iconPosition="left" onClick={() => openDialog("add_or_update_task", { title: 'Add new task' })} title={"Add new task"}  icon={<Plus size={18}/>}/>
      </div>
      <TaskBoard tasks={tasks} onEdit={editTask}/>

      <Dialog isOpen={dialog?.name === 'add_or_update_task'} title={dialog?.payload?.title} onClose={closeDialog}>
        <TaskForm task={dialog?.payload?.data}
          onSubmit={(data) => {
            if(data.id){
              editTask(data.id, data);
            } else {
              addTask(data);
            }
          }}
        />
      </Dialog>
      <ConfirmDialog isOpen={dialog?.name === 'delete_task'}
         title={dialog?.payload?.title}
         message="Are you sure you want to delete this task?"
         onClose={closeDialog}
         confirmButtonSeverity={'error'}
         confirmButtonText={'Delete'}
         rejectButtonText={'Cancel'}
         onConfirm={() => removeTask(dialog?.payload.data)}
      />
    </div>
  )
}

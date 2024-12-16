import { Plus } from "lucide-react";
import TaskBoard from "../../components/task/TaskBoard";
import TaskFilters from "../../components/task/TaskFilters";
import Button from "../../components/ui/Button";
import Dialog from "../../components/ui/Dialog";
import { useDialog } from "../../contexts/DialogProvider";
import TaskForm from "../../components/task/TaskForm";

export default function Tasks() {
  const {dialog, closeDialog, openDialog} = useDialog();

  return (
    <div className="container m-auto my-20">
      <div className="flex justify-between">
        <TaskFilters/>
        <Button iconPosition="left" onClick={() => openDialog("add_or_update_task", { title: 'Add new task' })} title={"Add new task"}  icon={<Plus size={18}/>}/>
      </div>
      <TaskBoard/>

      <Dialog isOpen={dialog?.name === 'add_or_update_task'} title={dialog?.payload?.title} onClose={closeDialog}>
        <TaskForm onSuccess={closeDialog} task={dialog?.payload?.data}/>
      </Dialog>
    </div>
  )
}

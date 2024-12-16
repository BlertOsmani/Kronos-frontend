import TaskGroup from "./TaskGroup";
import { useTasks } from "../../contexts/TaskProvider";

export default function TaskBoard() {
  const {tasks} = useTasks();
  const statuses = [
    'To do', 
    'In progress',
    'Done',
    'Cancelled'
  ]

  return (
    <div className="flex gap-5">
      {statuses.map((status) => {
        const filteredTasks = tasks?.filter((task) => task.status === status) || [];
          return (
            <TaskGroup
              key={status}
              status={status}
              count={filteredTasks.length} // Show the count even if 0
              tasks={filteredTasks} // Pass the empty array if no tasks
            />
          );
      })}
    </div>
  );
}

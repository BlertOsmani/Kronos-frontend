import { statuses } from "../../utils/constants";
import TaskGroup from "./TaskGroup";
import PropTypes from 'prop-types';

export default function TaskBoard({tasks, onEdit}) {

  return (
    <div className="flex gap-5 relative">
      {statuses.map((status) => {
        const filteredTasks = tasks?.filter((task) => task.status === status) || [];
          return (
              <TaskGroup
                key={status}
                status={status}
                count={filteredTasks.length} // Show the count even if 0
                tasks={filteredTasks}
                onEdit={onEdit} // Pass the empty array if no tasks
              />
          );
      })}
    </div>
  );
}

TaskBoard.propTypes = {
  tasks: PropTypes.array,
  onEdit: PropTypes.func
}
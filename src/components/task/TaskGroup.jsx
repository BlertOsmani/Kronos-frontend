import TaskCard from "./TaskCard";
import PropTypes from 'prop-types';

export default function TaskGroup({status, count, tasks}) {

  return (
    <div className="flex rounded bg-neutral-50 p-2 flex-col w-1/4 my-10 gap-1">
        <div className="flex rounded py-2 items-center gap-1">
            <span className="font-semibold">{status}</span>
            {count > 0 && <span className="text-xs rounded-full flex w-5 h-5 justify-center items-center bg-neutral-200 text-neutral-600">{count}</span>}
        </div>
        {tasks?.map((task, index) => (
            <TaskCard
                key={index}
                id={task.id}
                title={task.title}
                priority={task.priority} 
                description={task.description}
                due_date={task.due_date}
                status={task.status}
            />
        ))}
    </div>
  )
}

TaskGroup.propTypes = {
    status: PropTypes.string,
    count: PropTypes.number,
    tasks: PropTypes.array
}

import TaskCard from "./TaskCard";
import PropTypes from 'prop-types';

export default function TaskGroup({status, count, tasks, onEdit}) {

  return (
    <div className="flex min-h-80 rounded bg-neutral-50 px-2 pb-2 flex-col w-full my-10 gap-1">
        <div className="flex sticky top-0 bg-neutral-50 py-3 z-10 rounded items-center gap-1">
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
                onEdit={onEdit}
            />
        ))}
    </div>
  )
}

TaskGroup.propTypes = {
    status: PropTypes.string,
    count: PropTypes.number,
    tasks: PropTypes.array,
    onEdit: PropTypes.func
}
